import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import logo from '../assets/lj_logo_icon.png';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-light-blue py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <div className="d-flex align-items-center mb-2">
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block me-2"
                alt="LeanJust Logo"
              />
              <h5 className="mb-0">{t('footer.companyName')}</h5>
            </div>
            <p>
              {t('footer.slogan')}
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>{t('footer.quickLinks')}</h5>
            <ul className="list-unstyled">
              <li><a href="/products" className="text-decoration-none">{t('header.products')}</a></li>
              <li><a href="/services" className="text-decoration-none">{t('header.services')}</a></li>
              <li><a href="/solutions" className="text-decoration-none">{t('header.solutions')}</a></li>
              <li><a href="/resources" className="text-decoration-none">{t('header.resources')}</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>{t('footer.connectWithUs')}</h5>
            <div className="d-flex gap-3">
              <a href="#" className="fs-4"><FaFacebook /></a>
              <a href="#" className="fs-4"><FaTwitter /></a>
              <a href="#" className="fs-4"><FaLinkedin /></a>
              <a href="#" className="fs-4"><FaGithub /></a>
            </div>
            <p className="mt-3">
              {t('footer.email')}: {t('footer.contactEmail')}<br />
              {/* {t('footer.phone')}: (555) 123-4567 */}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center pt-3 border-top border-primary">
            <p className="mb-0">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
