import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

// Componentes temporários só para testar as rotas
const Login = () => <Typography variant="h3">Tela de Login</Typography>;
const Register = () => <Typography variant="h3">Tela de Cadastro</Typography>;
const Dashboard = () => <Typography variant="h3">Gerenciamento de Usuários</Typography>;

function App() {
  return (
    <Box sx={{ p: 4 }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Box>
  );
}

export default App;