const { waitForEnter, showMenu, readlineSync, promptRelatorios } = require('./menuFuncoes');
const { readAutores } = require('./../database/autorBd');
const { readEditoras } = require('./../database/editoraBd');
const { readLivros } = require('./../database/livroBd');

// adiciona strings ao dicionário como chaves; quantidades de instâncias das strings são valores
async function addStringDict(str, dict) // parâmetros: string, dicionário
{
  if (dict[str]) // se a chave já existe, incrementa um à quantidade
    dict[str] += 1;
  else // se a chave não existe, é criada e tem quantidade 1
    dict[str] = 1; 
  return dict; // retorna o dicionário
}

// quantidade de autores cadastrados, lista com todos os nomes, anos de nascimento, nacionalidades
async function relatAutor() 
{
  // captura todos os dados de autores
  const dados = await readAutores();
  // variáveis importantes que são usadas (listas e dicionário)
  let listaNacional = [], listaNomes = [], listaDataNasc = [], dictNacional = {}, quant_autor;
  let i;
  // guardamos os dados nas listas com o laço de rep.
  for (i = 0; i < dados.length; i++) 
  {
    listaNacional.push(dados[i].nacionalidade);
    listaNomes.push(dados[i].nome);
    listaDataNasc.push(dados[i].data_nasc);
  }
  // valor do índice final + 1 é a quant. de autores cadastrados no sistema
  quant_autor = i + 1; 
  // laço de rep. para adicionar nacionalidades ao dicionário e suas quantidades
  for (i = 0; i < listaNacional.length; i++) 
  {
    dictNacional = await addStringDict(listaNacional[i] , dictNacional);
  }
  // laço de rep. para separar string de data de nasc.; retorna apenas a parte do ano de nasc.
  let listaAnoNasc = listaDataNasc.map(function(data) 
  {
    var partes = data.split('-');
    return partes[0];
  });

  console.log("==================================== RELATORIO | AUTORES ====================================");
  console.log();
  console.log("Quantidade de autores cadastrados: ", quant_autor);
  console.log();
  console.log("Lista com nomes dos autores: ", listaNomes);
  console.log();
  console.log("Lista com anos de nascimento: ", listaAnoNasc);
  console.log();
  console.log("Quantidade de autores por nacionalidade: ", dictNacional);
  console.log();
}

// quantidade de editoras, lista com nomes, quantas têm site, lista com emails, anos de fundação
async function relatEditora() 
{
  const dados = await readEditoras();

  // variáveis importantes que são usadas (listas e dicionário)
  let listaNomes = [], listaSites = [], listaEmails = [],  quant_editoras;
  let i;
  // guardamos os dados nas listas com o laço de rep.
  for (i = 0; i < dados.length; i++) 
  {
    listaNomes.push(dados[i].nome);
    listaSites.push(dados[i].site);
    listaEmails.push(dados[i].email);
  }
  quant_editoras = i + 1;

  console.log("==================================== RELATORIO | EDITORAS ====================================");
  console.log();
  console.log("Quantidade de editoras cadastradas: ", quant_editoras);
  console.log();
  console.log("Lista com nomes das editoras: ", listaNomes);
  console.log();
  console.log("Lista com sites: ", listaSites);
  console.log();
  console.log("Lista com e-mails: ", listaEmails);
  console.log();
}

// quantidades de livros cadastrados, ano de publicação, gêneros, quantidade de exemplares
async function relatLivro() 
{
  const dados = await readLivros();
  // variáveis importantes que são usadas (listas e dicionário)
  let listaGenero = [], listaDataPublic = [], dictGenero = {}, quant_livros, quant_exemplares = 0;
  let i;
  for (i = 0; i < dados.length; i++) 
  {
    listaGenero.push(dados[i].genero);
    listaDataPublic.push(dados[i].data_public);
    quant_exemplares += dados[i].quantidade;
  }
  quant_livros = i + 1;
  
  for (i = 0; i < listaGenero.length; i++) 
  {
    dictGenero = await addStringDict(listaGenero[i] , dictGenero);
  }

  let listaAnoPublic = listaDataPublic.map(function(data) 
  {
    var partes = data.split('-');
    return partes[0];
  });

  console.log("==================================== RELATORIO | LIVROS ====================================");
  console.log();
  console.log("Quantidade de livros cadastrados: ", quant_livros);
  console.log();
  console.log("Total de exemplares guardados: ", quant_exemplares);
  console.log();
  console.log("Quantidade de livros por genero: ", dictGenero);
  console.log();
  console.log("Lista com anos de publicacao: ", listaAnoPublic);
  console.log();
}

async function submenuRelatorios() 
{
  while (true) 
  {
    const choice = await showMenu(promptRelatorios);

    switch (choice) 
    {
      case 'Visualizar Relatório de Autores':
        await relatAutor();
        await waitForEnter();
        // quantidade de autores cadastrados, lista com todos os nomes, anos de nascimento, nacionalidades
        break;
      case 'Visualizar Relatório de Editoras':
        await relatEditora();
        await waitForEnter();
        // quantidade de editoras, lista com nomes, quantas têm site, lista com emails, anos de fundação
        break;
      case 'Visualizar Relatório de Livros':
        await relatLivro();
        await waitForEnter();
        // quantidades de livros cadastrados, ano de publicação, gêneros, quantidade de exemplares
        break;
      case 'Voltar':
        return;
    }
    console.clear();
  }
}

module.exports = {submenuRelatorios};