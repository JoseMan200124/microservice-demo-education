import express from 'express';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Authentication Service!');
});

app.listen(port, () => {
    console.log(`Authentication Service listening at http://localhost:${port}`);
});
