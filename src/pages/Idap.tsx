import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaDatabase, FaChartLine, FaServer } from 'react-icons/fa';
import idapImage from '../assets/idap-bb.jpg';
import { useTranslation } from 'react-i18next';


const Idap = () => {
    const { t } = useTranslation();

    return (
        <Container className="py-5">
            <Row className="mb-5 align-items-center">
                <Col lg={6}>
                    <h1 className="display-4 fw-bold mb-3">iDAP</h1>
                    <h2 className="h4 text-muted mb-4">{t('idapPage.eyebrow')}</h2>
                    <p className="lead">
                        {t('idapPage.description')}
                    </p>
                    <Button variant="primary" size="lg" className="mt-3">{t('idapPage.cta')}</Button>
                </Col>
                <Col lg={6} className="text-center">
                    <img src={idapImage} alt="iDAP Platform" className="img-fluid rounded shadow-lg" />
                </Col>
            </Row>

            <Row className="mb-5">
                <Col md={4} className="mb-4">
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center">
                            <FaChartLine size={50} className="text-success mb-3" />
                            <Card.Title>{t('idapPage.features.analytics.title')}</Card.Title>
                            <Card.Text>{t('idapPage.features.analytics.description')}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center">
                            <FaServer size={50} className="text-info mb-3" />
                            <Card.Title>{t('idapPage.features.infrastructure.title')}</Card.Title>
                            <Card.Text>{t('idapPage.features.infrastructure.description')}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center">
                            <FaDatabase size={50} className="text-primary mb-3" />
                            <Card.Title>{t('idapPage.features.integration.title')}</Card.Title>
                            <Card.Text>{t('idapPage.features.integration.description')}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Idap;
