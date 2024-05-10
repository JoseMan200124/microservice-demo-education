import express from 'express';

const app = express();
const port = 3002; // Asegúrate de usar un puerto único para cada microservicio

app.use(express.json());

app.post('/send', (req, res) => {
    console.log('Email request:', req.body);
    res.send({ status: 'Email sent!', details: req.body });
});

app.listen(port, () => {
    console.log(`Email Service listening at http://localhost:${port}`);
});
