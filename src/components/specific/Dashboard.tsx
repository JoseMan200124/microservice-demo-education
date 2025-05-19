// src/components/specific/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Typography,
    TextField,
    Button,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    Avatar,
    Snackbar,
    Alert
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

type LogType = 'start' | 'end';
interface LogEntry {
    timestamp: string;
    service: string;
    type: LogType;
}

interface Item {
    id: number;
    name: string;
}

interface PokemonData {
    id: number;
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
}

const serviceColors: Record<string, string> = {
    Login:   '#E3F2FD',
    Items:   '#FFF8E1',
    Pokémon: '#EDE7F6',
    Email:   '#FCE4EC'
};
const logColors: Record<string, string> = {
    Login:   '#1976D2',
    Items:   '#F9A825',
    Pokémon: '#8E24AA',
    Email:   '#C2185B'
};

const AnimatedArrow: React.FC<{ direction: 'forward' | 'back' }> = ({ direction }) => (
    <motion.span
        initial={{ x: direction === 'forward' ? -20 : 20, opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ yoyo: Infinity, duration: 1, ease: 'easeInOut' }}
        style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 4px' }}
    >
        {direction === 'forward'
            ? <ArrowForwardIosIcon fontSize="small" />
            : <ArrowBackIosNewIcon fontSize="small" />}
    </motion.span>
);

