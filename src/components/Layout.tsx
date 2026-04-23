import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LoginModal from './LoginModal'; // Corrected import path
import { useState } from 'react';

const Layout = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onLoginClick={() => setShowLoginModal(true)} />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
      <LoginModal show={showLoginModal} onHide={() => setShowLoginModal(false)} />
    </div>
  );
};

export default Layout;
