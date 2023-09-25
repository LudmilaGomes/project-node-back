import { DataSource } from 'typeorm';

const connectDB =  new DataSource({
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "postgres",
  password: "caixapandora",
  database: "projetonode",
  logging: false,
  entities: ['src/models/**/*.ts'],
  migrations: ['src/database/migrations/**/*.ts']
})

connectDB.initialize()
  .then(() => {
      console.log('Conexão com o banco de dados feita - DataSource inicializado.');
  })
  .catch((err) => {
      console.error('Erro na Conexão - DataSource não conseguiu ser inicializado!', err);
  })

export default connectDB;