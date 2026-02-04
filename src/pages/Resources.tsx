import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaFileAlt, FaBook, FaVideo, FaDownload } from 'react-icons/fa';

const Resources = () => {
  const resources = [
    {
      id: 1,
      title: 'Getting Started Guide',
      type: 'Documentation',
      icon: <FaBook />,
      description: 'A comprehensive guide to help you get started with our products and services.',
      category: 'Guide'
    },
    {
      id: 2,
      title: 'API Documentation',
      type: 'Technical',
      icon: <FaFileAlt />,
      description: 'Complete API reference documentation for developers.',
      category: 'Documentation'
    },
    {
      id: 3,
      title: 'Video Tutorials',
      type: 'Video',
      icon: <FaVideo />,
      description: 'Step-by-step video tutorials covering various features and use cases.',
      category: 'Tutorial'
    },
    {
      id: 4,
      title: 'Case Studies',
      type: 'Case Study',
      icon: <FaFileAlt />,
      description: 'Real-world examples of how our clients achieved success with our solutions.',
      category: 'Case Study'
    },
    {
      id: 5,
      title: 'White Papers',
      type: 'Research',
      icon: <FaDownload />,
      description: 'In-depth research papers on industry trends and best practices.',
      category: 'Research'
    },
    {
      id: 6,
      title: 'Best Practices Guide',
      type: 'Guide',
      icon: <FaBook />,
      description: 'Learn the best practices for implementing and optimizing our solutions.',
      category: 'Guide'
    }
  ];

  return (
    <Container className="py-5">
      <h1 className="mb-4">Resources</h1>
      <p className="lead mb-5">
        Access our library of resources including documentation, tutorials, case studies, and more.
      </p>
      
      <Row>
        {resources.map((resource) => (
          <Col md={6} lg={4} key={resource.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="text-primary mb-3" style={{ fontSize: '2.5rem' }}>
                  {resource.icon}
                </div>
                <div className="mb-2">
                  <Badge bg="primary">{resource.category}</Badge>
                </div>
                <Card.Title>{resource.title}</Card.Title>
                <Card.Text>{resource.description}</Card.Text>
                <a href="#" className="btn btn-outline-primary">
                  Access Resource
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Additional Resources Section */}
      <section className="mt-5 p-4 bg-light rounded">
        <h3 className="mb-3">Need More Help?</h3>
        <Row>
          <Col md={6}>
            <h5>Community Forum</h5>
            <p>Join our community to ask questions and share knowledge with other users.</p>
          </Col>
          <Col md={6}>
            <h5>Contact Support</h5>
            <p>Our support team is available 24/7 to assist you with any questions.</p>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Resources;
