import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBullseye, FaEye, FaAward } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const teamMembers = [
    { id: 1, name: t('aboutPage.team.1.name'), role: t('aboutPage.team.1.role') },
    { id: 2, name: t('aboutPage.team.2.name'), role: t('aboutPage.team.2.role') },
    { id: 3, name: t('aboutPage.team.3.name'), role: t('aboutPage.team.3.role') },
    { id: 4, name: t('aboutPage.team.4.name'), role: t('aboutPage.team.4.role') }
  ];

  const values = [
    {
      icon: <FaBullseye />,
      title: t('aboutPage.values.innovation.title'),
      description: t('aboutPage.values.innovation.description')
    },
    {
      icon: <FaAward />,
      title: t('aboutPage.values.excellence.title'),
      description: t('aboutPage.values.excellence.description')
    },
    {
      icon: <FaEye />,
      title: t('aboutPage.values.integrity.title'),
      description: t('aboutPage.values.integrity.description')
    }
  ];

  return (
    <Container className="py-5">
      {/* Company Overview */}
      <section className="mb-5">
        <h1 className="mb-4">{t('aboutPage.title')}</h1>
        <Row>
          <Col lg={8}>
            <p className="lead">
              {t('aboutPage.overviewLead')}
            </p>
            <p>
              {t('aboutPage.overviewBody')}
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
                <Card.Title className="h3">{t('aboutPage.missionTitle')}</Card.Title>
                <Card.Text>
                  {t('aboutPage.missionBody')}
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
                <Card.Title className="h3">{t('aboutPage.visionTitle')}</Card.Title>
                <Card.Text>
                  {t('aboutPage.visionBody')}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Core Values */}
      <section className="mb-5">
        <h2 className="mb-4">{t('aboutPage.valuesTitle')}</h2>
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
        <h2 className="mb-4">{t('aboutPage.teamTitle')}</h2>
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
            <p>{t('aboutPage.stats.years')}</p>
          </Col>
          <Col md={3}>
            <h2 className="display-4 fw-bold">5000+</h2>
            <p>{t('aboutPage.stats.clients')}</p>
          </Col>
          <Col md={3}>
            <h2 className="display-4 fw-bold">50+</h2>
            <p>{t('aboutPage.stats.members')}</p>
          </Col>
          <Col md={3}>
            <h2 className="display-4 fw-bold">98%</h2>
            <p>{t('aboutPage.stats.satisfaction')}</p>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default About;
