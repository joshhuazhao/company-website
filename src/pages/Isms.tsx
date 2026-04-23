import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaIndustry, FaCogs, FaNetworkWired } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Isms = () => {
    const { t } = useTranslation();

    return (
        <Container className="py-5">
            <Row className="mb-5 align-items-center">
                <Col lg={6}>
                    <h1 className="display-4 fw-bold mb-3">iSMS</h1>
                    <h2 className="h4 text-muted mb-4">{t('ismsPage.eyebrow')}</h2>
                    <p className="lead">
                        {t('ismsPage.description')}
                    </p>
                    <Button variant="primary" size="lg" className="mt-3">{t('ismsPage.cta')}</Button>
                </Col>
                <Col lg={6} className="text-center">
                    <FaIndustry size={200} className="text-primary opacity-50" />
                </Col>
            </Row>

            <Row className="mb-5">
                <Col md={4} className="mb-4">
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center">
                            <FaCogs size={50} className="text-warning mb-3" />
                            <Card.Title>{t('ismsPage.features.automation.title')}</Card.Title>
                            <Card.Text>{t('ismsPage.features.automation.description')}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center">
                            <FaNetworkWired size={50} className="text-success mb-3" />
                            <Card.Title>{t('ismsPage.features.connectivity.title')}</Card.Title>
                            <Card.Text>{t('ismsPage.features.connectivity.description')}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center">
                            <FaIndustry size={50} className="text-primary mb-3" />
                            <Card.Title>{t('ismsPage.features.maintenance.title')}</Card.Title>
                            <Card.Text>{t('ismsPage.features.maintenance.description')}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Isms;
