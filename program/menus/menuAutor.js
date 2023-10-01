const { waitForEnter, showMenu, readlineSync, promptAutor } = require('./menuFuncoes');
const {createAutores, readAutores, readAutor, deleteAutor, updateAutor, searchAutor} = require('../database/autorBd');

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

module.exports = {submenuAutor};