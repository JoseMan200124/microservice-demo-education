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
    Avatar
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';

interface LogEntry {
    timestamp: string;
    service: string;
    message: string;
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

const Dashboard: React.FC = () => {
    // URLs de microservicios
    const loginUrl   = 'http://localhost:3001/login';
    const itemsUrl   = 'http://localhost:3002/items';
    const pokemonUrl = 'http://localhost:3003/pokemon';
    const emailUrl   = 'http://localhost:3004/send';

    // Logs
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // Login
    const [username, setUsername] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    // Items
    const [items, setItems] = useState<Item[]>([]);
    const [newItem, setNewItem] = useState('');
    const [itemsLoading, setItemsLoading] = useState(false);

    // Pokémon
    const [pokeName, setPokeName] = useState('');
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [pokeLoading, setPokeLoading] = useState(false);

    // Email
    const [toEmail, setToEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [emailResult, setEmailResult] = useState<any>(null);
    const [emailLoading, setEmailLoading] = useState(false);

    // Mapea colores de servicio
    const serviceColors: Record<string, string> = {
        Login:    '#E3F2FD',
        Items:    '#FFF8E1',
        Pokémon:  '#EDE7F6',
        Email:    '#FCE4EC'
    };
    const logColors: Record<string, string> = {
        Login:   '#1976D2',
        Items:   '#F9A825',
        Pokémon: '#8E24AA',
        Email:   '#C2185B'
    };

    // Añade un log
    const addLog = (service: string, message: string) => {
        const ts = new Date().toLocaleTimeString();
        setLogs(prev => [{ timestamp: ts, service, message }, ...prev]);
    };

    // LOGIN
    const handleLogin = async () => {
        addLog('Login', '➡️ Petición enviada');
        setLoginLoading(true);
        try {
            await axios.post(loginUrl, { username });
        } catch {
            /* simulamos éxito */
        } finally {
            addLog('Login', '⬅️ Respuesta recibida');
            setLoginLoading(false);
        }
    };

    // ITEMS
    const fetchItems = async () => {
        addLog('Items', '➡️ Petición enviada');
        setItemsLoading(true);
        try {
            const res = await axios.get<Item[]>(itemsUrl);
            setItems(res.data);
        } catch {
            /* simulamos éxito */
        } finally {
            addLog('Items', '⬅️ Respuesta recibida');
            setItemsLoading(false);
        }
    };

    const handleAddItem = async () => {
        addLog('Items', '➡️ Petición enviada');
        setItemsLoading(true);
        try {
            const res = await axios.post<Item>(itemsUrl, { name: newItem });
            setItems(prev => [...prev, res.data]);
            setNewItem('');
        } catch {
            /* simulamos éxito */
        } finally {
            addLog('Items', '⬅️ Respuesta recibida');
            setItemsLoading(false);
        }
    };

    // POKÉMON
    const handleFetchPokemon = async () => {
        addLog('Pokémon', '➡️ Petición enviada');
        setPokeLoading(true);
        setPokemon(null);
        try {
            const res = await axios.get<PokemonData>(`${pokemonUrl}?name=${pokeName}`);
            setPokemon(res.data);
        } catch {
            /* simulamos éxito */
        } finally {
            addLog('Pokémon', '⬅️ Respuesta recibida');
            setPokeLoading(false);
        }
    };

    // EMAIL
    const handleSendEmail = async () => {
        addLog('Email', '➡️ Petición enviada');
        setEmailLoading(true);
        try {
            const res = await axios.post(emailUrl, { to: toEmail, subject, body });
            setEmailResult(res.data);
        } catch {
            /* simulamos éxito */
        } finally {
            addLog('Email', '⬅️ Respuesta recibida');
            setEmailLoading(false);
        }
    };

    // Al montar, carga items
    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <Box p={3} bgcolor="#fafafa">
            <Typography variant="h3" textAlign="center" gutterBottom>
                🤖 Dashboard de Microservicios
            </Typography>

            <Grid container spacing={3}>
                {/** CARD Login **/}
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

                {/** CARD Items **/}
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

                {/** CARD Pokémon **/}
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
                            {pokemon && (
                                <Box textAlign="center" mt={2}>
                                    <Avatar
                                        src={pokemon.sprites.front_default}
                                        alt={pokemon.name}
                                        sx={{ width: 72, height: 72, mx: 'auto' }}
                                    />
                                    <Typography variant="h6" mt={1}>
                                        #{pokemon.id} {pokemon.name}
                                    </Typography>
                                    <Typography>
                                        Tipos: {pokemon.types.map(t => t.type.name).join(', ')}
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/** CARD Email **/}
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
                            {emailResult && (
                                <Box mt={2} fontFamily="monospace" fontSize="0.875rem">
                                    Resultado: {JSON.stringify(emailResult)}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/** Registro de actividad **/}
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
                            sx={{ color: logColors[log.service] || 'text.primary', mb: 0.5 }}
                        >
                            [{log.timestamp}]
                            <strong> {log.service}:</strong> {log.message}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
