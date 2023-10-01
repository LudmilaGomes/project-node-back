const { waitForEnter, showMenu, readlineSync, promptEditora } = require('./menuFuncoes');
const {createEditoras, readEditoras, readEditora, deleteEditora, updateEditora, searchEditora} = require('../database/editoraBd');

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

module.exports = {submenuEditora};