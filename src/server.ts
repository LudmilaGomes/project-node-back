import app from './app';
import enviromentConfig from "./config/enviroment.config"; // salva número da porta usada
import "./config/database.config"; // configuração de conexão com banco de dados usando DataSource
import { AutorController } from './controller/index.controller';

const express = require('express');

// define a porta na qual o servidor será executado
const PORT = enviromentConfig.app.port;

// rota raiz é definida com get
app.get("/", (req, res) => {
    res.send("Princesa de Fogo, por você meu queixo cai...");
});

// // servidor é inicializado para escutar na porta indicada (PORT)
app.listen(PORT, () =>  {
    console.log(`Servidor rodando na porta ${PORT}!`);
});

const { Select } = require('enquirer');

const mainMenu = async () => {
  const prompt = new Select({
    message: 'Escolha uma opção:',
    choices: [
      'Criar Autor',
      'Ler Autor',
      'Atualizar Autor',
      'Excluir Autor',
      'Sair',
    ],
  });

  const option = await prompt.run();

  switch (option) {
    case 'Criar Autor':
			await AutorController.create;
      // Implemente a lógica para criar um autor
      break;
    case 'Ler Autor':
			await AutorController.readAutores;
      // Implemente a lógica para ler um autor
      break;
    case 'Atualizar Autor':
			await AutorController.updateAutor;
      // Implemente a lógica para atualizar um autor
      break;
    case 'Excluir Autor':
			await AutorController.deleteAutor;
      // Implemente a lógica para excluir um autor
      break;
    case 'Sair':
      console.log('Saindo do aplicativo.');
      process.exit(0);
  }

  // Após realizar a operação desejada, você pode chamar o menu principal novamente
  mainMenu();
};

// Inicie o aplicativo chamando o menu principal
mainMenu();
