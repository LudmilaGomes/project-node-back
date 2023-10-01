const { prompt } = require('enquirer');
const {createAutores, readAutores, readAutor, deleteAutor, updateAutor, searchAutor, /*searchAutor*/} = require('./database/autorBd');
const {createEditoras, readEditoras, readEditora, deleteEditora, updateEditora, searchEditora, /*searchEditora*/} = require('./database/editoraBd');
const {createLivros, readLivros, readLivro, deleteLivro, updateLivro, searchLivro, /*searchLivro*/} = require('./database/livroBd');
const readline = require('readline');
const readlineSync = require('readline-sync');

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

// Função para exibir um menu e retornar a opção selecionada
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

// Funções para os submenus
async function submenuAutor() 
{
  while (true) 
  {
    const choice = await showMenu(promptAutor);
    let id, nome, data_nasc, nacionalidade;
    switch (choice) 
    {
      case 'Criar Autor':
        nome = readlineSync.question('Nome do autor? ');
        data_nasc = readlineSync.question('Data de nascimento do autor? ');
        nacionalidade = readlineSync.question('Nacionalidade do autor? ');
        console.log(await createAutores(nome, data_nasc, nacionalidade));
        await waitForEnter();
        break;
      case 'Retornar Autores':
        console.log(await readAutores());
        await waitForEnter();
        break;
      case 'Retornar Autor':
        id = readlineSync.question('Id do autor? ');
        console.log(await readAutor(id));
        await waitForEnter();
        break;
      case 'Buscar Autor por nome':
        nome = readlineSync.question('Nome do autor? ');
        console.log(await searchAutor(nome));
        await waitForEnter();
        break;
      case 'Atualizar Autor':
        id = readlineSync.question('Id do autor? ');
        nome = readlineSync.question('Nome do autor? ');
        data_nasc = readlineSync.question('Data de nascimento do autor? ');
        nacionalidade = readlineSync.question('Nacionalidade do autor? ');
        console.log(await updateAutor(id, nome, data_nasc, nacionalidade));
        await waitForEnter();
        break;
      case 'Excluir Autor':
        id = readlineSync.question('Id do autor? ');
        console.log(await deleteAutor(id));
        await waitForEnter();
        break;
      case 'Voltar':
        return;
    }
    console.clear();
  }
}

async function submenuEditora() 
{
  while (true) 
  {
    const choice = await showMenu(promptEditora);
    let id, nome, endereco, num_telefone, email, site, ano_fundacao;
    switch (choice) 
    {
      case 'Criar Editora':
        nome = readlineSync.question('Nome da editora? ');
        endereco = readlineSync.question('Endereço da editora? ');
        num_telefone = readlineSync.question('Telefone da editora? ');
        email = readlineSync.question('E-mail da editora? ');
        site = readlineSync.question('Site da editora? (Opcional)');
        ano_fundacao = readlineSync.question('Ano de fundação da editora? ');
        console.log(await createEditoras(nome, endereco, num_telefone, email, site, ano_fundacao));
        await waitForEnter();
        break;
      case 'Retornar Editoras':
        console.log(await readEditoras());
        await waitForEnter();
        break;
      case 'Retornar Editora':
        id = readlineSync.question('Id da editora? ');
        console.log(await readEditora(id));
        await waitForEnter();
        break;
      case 'Buscar Editora por nome':
        nome = readlineSync.question('Nome da editora? ');
        console.log(await searchEditora(nome));
        await waitForEnter();
        break;
      case 'Atualizar Editora':
        id = readlineSync.question('Id da editora? ');
        nome = readlineSync.question('Nome da editora? ');
        endereco = readlineSync.question('Endereço da editora? ');
        num_telefone = readlineSync.question('Telefone da editora? ');
        email = readlineSync.question('E-mail da editora? ');
        site = readlineSync.question('Site da editora? (Opcional)');
        ano_fundacao = readlineSync.question('Ano de fundação da editora? ');
        console.log(await updateEditora(id, nome, endereco, num_telefone, email, site, ano_fundacao));
        await waitForEnter();
        break;
      case 'Excluir Editora':
        id = readlineSync.question('Id da editora? ');
        console.log(await deleteEditora(id));
        await waitForEnter();
        break;
      case 'Voltar':
        return;
    }
    console.clear();
  }
}

async function submenuLivro() 
{
  while (true) 
  {
    const choice = await showMenu(promptLivro);
    let id, nome, nome_autor = null, nome_editora = null, descricao, quantidade, data_public, genero, volume, edicao;
    switch (choice) 
    {
      case 'Criar Livro':
        nome = readlineSync.question('Nome do livro? ');
        nome_autor = readlineSync.question('Nome do autor do livro? ');
        console.log("autor: ", nome_autor);
        nome_editora = readlineSync.question('Nome da editora do livro? ');
        console.log("editora: ", nome_editora);
        descricao = readlineSync.question('Descricao do livro? ');
        quantidade = readlineSync.question('Quantidade de exemplares do livro? ');
        data_public = readlineSync.question('Data de publicacao do livro? ');
        genero = readlineSync.question('Gênero do livro? ');
        volume = readlineSync.question('Volume do livro? ');
        edicao = readlineSync.question('Edição do livro? ');
        console.log(await createLivros(nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao));
        await waitForEnter();
        break;
      case 'Retornar Livros':
        console.log(await readLivros());
        await waitForEnter();
        break;
      case 'Retornar Livro':
        id = readlineSync.question('Id do livro? ');
        console.log(await readLivro(id));
        await waitForEnter();
        break;
      case 'Buscar Livro por nome':
        nome = readlineSync.question('Nome do livro? ');
        console.log(await searchLivro(nome));
        await waitForEnter();
        break;
      case 'Atualizar Livro':
        id = readlineSync.question('Id do livro? ');
        nome = readlineSync.question('Nome do livro? ');
        nome_autor = readlineSync.question('Nome do autor do livro? ');
        nome_editora = readlineSync.question('Nome da editora do livro? ');
        descricao = readlineSync.question('Descricao do livro? ');
        quantidade = readlineSync.question('Quantidade de exemplares do livro? ');
        data_public = readlineSync.question('Data de publicacao do livro? ');
        genero = readlineSync.question('Gênero do livro? ');
        volume = readlineSync.question('Volume do livro? ');
        edicao = readlineSync.question('Edição do livro? ');
        console.log(await updateLivro(id, nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao));
        await waitForEnter();
        break;
      case 'Excluir Livro':
        id = readlineSync.question('Id do livro? ');
        console.log(await deleteLivro(id));
        await waitForEnter();
        break;
      case 'Voltar':
        return;
    }
    console.clear();
  }
}

async function submenuRelatorios() 
{
  while (true) 
  {
    const choice = await showMenu(promptRelatorios);

    switch (choice) 
    {
      case 'Visualizar Relatório de Autores':
        const dados = await getAutores();
        // usar dados de autores para capturar informações e gerar relatório (fazer em uma função)
        break;
      case 'Visualizar Relatório de Editoras':
        break;
      case 'Visualizar Relatório de Livros':
        break;
      case 'Voltar':
        return;
    }
    console.clear();
  }
}

module.exports = {showMenu, submenuAutor, submenuEditora, submenuLivro, submenuRelatorios, waitForEnter};