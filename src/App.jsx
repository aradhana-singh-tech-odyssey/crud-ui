import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation , NavLink} from 'react-router-dom';
import { Container, Navbar, Nav, Spinner } from 'react-bootstrap';
import { AuthWrapper } from './components/AuthWrapper';
import { useAuthContext } from "cxoApp/useAuth";
import Home from './pages/Home';
import AddPatient from './pages/AddPatient';
import EditPatient from './pages/EditPatient';

// Lazy load the Login component from cxo-ui
const Login = lazy(() => import('cxoApp/Login'));

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AppContent() {
  const { isAuthenticated, logout } = useAuthContext();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
  <Container>
    <Navbar.Brand as={NavLink} to="/">Patient Management</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <NavLink as={NavLink} to="/">Home</NavLink >
        <NavLink as={NavLink} to="/add">Add Patient</NavLink >
        {isAuthenticated && (
          <NavLink as="button" onClick={logout} className="nav-link">Logout</NavLink >
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

      <Container>
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/add" element={
            <ProtectedRoute>
              <AddPatient />
            </ProtectedRoute>
          } />
          <Route path="/edit/:id" element={
            <ProtectedRoute>
              <EditPatient />
            </ProtectedRoute>
          } />
        </Routes>
      </Container>
    </>
  );
}

export default function App() {
  return (
    <AuthWrapper>
      <AppContent />
    </AuthWrapper>
  );
}