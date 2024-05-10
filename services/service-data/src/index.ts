import express from 'express';
import { initDB, getItems, addItem } from './database';

const app = express();
const port = 3003; // Puerto único para este servicio

app.use(express.json());

app.get('/items', async (req, res) => {
    const items = await getItems();
    res.json(items);
});

app.post('/items', async (req, res) => {
    const { name } = req.body;
    const newItem = await addItem(name);
    res.json(newItem);
});

initDB().then(() => {
    app.listen(port, () => {
        console.log(`Data Service listening at http://localhost:${port}`);
    });
});
