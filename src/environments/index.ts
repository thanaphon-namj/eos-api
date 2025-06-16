import { config } from 'dotenv';
config();

const PORT = parseInt(process.env.APP_PORT, 10) || 3000;

// Database
const DB_HOST: string = process.env.DB_HOST || 'localhost';
const DB_URL: string = process.env.DB_URL;
const DB_PORT: number = parseInt(process.env.DB_PORT, 10) || 3306;
const DB_USERNAME: string = process.env.DB_USERNAME || 'root';
const DB_PASSWORD: string = process.env.DB_PASSWORD;
const DB_NAME: string = process.env.DB_NAME || 'eosdb';

// Facebook Page
const FACEBOOK_APP_ID: string = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET: string = process.env.FACEBOOK_APP_SECRET;

const DB = {
  HOST: DB_HOST,
  URL: DB_URL,
  PORT: DB_PORT,
  USERNAME: DB_USERNAME,
  PASSWORD: DB_PASSWORD,
  NAME: DB_NAME,
  SSL: {
    CA: Buffer.from(process.env.DB_SSL_CA, 'base64').toString('ascii'),
  },
};

const SECRET_KEY: string = process.env.SECRET_KEY || 'SECRET_KEY';

const FACEBOOK = {
  APP_ID: FACEBOOK_APP_ID,
  APP_SECRET: FACEBOOK_APP_SECRET,
};

export { PORT, DB, SECRET_KEY, FACEBOOK };
