import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3003;

app.use(cors()); // Aplica middleware CORS a todas las rutas
app.use(express.json());

// Endpoint para obtener datos de un Pokémon específico
app.get('/pokemon', async (req, res) => {
    try {
        console.log("URL: ", `https://pokeapi.co/api/v2/pokemon/${req.query.name}`);

        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.query.name}`);
        console.log("Data: ", data);
        res.json(data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Si es un error de Axios, podemos acceder de manera segura a error.response
            res.status(500).send({ error: error.response?.data || "Unknown Axios error" });
        } else {
            // Si es un error que no es de Axios
            res.status(500).send({ error: "An unexpected error occurred" });
        }
    }
});

app.listen(port, () => {
    console.log(`Data Service listening at http://localhost:${port}`);
});
