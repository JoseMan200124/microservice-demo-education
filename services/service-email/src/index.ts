import express from 'express';
import cors from 'cors';

const app = express();
const port = 3004;

app.use(cors());

app.use(express.json());

app.post('/send', (req, res) => {
    console.log('Email request:', req.body);
    res.send({ status: 'Email sent!', details: req.body });
});

app.listen(port, () => {
    console.log(`Email Service listening at http://localhost:${port}`);
});
