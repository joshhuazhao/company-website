import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <Container className="py-5 text-center" style={{ minHeight: '50vh' }}>
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="mb-3">Page not found</h2>
      <p className="lead text-muted mb-4">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Button as={Link as typeof Button} to="/" variant="primary" size="lg">
        <FaHome className="me-2" />
        Back to Home
      </Button>
    </Container>
  );
};

export default NotFound;
