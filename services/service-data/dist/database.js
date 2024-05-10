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
exports.addItem = exports.getItems = exports.initDB = void 0;
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
let db;
function initDB() {
    return __awaiter(this, void 0, void 0, function* () {
        db = yield (0, sqlite_1.open)({
            filename: './mydb.sqlite',
            driver: sqlite3_1.default.Database
        });
        yield db.run('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
    });
}
exports.initDB = initDB;
function getItems() {
    return __awaiter(this, void 0, void 0, function* () {
        return db.all('SELECT * FROM items');
    });
}
exports.getItems = getItems;
function addItem(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db.run('INSERT INTO items (name) VALUES (?)', [name]);
        return { id: result.lastID, name: name };
    });
}
exports.addItem = addItem;
