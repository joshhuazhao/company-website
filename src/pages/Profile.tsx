import { FormEvent, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { FaSave, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  address: string;
  city: string;
  country: string;
};

const emptyProfile: ProfileForm = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  companyName: '',
  address: '',
  city: '',
  country: '',
};

const Profile = () => {
  const { currentUser } = useAuth();
  const [form, setForm] = useState<ProfileForm>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser) {
        return;
      }

      try {
        setLoading(true);
        setError('');
        const token = await currentUser.getIdToken();
        const response = await fetch('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Unable to load profile.');
        }

        setForm({
          ...emptyProfile,
          ...data.profile,
          email: data.profile.email || currentUser.email || '',
        });
      } catch (profileError) {
        setError(profileError instanceof Error ? profileError.message : 'Unable to load profile.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [currentUser]);

  const updateField = (field: keyof ProfileForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentUser) {
      return;
    }

    try {
      setSaving(true);
      setMessage('');
      setError('');
      const token = await currentUser.getIdToken();
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to save profile.');
      }

      setForm({ ...emptyProfile, ...data.profile });
      setMessage('Profile saved successfully.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <FaUserCircle className="text-primary" size={36} />
        <div>
          <h1 className="h3 mb-1">User Profile</h1>
          <p className="text-muted mb-0">Manage the contact information stored for your account.</p>
        </div>
      </div>

      <Card className="profile-card border-0 shadow-sm">
        <Card.Body className="p-4">
          {loading ? (
            <div className="d-flex align-items-center gap-2 text-muted">
              <Spinner animation="border" size="sm" />
              Loading profile...
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Row className="g-3">
                <Col md={6}>
                  <Form.Group controlId="profileFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      value={form.firstName}
                      onChange={(event) => updateField('firstName', event.target.value)}
                      autoComplete="given-name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="profileLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      value={form.lastName}
                      onChange={(event) => updateField('lastName', event.target.value)}
                      autoComplete="family-name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="profileEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      value={form.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      autoComplete="email"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="profilePhoneNumber">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                      type="tel"
                      value={form.phoneNumber}
                      onChange={(event) => updateField('phoneNumber', event.target.value)}
                      autoComplete="tel"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="profileCompanyName">
                    <Form.Label>Company name</Form.Label>
                    <Form.Control
                      value={form.companyName}
                      onChange={(event) => updateField('companyName', event.target.value)}
                      autoComplete="organization"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="profileCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      value={form.country}
                      onChange={(event) => updateField('country', event.target.value)}
                      autoComplete="country-name"
                    />
                  </Form.Group>
                </Col>
                <Col md={8}>
                  <Form.Group controlId="profileAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      value={form.address}
                      onChange={(event) => updateField('address', event.target.value)}
                      autoComplete="street-address"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="profileCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      value={form.city}
                      onChange={(event) => updateField('city', event.target.value)}
                      autoComplete="address-level2"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-end mt-4">
                <Button type="submit" disabled={saving} className="d-flex align-items-center gap-2">
                  {saving ? <Spinner animation="border" size="sm" /> : <FaSave />}
                  Save Profile
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
