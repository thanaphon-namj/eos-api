import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  url: process.env.DB_URL,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
    ca: Buffer.from(process.env.DB_SSL_CA, 'base64').toString('ascii'),
  },
  migrations: [__dirname + '/migrations/*.ts'],
});

export default dataSource;
