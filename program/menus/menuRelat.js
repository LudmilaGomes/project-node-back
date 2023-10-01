const { waitForEnter, showMenu, readlineSync, promptRelatorios } = require('./menuFuncoes');

async function submenuRelatorios() 
{
  while (true) 
  {
    const choice = await showMenu(promptRelatorios);

    switch (choice) 
    {
      case 'Visualizar Relatório de Autores':
        const dados = await getAutores();
        // quantidade de autores cadastrados, lista com todos os nomes, anos de nascimento, nacionalidades
        break;
      case 'Visualizar Relatório de Editoras':
        // quantidade de editoras, lista com nomes, quantas têm site, lista com emails, anos de fundação
        break;
      case 'Visualizar Relatório de Livros':
        // quantidades de livros cadastrados, ano de publicação, gêneros, quantidade de exemplares
        break;
      case 'Voltar':
        return;
    }
    console.clear();
  }
}

module.exports = {submenuRelatorios};