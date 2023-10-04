const { waitForEnter, showMenu, readlineSync, promptRelatorios } = require('./menuFuncoes');
const {api} = require('./../database/axiosConfig');

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
  const response = await api.get('autor');
  const dados = response.data;
  // variáveis importantes que são usadas (listas e dicionário)
  let listaNacional = [], listaNomes = [], listaDataNasc = [], dictNacional = {}, quant_autor;
  let i;

  // se não houver autores cadastrados!
  if (!dados)
  {
    console.log("Não há autores cadastrados!");
    return;
  }

  // guardamos os dados nas listas com o laço de rep.
  for (i = 0; i < dados.length; i++) 
  {
    listaNacional.push(dados[i].nacionalidade);
    listaNomes.push(dados[i].nome);
    listaDataNasc.push(dados[i].data_nasc);
  }
  // valor do índice final + 1 é a quant. de autores cadastrados no sistema
  quant_autor = dados.length; 
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
  const response = await api.get('editora');
  const dados = response.data;

  // variáveis importantes que são usadas (listas e dicionário)
  let listaNomes = [], listaSites = [], listaEmails = [],  quant_editoras;
  let i;
  
  // se não houver editoras cadastradas!
  if (!dados)
  {
    console.log("Não há editoras cadastradas!");
    return;
  }

  // guardamos os dados nas listas com o laço de rep.
  for (i = 0; i < dados.length; i++) 
  {
    listaNomes.push(dados[i].nome);
    listaSites.push(dados[i].site);
    listaEmails.push(dados[i].email);
  }
  quant_editoras = dados.length;

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
  const response = await api.get('livro');
  const dados = response.data;
  // variáveis importantes que são usadas (listas e dicionário)
  let listaGenero = [], listaDataPublic = [], listaNomes = [], dictGenero = {}, quant_livros, quant_exemplares = 0;
  let i;

  // se não houver livros cadastrados!
  if (!dados)
  {
    console.log("Não há livros cadastrados!");
    return;
  }

  for (i = 0; i < dados.length; i++) 
  {
    listaNomes.push(dados[i].nome);
    listaGenero.push(dados[i].genero);
    listaDataPublic.push(dados[i].data_public);
    quant_exemplares += dados[i].quantidade;
  }
  quant_livros = dados.length;
  
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
  console.log("Nomes de livros cadastrados: ", listaNomes);
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
    console.clear();
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