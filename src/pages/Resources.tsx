import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaFileAlt, FaBook, FaVideo, FaDownload } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Resources = () => {
  const { t } = useTranslation();
  const resources = [
    {
      id: 1,
      title: t('resourcesPage.items.1.title'),
      type: 'Documentation',
      icon: <FaBook />,
      description: t('resourcesPage.items.1.description'),
      category: t('resourcesPage.items.1.category')
    },
    {
      id: 2,
      title: t('resourcesPage.items.2.title'),
      type: 'Technical',
      icon: <FaFileAlt />,
      description: t('resourcesPage.items.2.description'),
      category: t('resourcesPage.items.2.category')
    },
    {
      id: 3,
      title: t('resourcesPage.items.3.title'),
      type: 'Video',
      icon: <FaVideo />,
      description: t('resourcesPage.items.3.description'),
      category: t('resourcesPage.items.3.category')
    },
    {
      id: 4,
      title: t('resourcesPage.items.4.title'),
      type: 'Case Study',
      icon: <FaFileAlt />,
      description: t('resourcesPage.items.4.description'),
      category: t('resourcesPage.items.4.category')
    },
    {
      id: 5,
      title: t('resourcesPage.items.5.title'),
      type: 'Research',
      icon: <FaDownload />,
      description: t('resourcesPage.items.5.description'),
      category: t('resourcesPage.items.5.category')
    },
    {
      id: 6,
      title: t('resourcesPage.items.6.title'),
      type: 'Guide',
      icon: <FaBook />,
      description: t('resourcesPage.items.6.description'),
      category: t('resourcesPage.items.6.category')
    }
  ];

  return (
    <Container className="py-5">
      <h1 className="mb-4">{t('resourcesPage.title')}</h1>
      <p className="lead mb-5">
        {t('resourcesPage.subtitle')}
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
                  {t('resourcesPage.accessResource')}
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Additional Resources Section */}
      <section className="mt-5 p-4 bg-light rounded">
        <h3 className="mb-3">{t('resourcesPage.needMoreHelp')}</h3>
        <Row>
          <Col md={6}>
            <h5>{t('resourcesPage.communityForum.title')}</h5>
            <p>{t('resourcesPage.communityForum.description')}</p>
          </Col>
          <Col md={6}>
            <h5>{t('resourcesPage.contactSupport.title')}</h5>
            <p>{t('resourcesPage.contactSupport.description')}</p>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Resources;
