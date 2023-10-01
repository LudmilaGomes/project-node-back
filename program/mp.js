// Implementação do menu
const menus = require('./menus');
const { showMenu, submenuAutor, submenuEditora, submenuLivro, submenuRelatorios } = menus;

const promptMenu = ['Dados | Autor', 'Dados | Editora', 'Dados | Livros', 'Relatórios', 'Sair do Programa'];

// Função para exibir o menu principal
async function mainMenu() 
{
  while (true) 
  {
    console.clear();
    const choice = await showMenu(promptMenu);

    switch (choice) 
    {
      case 'Dados | Autor':
        await submenuAutor();
        break;
      case 'Dados | Editora':
        await submenuEditora();
        break;
      case 'Dados | Livros':
        await submenuLivro();
        break;
      case 'Relatórios':
        await submenuRelatorios();
        break;
      case 'Sair do Programa':
        console.log('Saindo do programa.');
        return;
    }
  }
}

mainMenu();