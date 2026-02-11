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
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

const Register = () => {
    const navigate = useNavigate();
    
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/users/', { username, email, password });

            toast.success('Conta criada com sucesso! Faça login.');
            
            // redireciona para fazer login
            navigate('/login');

        } catch (error) {
            console.log(error)
            if (error.response && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error('Erro ao criar conta.');
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
                        
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <PersonAddOutlinedIcon />
                        </Avatar>
                        
                        <Typography component="h1" variant="h5">
                            Criar Conta
                        </Typography>

                        <Box component="form" onSubmit={handleRegister} sx={{ mt: 1, width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Nome Completo"
                                name="username"
                                autoComplete="name"
                                autoFocus
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Endereço de E-mail"
                                name="email"
                                autoComplete="email"
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
                                autoComplete="new-password"
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
                                {loading ? 'Cadastrando...' : 'Cadastrar'}
                            </Button>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Link component={RouterLink} to="/login" variant="body2">
                                    {"Já tem uma conta? Faça Login"}
                                </Link>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Register;