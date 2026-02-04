import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaDatabase, FaChartLine, FaServer } from 'react-icons/fa';
import idapImage from '../assets/idap-bb.jpg';


const Idap = () => {
    // Ideally these strings should be in translation files, but hardcoding for now as per immediate task
    // unless I update translation files which is better.
    // For this step I will use static text mixed with common translations if available, 
    // or just static English for the specific content as I didn't plan to add deep content translations yet.
    // However, to keep "main theme", I should use the same structure.

    return (
        <Container className="py-5">
            <Row className="mb-5 align-items-center">
                <Col lg={6}>
                    <h1 className="display-4 fw-bold mb-3">iDAP</h1>
                    <h2 className="h4 text-muted mb-4">Intelligent Data Analysis Platform</h2>
                    <p className="lead">
                        Unlock the power of your data with iDAP. Our big data analysis platform provides
                        deep insights, real-time processing, and predictive analytics to drive your business forward.
                    </p>
                    <Button variant="primary" size="lg" className="mt-3">Request Demo</Button>
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
                            <Card.Title>Real-time Analytics</Card.Title>
                            <Card.Text>Process and analyze data streams in real-time to make instant, informed decisions.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center">
                            <FaServer size={50} className="text-info mb-3" />
                            <Card.Title>Scalable Infrastructure</Card.Title>
                            <Card.Text>Built on a robust architecture that grows with your data needs, from gigabytes to petabytes.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center">
                            <FaDatabase size={50} className="text-primary mb-3" />
                            <Card.Title>Data Integration</Card.Title>
                            <Card.Text>Seamlessly integrate with various data sources, including SQL, NoSQL, and data lakes.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Idap;
