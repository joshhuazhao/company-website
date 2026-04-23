import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Services from './pages/Services';
import Solutions from './pages/Solutions';
import Resources from './pages/Resources';
import About from './pages/About';
import Idap from './pages/Idap';
import Isms from './pages/Isms';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/idap" element={<Idap />} />
            <Route path="products/isms" element={<Isms />} />
            <Route path="services" element={<Services />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="resources" element={<Resources />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
