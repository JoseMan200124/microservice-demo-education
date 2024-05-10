import { Database, open} from 'sqlite';
import sqlite3 from 'sqlite3';

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function initDB() {
    db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });
    await db.run('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
}

export async function getItems() {
    return db.all('SELECT * FROM items');
}

export async function addItem(name: string) {
    const result = await db.run('INSERT INTO items (name) VALUES (?)', [name]);
    return { id: result.lastID, name: name };
}
