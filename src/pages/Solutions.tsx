import { Container, Row, Col, Card, ListGroup, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Solution } from '../types';
import { useTranslation } from 'react-i18next';

const Solutions = () => {
  const { t } = useTranslation();
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const q = query(collection(db, 'solutions'), orderBy('id'));
        const querySnapshot = await getDocs(q);
        const solutionsList = querySnapshot.docs.map(doc => ({
          ...doc.data()
        })) as Solution[];
        setSolutions(solutionsList);
      } catch (error) {
        console.error("Error fetching solutions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t('common.loading')}</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">{t('solutionsPage.title')}</h1>
      <p className="lead mb-5">
        {t('solutionsPage.subtitle')}
      </p>

      <Row>
        {solutions.map((solution) => (
          <Col lg={6} className="mb-4" key={solution.id}>
            <Card className="h-100 shadow">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">{solution.industry}</h4>
              </Card.Header>
              <Card.Body>
                <Card.Text className="mb-4">{solution.description}</Card.Text>

                <h5 className="mb-3">{t('solutionsPage.challenges')}:</h5>
                <ListGroup variant="flush" className="mb-4">
                  {solution.challenges.map((challenge, index) => (
                    <ListGroup.Item key={index}>{challenge}</ListGroup.Item>
                  ))}
                </ListGroup>

                <h5 className="mb-3">{t('solutionsPage.approach')}:</h5>
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
