import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaGlobe, FaDatabase, FaIndustry } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import logo from '../assets/lj_logo_icon.png';

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar className="bg-light-blue" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center me-5">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
            alt="LeanJust Logo"
          />
          <strong>{t('header.brand')}</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">{t('header.home')}</Nav.Link>
            <NavDropdown title={t('header.products')} id="products-nav-dropdown">
              <NavDropdown.Item as={Link} to="/products/idap">
                <FaDatabase className="me-2" />
                {t('header.product_iDAP')}
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/isms">
                <FaIndustry className="me-2" />
                {t('header.product_iSMS')}
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/services">{t('header.services')}</Nav.Link>
            <Nav.Link as={Link} to="/solutions">{t('header.solutions')}</Nav.Link>
            <Nav.Link as={Link} to="/resources">{t('header.resources')}</Nav.Link>
            <Nav.Link as={Link} to="/about">{t('header.about')}</Nav.Link>
          </Nav>

          <Nav>
            <div className="d-lg-flex align-items-center">
              <NavDropdown title={<><FaGlobe className="me-1" /></>} id="language-nav-dropdown" align="end">
                <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage('zh')}>中文</NavDropdown.Item>
              </NavDropdown>

              <div className="d-none d-lg-block mx-2 border-end border-secondary" style={{ height: '24px' }}></div>

              <NavDropdown title={<FaUserCircle className="fs-5" />} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item href="#login">{t('header.login')}</NavDropdown.Item>
                <NavDropdown.Item href="#register">{t('header.signup')}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#profile">{t('header.profile')}</NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
