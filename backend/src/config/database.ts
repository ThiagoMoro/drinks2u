import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../../drinks2u.db');
const db = new Database(dbPath);

// Criar tabela se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    registro TEXT NOT NULL,
    bebida TEXT NOT NULL,
    quantidade INTEGER NOT NULL,
    status TEXT DEFAULT 'Pendente',
    timestamp TEXT NOT NULL
  )
`);

console.log('✅ Database connected');

export default db;
