import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaGlobe, FaDatabase, FaIndustry } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/lj_logo_icon.png';

interface HeaderProps {
  onLoginClick: () => void;
}

const Header = ({ onLoginClick }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // handleLogin removed, using onLoginClick prop


  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
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
            {isAdmin && <Nav.Link as={Link} to="/admin" className="text-danger fw-bold">Admin</Nav.Link>}
          </Nav>

          <Nav>
            <div className="d-lg-flex align-items-center">
              <NavDropdown title={<><FaGlobe className="me-1" /></>} id="language-nav-dropdown" align="end">
                <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage('zh')}>中文</NavDropdown.Item>
              </NavDropdown>

              <div className="d-none d-lg-block mx-2 border-end border-secondary" style={{ height: '24px' }}></div>

              {currentUser ? (
                <NavDropdown title={<><FaUserCircle className="fs-5 me-1" /> {currentUser.displayName || currentUser.email}</>} id="user-nav-dropdown" align="end">
                  <NavDropdown.Item href="#profile">{t('header.profile')}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>{t('header.logout')}</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Button variant="outline-primary" onClick={onLoginClick} className="d-flex align-items-center gap-2">
                  <FaUserCircle /> {t('header.login')}
                </Button>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
