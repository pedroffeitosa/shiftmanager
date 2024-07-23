import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.getConnection()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

export default pool;
