"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3002; // Asegúrate de usar un puerto único para cada microservicio
app.use(express_1.default.json());
app.post('/send', (req, res) => {
    console.log('Email request:', req.body);
    res.send({ status: 'Email sent!', details: req.body });
});
app.listen(port, () => {
    console.log(`Email Service listening at http://localhost:${port}`);
});
