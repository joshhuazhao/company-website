import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaRocket, FaCogs, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero-bg.png';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section
        className="text-white py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Container>
          <Row className="align-items-center py-5">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">
                {t('home.hero.title')}
              </h1>
              <p className="lead mb-4">
                {t('home.hero.subtitle')}
              </p>
              <Button as={Link} to="/products" variant="light" size="lg" className="me-3">
                {t('home.hero.viewProducts')}
              </Button>
              <Button as={Link} to="/about" variant="outline-light" size="lg">
                {t('home.hero.learnMore')}
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">{t('home.features.title')}</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <FaRocket className="text-primary mb-3" size={50} />
                  <Card.Title>{t('home.features.fastReliable.title')}</Card.Title>
                  <Card.Text>
                    {t('home.features.fastReliable.description')}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <FaCogs className="text-primary mb-3" size={50} />
                  <Card.Title>{t('home.features.customizable.title')}</Card.Title>
                  <Card.Text>
                    {t('home.features.customizable.description')}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <FaUsers className="text-primary mb-3" size={50} />
                  <Card.Title>{t('home.features.expertSupport.title')}</Card.Title>
                  <Card.Text>
                    {t('home.features.expertSupport.description')}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="mb-4">{t('home.cta.title')}</h2>
              <p className="lead mb-4">
                {t('home.cta.subtitle')}
              </p>
              <Button as={Link} to="/solutions" variant="primary" size="lg">
                {t('home.cta.button')}
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
