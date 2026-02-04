import { Container, Row, Col, Card } from 'react-bootstrap';
import { servicesData } from '../data/servicesData';

const Services = () => {
  return (
    <Container className="py-5">
      <h1 className="mb-4">Our Services</h1>
      <p className="lead mb-5">
        We offer a comprehensive suite of services to help your business thrive in the digital age.
      </p>
      
      <Row>
        {servicesData.map((service) => (
          <Col md={6} className="mb-4" key={service.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="text-primary mb-3" style={{ fontSize: '3rem' }}>
                  {service.icon}
                </div>
                <Card.Title className="h3">{service.title}</Card.Title>
                <Card.Text className="mb-3">{service.description}</Card.Text>
                <div>
                  <strong>What We Offer:</strong>
                  <ul className="mt-2">
                    {service.offerings.map((offering, index) => (
                      <li key={index}>{offering}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <strong>Benefits:</strong>
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
    </Container>
  );
};

export default Services;
