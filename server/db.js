import 'dotenv/config';
import pg from 'pg';

const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || connectionString,
  ssl: isProduction,
})

export const getHighScore = async () => {
    let sql = "SELECT * FROM score ORDER BY high_score DESC LIMIT 10;";
    const result = await pool.query(sql);
    return result.rows;
  };