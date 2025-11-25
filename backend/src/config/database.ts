import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../../drinks2u.db');
const db = new Database(dbPath);

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    registration TEXT NOT NULL,
    beverage TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    status TEXT DEFAULT 'Pending',
    timestamp TEXT NOT NULL
  )
`);

console.log('✅ Database connected');

export default db;
