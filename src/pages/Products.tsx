import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { productsData } from '../data/productsData';

const Products = () => {
  return (
    <Container className="py-5">
      <h1 className="mb-4">Our Products</h1>
      <p className="lead mb-5">
        Explore our comprehensive range of products designed to meet your business needs.
      </p>
      
      <Row>
        {productsData.map((product) => (
          <Col md={6} lg={4} key={product.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <div className="bg-primary text-white d-flex align-items-center justify-content-center" 
                   style={{ height: '200px' }}>
                <h3>{product.name}</h3>
              </div>
              <Card.Body>
                <div className="mb-2">
                  {product.featured && (
                    <Badge bg="success" className="me-2">Featured</Badge>
                  )}
                  <Badge bg="secondary">{product.category}</Badge>
                </div>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <div className="mb-3">
                  <strong>Key Features:</strong>
                  <ul className="mt-2">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h5 mb-0 text-primary">{product.price}</span>
                  <Button variant="primary">Learn More</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
