import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connection;
if (process.env.DATABASE_URL) {
	console.log(process.env.DATABASE_URL);
	connection = new pg.Pool({ connectionString: process.env.DATABASE_URL });
} else {
	connection = new pg.Pool({ connectionString: 'postgres://postgres:rastafari@localhost:5432/politico' });
}

export default connection;
