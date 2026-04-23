import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { FaCode, FaCloud, FaShieldAlt, FaChartLine, FaEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Service } from '../types';
import { useAuth } from '../context/AuthContext';
import EditServiceModal from '../components/EditServiceModal';
import { useTranslation } from 'react-i18next';

const iconMap: { [key: string]: React.ReactNode } = {
  'FaCode': <FaCode />,
  'FaCloud': <FaCloud />,
  'FaShieldAlt': <FaShieldAlt />,
  'FaChartLine': <FaChartLine />
};

const Services = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();
  const [services, setServices] = useState<(Service & { iconName?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchServices = async () => {
    try {
      const q = query(collection(db, 'services'), orderBy('id'));
      const querySnapshot = await getDocs(q);
      const servicesList = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          firestoreId: doc.id,
          iconName: data.icon // Store original string just in case
        };
      }) as (Service & { iconName?: string })[];
      setServices(servicesList);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEditClick = (service: Service) => {
    setEditingService(service);
    setShowEditModal(true);
  };

  const handleUpdateSuccess = () => {
    fetchServices();
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t('common.loading')}</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">{t('servicesPage.title')}</h1>
      <p className="lead mb-5">
        {t('servicesPage.subtitle')}
      </p>

      <Row>
        {services.map((service) => (
          <Col md={6} className="mb-4" key={service.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="text-primary mb-3 d-flex justify-content-between align-items-center">
                  <div style={{ fontSize: '3rem' }}>
                    {typeof service.icon === 'string' && iconMap[service.icon] ? iconMap[service.icon] : null}
                  </div>
                  {isAdmin && (
                    <Button variant="outline-primary" size="sm" onClick={() => handleEditClick(service)}>
                      <FaEdit />
                    </Button>
                  )}
                </div>
                <Card.Title className="h3">{service.title}</Card.Title>
                <Card.Text className="mb-3">{service.description}</Card.Text>
                <div>
                  <strong>{t('servicesPage.offerings')}:</strong>
                  <ul className="mt-2">
                    {service.offerings.map((offering, index) => (
                      <li key={index}>{offering}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <strong>{t('servicesPage.benefits')}:</strong>
                  <ul className="mt-2">
                    {service.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <EditServiceModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        service={editingService}
        onUpdate={handleUpdateSuccess}
      />
    </Container>
  );
};

export default Services;
