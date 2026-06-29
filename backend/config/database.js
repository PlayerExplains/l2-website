import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'l2jmobius',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Ensure numeric DB fields serialize cleanly as JSON numbers
  decimalNumbers: true,
});

/** Test database connectivity. Returns true if a query succeeds. */
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    return true;
  } catch (error) {
    console.error('[Database] Connection failed:', error.message);
    return false;
  }
}

export default pool;
