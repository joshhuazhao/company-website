import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBullseye, FaEye, FaAward } from 'react-icons/fa';

const About = () => {
  const teamMembers = [
    { id: 1, name: 'John Smith', role: 'CEO & Founder' },
    { id: 2, name: 'Sarah Johnson', role: 'CTO' },
    { id: 3, name: 'Michael Brown', role: 'Head of Sales' },
    { id: 4, name: 'Emily Davis', role: 'Lead Designer' }
  ];

  const values = [
    { icon: <FaBullseye />, title: 'Innovation', description: 'We constantly push boundaries to deliver cutting-edge solutions.' },
    { icon: <FaAward />, title: 'Excellence', description: 'We are committed to delivering the highest quality in everything we do.' },
    { icon: <FaEye />, title: 'Integrity', description: 'We build trust through transparency and honest communication.' }
  ];

  return (
    <Container className="py-5">
      {/* Company Overview */}
      <section className="mb-5">
        <h1 className="mb-4">About Us</h1>
        <Row>
          <Col lg={8}>
            <p className="lead">
              We are a leading provider of innovative solutions that help businesses succeed in 
              the digital era. With over a decade of experience, we've helped thousands of 
              companies transform their operations and achieve their goals.
            </p>
            <p>
              Founded in 2014, our company has grown from a small startup to a trusted partner 
              for businesses of all sizes. We pride ourselves on our commitment to innovation, 
              quality, and customer satisfaction.
            </p>
          </Col>
        </Row>
      </section>

      {/* Mission and Vision */}
      <section className="mb-5">
        <Row>
          <Col md={6} className="mb-4">
            <Card className="h-100 border-primary">
              <Card.Body>
                <div className="text-primary mb-3" style={{ fontSize: '3rem' }}>
                  <FaBullseye />
                </div>
                <Card.Title className="h3">Our Mission</Card.Title>
                <Card.Text>
                  To empower businesses with innovative technology solutions that drive growth, 
                  efficiency, and success in an ever-evolving digital landscape.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="h-100 border-primary">
              <Card.Body>
                <div className="text-primary mb-3" style={{ fontSize: '3rem' }}>
                  <FaEye />
                </div>
                <Card.Title className="h3">Our Vision</Card.Title>
                <Card.Text>
                  To be the global leader in providing transformative technology solutions that 
                  shape the future of business and create lasting value for our clients.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Core Values */}
      <section className="mb-5">
        <h2 className="mb-4">Our Core Values</h2>
        <Row>
          {values.map((value, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="h-100 text-center shadow-sm">
                <Card.Body>
                  <div className="text-primary mb-3" style={{ fontSize: '3rem' }}>
                    {value.icon}
                  </div>
                  <Card.Title>{value.title}</Card.Title>
                  <Card.Text>{value.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Team Section */}
      <section className="mb-5">
        <h2 className="mb-4">Our Leadership Team</h2>
        <Row>
          {teamMembers.map((member) => (
            <Col md={6} lg={3} key={member.id} className="mb-4">
              <Card className="text-center shadow-sm">
                <div className="bg-secondary" style={{ height: '200px' }}></div>
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Text className="text-muted">{member.role}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white rounded p-5 text-center">
        <Row>
          <Col md={3}>
            <h2 className="display-4 fw-bold">10+</h2>
            <p>Years in Business</p>
          </Col>
          <Col md={3}>
            <h2 className="display-4 fw-bold">5000+</h2>
            <p>Happy Clients</p>
          </Col>
          <Col md={3}>
            <h2 className="display-4 fw-bold">50+</h2>
            <p>Team Members</p>
          </Col>
          <Col md={3}>
            <h2 className="display-4 fw-bold">98%</h2>
            <p>Satisfaction Rate</p>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default About;
