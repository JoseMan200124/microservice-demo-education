// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { username } = req.body;
    console.log("Nombre de usuario: ", username);
    if (username) {
        res.json({ success: true, message: "Login Successful", user: username });
    } else {
        res.status(400).json({ success: false, message: "Username is required" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
