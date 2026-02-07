import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Link,
    Avatar
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/auth/login', { email, password });

            const { access_token, refresh_token } = response.data;

            // Salva os tokens no navegador
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            toast.success('Login realizado com sucesso!');
            
            // Redireciona para a Home
            navigate('/');
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error('Erro ao conectar com o servidor.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Card sx={{ minWidth: 275, boxShadow: 3 }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
                        
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        
                        <Typography component="h1" variant="h5">
                            Entrar
                        </Typography>

                        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Endereço de E-mail"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, py: 1.5 }}
                                disabled={loading}
                            >
                                {loading ? 'Entrando...' : 'Entrar'}
                            </Button>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Link component={RouterLink} to="/register" variant="body2">
                                    {"Não tem uma conta? Cadastre-se"}
                                </Link>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Login;