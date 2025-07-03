import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',      
  database: 'postgres',
  user: 'postgres',        
  password: 'postgres'
});

export async function query<T = unknown>(
  sqlCommand: string,
  params?: unknown[]
): Promise<{ rows: T[] }> {
  const result = await pool.query(sqlCommand, params);
	console.log("QUERY RESULT:\n ")
  return { rows: result.rows };
}


