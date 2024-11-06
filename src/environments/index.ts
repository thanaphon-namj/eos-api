import { config } from 'dotenv';
config();

// Database
const HOST: string = process.env.DB_HOST || 'localhost';
const PORT: number = parseInt(process.env.DB_PORT, 10) || 3306;
const USERNAME: string = process.env.DB_USERNAME || 'root';
const PASSWORD: string = process.env.DB_PASSWORD;
const NAME: string = process.env.DB_NAME || 'eos_db';

const DB = {
  HOST,
  PORT,
  USERNAME,
  PASSWORD,
  NAME,
};

const SECRET_KEY: string = process.env.SECRET_KEY || 'SECRET_KEY';

export { DB, SECRET_KEY };
