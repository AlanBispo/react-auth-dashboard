import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

// Material UI Imports
import {
    AppBar, Toolbar, Typography, Button, Container, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
    Box
} from '@mui/material';
import { Add, Edit, Delete, Logout } from '@mui/icons-material';

const Dashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // Se null, criação. Se tem dados, edição
    
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const loadUsers = async () => {
        try {
            const response = await api.get('/users/');
            setUsers(response.data); 
        } catch (error) {
            toast.error("Erro ao carregar usuários.");
            if (error.response?.status === 401) handleLogout(); // Se o token venceu, sai.
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            await api.post('/auth/logout', { refresh_token: refreshToken });
        } catch (error) {
            console.error("Erro no logout", error);
        } finally {
            localStorage.clear();
            navigate('/login');
            toast.info("Você saiu do sistema.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
            try {
                await api.delete(`/users/${id}`);
                toast.success("Usuário removido!");
                loadUsers();
            } catch (error) {
                toast.error("Erro ao deletar usuário.");
            }
        }
    };

    const handleOpen = (user = null) => {
        if (user) {
            // Edição
            setCurrentUser(user);
            setFormData({ username: user.username, email: user.email, password: '' });
        } else {
            // Criação
            setCurrentUser(null);
            setFormData({ username: '', email: '', password: '' });
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        try {
            // 1. Criamos uma cópia do objeto para não alterar o estado visual
            const payload = { ...formData };

            if (currentUser) {
                if (!payload.password) {
                    delete payload.password;
                }

                await api.put(`/users/${currentUser.id}`, payload);
                toast.success("Usuário atualizado!");

            } else {
                if (!payload.password) {
                    toast.warning("Para criar um usuário, a senha é obrigatória.");
                    return;
                }

                await api.post('/users/', payload);
                toast.success("Usuário criado!");
            }

            handleClose();
            loadUsers();
        } catch (error) {
            toast.error(error.response?.data?.error || "Erro ao salvar.");
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Barra Superior */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Gerenciamento de Usuários
                    </Typography>
                    <Button color="inherit" startIcon={<Logout />} onClick={handleLogout}>
                        Sair
                    </Button>
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h4">Lista de Usuários</Typography>
                    <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
                        Novo Usuário
                    </Button>
                </Box>

                {/* Tabela de Dados */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" onClick={() => handleOpen(user)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(user.id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {users.length === 0 && !loading && (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">Nenhum usuário encontrado.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            {/* Modal de Adicionar/Editar */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>{currentUser ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nome"
                        fullWidth
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="E-mail"
                        fullWidth
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Senha"
                        type="password"
                        fullWidth
                        placeholder={currentUser ? "Deixe em branco para não alterar" : "Senha obrigatória"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave} variant="contained">Salvar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Dashboard;