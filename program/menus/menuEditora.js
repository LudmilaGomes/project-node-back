const { waitForEnter, showMenu, readlineSync, promptEditora } = require('./menuFuncoes');
const {createEditoras, readEditoras, readEditora, deleteEditora, updateEditora, searchEditora} = require('../database/editoraBd');

async function submenuEditora() 
{
  while (true) 
  {
    console.clear();
    const choice = await showMenu(promptEditora);
    let id, nome, endereco, num_telefone, email, site, ano_fundacao;
    switch (choice) 
    {
      case 'Criar Editora':
        nome = readlineSync.question('Nome da editora: ');
        endereco = readlineSync.question('Endereco da editora: ');
        num_telefone = readlineSync.question('Telefone da editora: ');
        email = readlineSync.question('E-mail da editora: ');
        site = readlineSync.question('Site da editora: (Opcional)');
        ano_fundacao = readlineSync.question('Ano de fundacao da editora: ');
        await createEditoras(nome, endereco, num_telefone, email, site, ano_fundacao);
        await waitForEnter();
        break;
      case 'Retornar Editoras':
        await readEditoras();
        await waitForEnter();
        break;
      case 'Retornar Editora':
        id = readlineSync.question('Id da editora: ');
        await readEditora(id);
        await waitForEnter();
        break;
      case 'Buscar Editora por nome':
        nome = readlineSync.question('Nome da editora: ');
        await searchEditora(nome);
        await waitForEnter();
        break;
      case 'Atualizar Editora':
        id = readlineSync.question('Id da editora: ');
        nome = readlineSync.question('Nome da editora: ');
        endereco = readlineSync.question('Endereco da editora: ');
        num_telefone = readlineSync.question('Telefone da editora: ');
        email = readlineSync.question('E-mail da editora: ');
        site = readlineSync.question('Site da editora: (Opcional)');
        ano_fundacao = readlineSync.question('Ano de fundacao da editora: ');
        await updateEditora(id, nome, endereco, num_telefone, email, site, ano_fundacao);
        await waitForEnter();
        break;
      case 'Excluir Editora':
        id = readlineSync.question('Id da editora: ');
        await deleteEditora(id);
        await waitForEnter();
        break;
      case 'Voltar':
        return;
    }
    console.clear();
  }
}

module.exports = {submenuEditora};