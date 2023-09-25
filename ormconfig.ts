import dotenv from 'dotenv';

dotenv.config();

export default {
  type: 'postgres',
  port: Number(process.env.TYPEORM_PORT),
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  // logging: true,
  ssl: false,
  entities: ['src/models/**'],
  migrations: ['src/database/migrations/**']
};
