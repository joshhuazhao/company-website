import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { solutionsData } from '../data/solutionsData';

const Solutions = () => {
  return (
    <Container className="py-5">
      <h1 className="mb-4">Industry Solutions</h1>
      <p className="lead mb-5">
        Tailored solutions designed specifically for your industry's unique challenges and opportunities.
      </p>
      
      <Row>
        {solutionsData.map((solution) => (
          <Col lg={6} className="mb-4" key={solution.id}>
            <Card className="h-100 shadow">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">{solution.industry}</h4>
              </Card.Header>
              <Card.Body>
                <Card.Text className="mb-4">{solution.description}</Card.Text>
                
                <h5 className="mb-3">Key Challenges We Address:</h5>
                <ListGroup variant="flush" className="mb-4">
                  {solution.challenges.map((challenge, index) => (
                    <ListGroup.Item key={index}>{challenge}</ListGroup.Item>
                  ))}
                </ListGroup>
                
                <h5 className="mb-3">Our Approach:</h5>
                <ListGroup variant="flush">
                  {solution.approach.map((item, index) => (
                    <ListGroup.Item key={index} className="border-0 ps-0">
                      ✓ {item}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Solutions;
