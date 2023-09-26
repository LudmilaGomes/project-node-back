import app from './app';
import enviromentConfig from "./config/enviroment.config"; // salva número da porta usada
import "./config/database.config"; // configuração de conexão com banco de dados usando DataSource

const express = require('express');

// define a porta na qual o servidor será executado
const PORT = enviromentConfig.app.port;

// // servidor é inicializado para escutar na porta indicada (PORT)
app.listen(PORT, () =>  {
  console.log(`Servidor rodando na porta ${PORT}!`);
});

// menu e interatividade com usuário - passar para outro arquivo e transoformar em função

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
      // Implemente a lógica para criar um autor
      break;
    case 'Ler Autor':
      // Implemente a lógica para ler um autor
      break;
    case 'Atualizar Autor':
      // Implemente a lógica para atualizar um autor
      break;
    case 'Excluir Autor':
      // Implemente a lógica para excluir um autor
      break;
    case 'Sair':
      console.log('Saindo do aplicativo.');
      process.exit(0);
  }
  mainMenu(); // Após realizar a operação desejada, você pode chamar o menu principal novamente
};

mainMenu(); // Inicie o aplicativo chamando o menu principal