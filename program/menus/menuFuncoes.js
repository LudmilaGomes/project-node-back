// importações importantes que são usadas
const readline = require('readline');
const { prompt } = require('enquirer');
// importado para ser usado nos outros arquivos (é exportado)
const readlineSync = require('readline-sync');

// listas com as opções para cada menu; são exportadas e usadas nos arquivos de menu
const promptMenu = ['Dados | Autor', 'Dados | Editora', 'Dados | Livros', 'Relatórios', 'Sair do Programa'];
const promptAutor = ['Criar Autor', 'Retornar Autores', 'Retornar Autor', 'Buscar Autor por nome', 'Atualizar Autor', 'Excluir Autor', 'Voltar'];
const promptEditora = ['Criar Editora', 'Retornar Editoras', 'Retornar Editora', 'Buscar Editora por nome', 'Atualizar Editora', 'Excluir Editora', 'Voltar'];
const promptLivro = ['Criar Livro', 'Retornar Livros', 'Retornar Livro', 'Buscar Livro por nome', 'Atualizar Livro', 'Excluir Livro', 'Voltar'];
const promptRelatorios = ['Visualizar Relatório de Autores', 'Visualizar Relatório de Editoras', 'Visualizar Relatório de Livros', 'Voltar'];

// função para fazer programa esperar até usuário pressionar Enter
async function waitForEnter() 
{
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  await new Promise((resolve) => {
    rl.question('Pressione ENTER para continuar...', () => {
      rl.close();
      resolve();
    });
  });
}

// função para exibir um menu e retornar a opção selecionada
async function showMenu(options) 
{
  const response = await prompt({
    type: 'select',
    name: 'choice',
    message: 'Escolha uma opção:',
    choices: options,
  });

  return response.choice;
}

module.exports = {
waitForEnter, 
showMenu, 
readlineSync, 
promptMenu,
promptAutor, 
promptEditora, 
promptLivro, 
promptRelatorios};