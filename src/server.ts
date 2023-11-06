import app from './app';
import enviromentConfig from "./config/enviroment.config"; // salva número da porta usada
import "./config/database.config";

// define a porta na qual o servidor será executado
const PORT = enviromentConfig.app.port;

// // servidor é inicializado para escutar na porta indicada (PORT)
app
.listen(PORT, () =>  {
  console.log(`Servidor rodando na porta ${PORT}!`);
});
