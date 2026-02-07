import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

const Dashboard = () => <h1>Bem-vindo ao Sistema</h1>;

function App() {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={<Dashboard />} />

        <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;