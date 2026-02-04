import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaIndustry, FaCogs, FaNetworkWired } from 'react-icons/fa';

const Isms = () => {
    return (
        <Container className="py-5">
            <Row className="mb-5 align-items-center">
                <Col lg={6}>
                    <h1 className="display-4 fw-bold mb-3">iSMS</h1>
                    <h2 className="h4 text-muted mb-4">Intelligent Smart Manufacturing System</h2>
                    <p className="lead">
                        Revolutionize your production floor with iSMS. Connect your machines, optimize workflows,
                        and achieve operational excellence through smart manufacturing technologies.
                    </p>
                    <Button variant="primary" size="lg" className="mt-3">Learn More</Button>
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
                            <Card.Title>Automated Control</Card.Title>
                            <Card.Text>Advanced automation capabilities to streamline production processes and reduce manual intervention.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center">
                            <FaNetworkWired size={50} className="text-success mb-3" />
                            <Card.Title>IoT Connectivity</Card.Title>
                            <Card.Text>Seamlessly connect devices and sensors to the industrial IoT network for comprehensive monitoring.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center">
                            <FaIndustry size={50} className="text-primary mb-3" />
                            <Card.Title>Predictive Maintenance</Card.Title>
                            <Card.Text>Use AI-driven insights to predict equipment failures before they happen, maximizing uptime.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Isms;
