import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import EditProductModal from '../components/EditProductModal';
import { FaEdit } from 'react-icons/fa';

const Products = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('id'));
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        firestoreId: doc.id
      })) as Product[];
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleUpdateSuccess = () => {
    fetchProducts(); // Refresh data
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">{t('productsPage.title')}</h1>
      <p className="lead mb-5">
        {t('productsPage.subtitle')}
      </p>

      <Row>
        {products.map((product) => (
          <Col md={6} lg={4} key={product.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <div className="bg-primary text-white d-flex align-items-center justify-content-center"
                style={{ height: '200px' }}>
                <h3>{t(`products.items.${product.id}.name`) !== `products.items.${product.id}.name` ? t(`products.items.${product.id}.name`) : product.name}</h3>
              </div>
              <Card.Body>
                <div className="mb-2">
                  {product.featured && (
                    <Badge bg="success" className="me-2">{t('productsPage.featured')}</Badge>
                  )}
                  <Badge bg="secondary">{t(`products.items.${product.id}.category`) !== `products.items.${product.id}.category` ? t(`products.items.${product.id}.category`) : product.category}</Badge>
                </div>
                <Card.Title>{t(`products.items.${product.id}.name`) !== `products.items.${product.id}.name` ? t(`products.items.${product.id}.name`) : product.name}</Card.Title>
                <Card.Text>{t(`products.items.${product.id}.description`) !== `products.items.${product.id}.description` ? t(`products.items.${product.id}.description`) : product.description}</Card.Text>
                <div className="mb-3">
                  <strong>{t('productsPage.keyFeatures')}:</strong>
                  <ul className="mt-2">
                    {/* Fallback to DB features if translation missing, or use DB features if i18n key logic is tricky */}
                    {(product.features && product.features.length > 0) ?
                      product.features.slice(0, 3).map((feature, index) => <li key={index}>{feature}</li>)
                      : (t(`products.items.${product.id}.features`, { returnObjects: true }) as string[]).slice(0, 3).map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                  </ul>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h5 mb-0 text-primary">{product.price}</span>
                  <div>
                    {isAdmin && (
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditClick(product)}
                      >
                        <FaEdit /> Edit
                      </Button>
                    )}
                    <Button variant="primary">{t('productsPage.learnMore')}</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <EditProductModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        product={editingProduct}
        onUpdate={handleUpdateSuccess}
      />
    </Container>
  );
};

export default Products;
