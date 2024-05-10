import React, { useState, useEffect } from 'react';
import { Paper, Box, Typography, Button, TextField, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import LoginDialog from './LoginDialog';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/images/login.webp';


const theme = createTheme({
    palette: {
        primary: {
            main: '#0A84FF',
        },
        secondary: {
            main: '#30D5C8',
        },
        background: {
            default: '#121212',
        }
    },
    typography: {
        fontFamily: '"Orbitron", "Roboto", sans-serif',
        h4: {
            fontWeight: 700,
            fontSize: '2rem',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'rgba(10,132,255,0.9)',
                        }
                    }
                }
            }
        }
    }
});

const LoginForm: React.FC = () => {
    const [name, setName] = useState(localStorage.getItem('username') || '');
    const [dialogOpen, setDialogOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (name) {
            setDialogOpen(false);
            localStorage.setItem('username', name);
        }
    }, [name]);

    const handleLogin = () => {
        navigate('/dashboard');
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LoginDialog open={dialogOpen} onClose={(name) => setName(name)} />
            <Box sx={{
                display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center', justifyContent: 'center',
                background: `linear-gradient(to bottom, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.8) 50%, transparent 100%), url(${img})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}>
                <Box sx={{
                    width: 400,
                    p: 3,
                    backgroundColor: 'rgba(18, 18, 18, 0.9)',
                    borderRadius: 12,
                    boxShadow: '0 4px 20px rgba(0,0,255,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(5px)'
                }}>
                    <Typography variant="h4" sx={{ mb: 2, color: 'white', textAlign: 'center' }}>Login</Typography>
                    <Typography sx={{ mb: 2, textAlign: 'center', color: '#ccc' }}>Micro enseñanza análisis y diseño</Typography>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 2, input: { color: 'white' }, label: { color: '#aaa' } }}
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                        Login
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default LoginForm;