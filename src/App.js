import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardEntrepreneur from './pages/DashboardEntrepreneur';
import DashboardInvestor from './pages/DashboardInvestor';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreateMeeting from './pages/CreateMeeting';
import Meetings from './pages/Meetings';
import Payment from './pages/Payment';
import Documents from './pages/Documents';
import DocumentsList from './pages/DocumentsList';
import CreateStartup from './pages/CreateStartup';

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Meetings */}
        <Route 
          path="/create-meeting" 
          element={
            <ProtectedRoute>
              <CreateMeeting />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/meetings" 
          element={
            <ProtectedRoute>
              <Meetings />
            </ProtectedRoute>
          } 
        />

        {/* Payment */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        {/* Documents */}
        <Route 
          path="/documents" 
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/documents-list" 
          element={
            <ProtectedRoute>
              <DocumentsList />
            </ProtectedRoute>
          } 
        />

        {/* Startup */}
        <Route 
          path="/create-startup" 
          element={
            <ProtectedRoute>
              <CreateStartup />
            </ProtectedRoute>
          } 
        />

        {/* Dashboards */}
        <Route
          path="/dashboard/entrepreneur"
          element={
            <ProtectedRoute>
              <DashboardEntrepreneur />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/investor"
          element={
            <ProtectedRoute>
              <DashboardInvestor />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;
