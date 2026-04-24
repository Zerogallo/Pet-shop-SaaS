import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Pets from './pages/Pets';
import Products from './pages/Products';

function PrivateRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
}

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <Layout><Dashboard /></Layout>
          </PrivateRoute>
        } />
        <Route path="/agenda" element={
          <PrivateRoute>
            <Layout><Appointments /></Layout>
          </PrivateRoute>
        } />
        <Route path="/pets" element={
          <PrivateRoute>
            <Layout><Pets /></Layout>
          </PrivateRoute>
        } />
        <Route path="/produtos" element={
          <PrivateRoute>
            <Layout><Products /></Layout>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;