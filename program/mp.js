const { submenuAutor, 
submenuEditora, 
submenuLivro, 
submenuRelatorios, 
showMenu, 
promptMenu } 
= require('./menus/menu.index');

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