const Dashboard: React.FC = () => {
    // Endpoints
    const loginUrl   = 'http://localhost:3001/login';
    const itemsUrl   = 'http://localhost:3002/items';
    const pokemonUrl = 'http://localhost:3003/pokemon';
    const emailUrl   = 'http://localhost:3004/send';

    // Logs
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // Login state
    const [username, setUsername] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    // Items state
    const [items, setItems] = useState<Item[]>([]);
    const [newItem, setNewItem] = useState('');
    const [itemsLoading, setItemsLoading] = useState(false);

    // Pokémon state
    const [pokeName, setPokeName] = useState('');
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [pokeLoading, setPokeLoading] = useState(false);

    // Email state
    const [toEmail, setToEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [emailLoading, setEmailLoading] = useState(false);

    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');

    // Helpers for logs
    const addLog = (service: string, type: LogType) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [{ timestamp, service, type }, ...prev]);
    };

    // LOGIN
    const handleLogin = async () => {
        addLog('Login', 'start');
        setLoginLoading(true);
        try {
            await axios.post(loginUrl, { username });
        } catch {
            /* simulamos éxito */
        } finally {
            addLog('Login', 'end');
            setLoginLoading(false);
        }
    };

    // ITEMS
    const fetchItems = async () => {
        addLog('Items', 'start');
        setItemsLoading(true);
        try {
            const res = await axios.get<Item[]>(itemsUrl);
            setItems(res.data);
        } catch {
            /* simulamos éxito */
        } finally {
            addLog('Items', 'end');
            setItemsLoading(false);
        }
    };

    const handleAddItem = async () => {
        addLog('Items', 'start');
        setItemsLoading(true);
        try {
            const res = await axios.post<Item>(itemsUrl, { name: newItem });
            setItems(prev => [...prev, res.data]);
            setNewItem('');
        } catch {
            /* simulamos éxito */
        } finally {
            addLog('Items', 'end');
            setItemsLoading(false);
        }
    };

    // POKÉMON
    const handleFetchPokemon = async () => {
        addLog('Pokémon', 'start');
        setPokeLoading(true);
        setPokemon(null);
        try {
            const res = await axios.get<PokemonData>(`${pokemonUrl}?name=${pokeName}`);
            setPokemon(res.data);
        } catch {
            /* simulamos éxito */
        } finally {
            addLog('Pokémon', 'end');
            setPokeLoading(false);
        }
    };

    // EMAIL
    const handleSendEmail = async () => {
        addLog('Email', 'start');
        setEmailLoading(true);
        try {
            const res = await axios.post(emailUrl, { to: toEmail, subject, body });
            // mostramos el resultado en un toast
            setSnackbarText(`Email: ${res.data.status}`);
            setSnackbarOpen(true);
        } catch {
            /* simulamos éxito */
            setSnackbarText('Email: success (simulado)');
            setSnackbarOpen(true);
        } finally {
            addLog('Email', 'end');
            setEmailLoading(false);
        }
    };

    // Fetch items on mount
    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <Box p={3} bgcolor="#fafafa" minHeight="100vh">
            <Typography variant="h3" textAlign="center" gutterBottom>
                🤖 Dashboard de Microservicios
            </Typography>

            <Grid container spacing={3}>
                {/* Login */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: serviceColors.Login }}>
                        <CardHeader title="🔑 Servicio de Login" />
                        {loginLoading && <LinearProgress />}
                        <CardContent>
                            <TextField
                                label="Usuario"
                                fullWidth
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleLogin}
                                disabled={loginLoading || !username}
                            >
                                LOGIN
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Items */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: serviceColors.Items }}>
                        <CardHeader
                            title="📦 Servicio de Items"
                            action={
                                <IconButton onClick={fetchItems} disabled={itemsLoading}>
                                    <RefreshIcon />
                                </IconButton>
                            }
                        />
                        {itemsLoading && <LinearProgress />}
                        <CardContent>
                            <Box display="flex" mb={2}>
                                <TextField
                                    label="Nuevo ítem"
                                    fullWidth
                                    value={newItem}
                                    onChange={e => setNewItem(e.target.value)}
                                />
                                <Button
                                    sx={{ ml: 1 }}
                                    onClick={handleAddItem}
                                    disabled={itemsLoading || !newItem}
                                >
                                    +
                                </Button>
                            </Box>
                            <List dense sx={{ maxHeight: 180, overflow: 'auto' }}>
                                {items.map(it => (
                                    <ListItem key={it.id}>{it.name}</ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Pokémon */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: serviceColors.Pokémon }}>
                        <CardHeader title="🦄 Servicio Pokémon" />
                        {pokeLoading && <LinearProgress />}
                        <CardContent>
                            <Box display="flex" mb={2}>
                                <TextField
                                    label="Nombre Pokémon"
                                    fullWidth
                                    value={pokeName}
                                    onChange={e => setPokeName(e.target.value)}
                                />
                                <Button
                                    sx={{ ml: 1 }}
                                    onClick={handleFetchPokemon}
                                    disabled={pokeLoading || !pokeName}
                                >
                                    BUSCAR
                                </Button>
                            </Box>
                            <AnimatePresence>
                                {pokemon && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5, y: -20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        style={{ textAlign: 'center', marginTop: 16 }}
                                    >
                                        <Avatar
                                            src={pokemon.sprites.front_default}
                                            alt={pokemon.name}
                                            sx={{ width: 140, height: 140, mx: 'auto' }}
                                        />
                                        <Typography variant="h4" mt={1}>
                                            #{pokemon.id} {pokemon.name}
                                        </Typography>
                                        <Typography>
                                            Tipos: {pokemon.types.map(t => t.type.name).join(', ')}
                                        </Typography>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Email */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: serviceColors.Email }}>
                        <CardHeader title="📧 Servicio de Email" />
                        {emailLoading && <LinearProgress />}
                        <CardContent>
                            <TextField
                                label="Para"
                                fullWidth
                                value={toEmail}
                                onChange={e => setToEmail(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Asunto"
                                fullWidth
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Mensaje"
                                fullWidth
                                multiline
                                rows={4}
                                value={body}
                                onChange={e => setBody(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleSendEmail}
                                disabled={emailLoading || !toEmail || !subject || !body}
                            >
                                ENVIAR
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Registro de actividad */}
            <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                    📜 Registro de Actividad
                </Typography>
                <Box
                    bgcolor="white"
                    p={2}
                    borderRadius={1}
                    height={300}
                    overflow="auto"
                    fontFamily="monospace"
                    fontSize="0.875rem"
                >
                    {logs.map((log, i) => (
                        <Box
                            key={i}
                            sx={{ color: logColors[log.service] || 'text.primary', mb: 0.5, display: 'flex', alignItems: 'center' }}
                        >
                            [{log.timestamp}]
                            <strong>&nbsp;{log.service}:</strong>
                            {log.type === 'start' ? (
                                <>
                                    <AnimatedArrow direction="forward" />
                                    Petición enviada
                                </>
                            ) : (
                                <>
                                    <AnimatedArrow direction="back" />
                                    Respuesta recibida
                                </>
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Toast (Snackbar) */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {snackbarText}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Dashboard;
