import { DataSource } from 'typeorm';
import enviromentConfig from "./enviroment.config";
import ormconfig from '../../ormconfig';

const connectDB =  new DataSource({
  type: "postgres",
  host: ormconfig.host,
  port: ormconfig.port,
  username: ormconfig.username,
  password: ormconfig.password,
  database: ormconfig.database,
  logging: false,
  entities: ormconfig.entities,
  migrations: ormconfig.migrations,
})

connectDB.initialize()
  .then(() => {
      console.log('Conexão com o banco de dados feita - DataSource inicializado.');
  })
  .catch((err) => {
      console.error('Erro na Conexão - DataSource não conseguiu ser inicializado!', err);
  })

export default connectDB;