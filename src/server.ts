import app from "./app"; // importamos arquivo 'app.ts'
import enviromentConfig from "./config/enviroment.config"; // salva número da porta usada
import "./config/database.config"; // configuração de conexão com banco de dados usando DataSource

const express = require('express');

// define a porta na qual o servidor será executado
const PORT = enviromentConfig.app.port;

// rota raiz é definida com get
app.get("/", (req, res) => {
    res.send("Princesa de Fogo, por você meu queixo cai...");
});

// servidor é inicializado para escutar na porta indicada (PORT)
app.listen(PORT, () =>  {
    console.log(`Servidor rodando na porta ${PORT}!`);
});