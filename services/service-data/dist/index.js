"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3003;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Endpoint para obtener datos de un Pokémon específico
app.get('/pokemon', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { data } = yield axios_1.default.get(`https://pokeapi.co/api/v2/pokemon/${req.query.name}`);
        res.json(data);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            // Si es un error de Axios, podemos acceder de manera segura a error.response
            res.status(500).send({ error: ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || "Unknown Axios error" });
        }
        else {
            // Si es un error que no es de Axios
            res.status(500).send({ error: "An unexpected error occurred" });
        }
    }
}));
app.listen(port, () => {
    console.log(`Data Service listening at http://localhost:${port}`);
});
