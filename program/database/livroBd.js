const {api} = require('./axiosConfig');
const url_str = 'livro';

async function createLivros(nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao) 
{
  try 
  {
    const response = await api.post(url_str, {nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao});
    if (response && response.data)
    {
      // console.log(response.data);
      return response.data; // Retorna os dados em caso de sucesso
    }
    else
      throw new Error('Resposta vazia ou inválida');
  } 
  catch (error) 
  {
    throw error; // Lança o erro para ser tratado externamente
  }
}

async function readLivros() 
{
  try 
  {
    const response = await api.get(url_str);
    if (response && response.data)
    {
      // console.log(response.data[0].nacionalidade); // funciona!!!
      // console.log(response.data);
      return response.data; // Retorna os dados em caso de sucesso
    }
    else
      throw new Error('Resposta vazia ou inválida');
  } 
  catch (error) 
  {
    throw error; // Lança o erro para ser tratado externamente
  }
}

async function readLivro(id) 
{
  const url = url_str + '/' + id;
  try 
  {
    const response = await api.get(url);
    if (response && response.data)
    {
      // console.log(response.data);
      return response.data; // Retorna os dados em caso de sucesso
    }
    else
      throw new Error('Resposta vazia ou inválida');
  } 
  catch (error) 
  {
    throw error; // Lança o erro para ser tratado externamente
  }  
}

async function updateLivro(id, nome, nome_livro, nome_editora, descricao, quantidade, data_public, genero, volume, edicao) 
{
  const url = url_str + '/' + id;
  try 
  {
    const response = await api.put(url, {nome, nome_livro, nome_editora, descricao, quantidade, data_public, genero, volume, edicao});
    if (response && response.data)
    {
      // console.log(response.data);
      return response.data; // Retorna os dados em caso de sucesso
    }
    else
      throw new Error('Resposta vazia ou inválida');
  } 
  catch (error) 
  {
    throw error; // Lança o erro para ser tratado externamente
  }  
}

async function deleteLivro(id) 
{
  const url = url_str + '/' + id;
  try 
  {
    const response = await api.delete(url);
    if (response && response.data)
    {
      // console.log(response.data);
      return response.data; // Retorna os dados em caso de sucesso
    }
    else
      throw new Error('Resposta vazia ou inválida');
  } 
  catch (error) 
  {
    throw error; // Lança o erro para ser tratado externamente
  }  
}

// FALTANDO!!!
async function searchLivro(nome_livro) 
{
  const url_new = url_str + '/busca/' + nome_livro;
  try 
  {
    const response = await api.get(url_new);
    if (response && response.data)
    {
      // console.log(response.data);
      return response.data; // Retorna os dados em caso de sucesso
    }
    else
      throw new Error('Resposta vazia ou inválida');
  } 
  catch (error) 
  {
    throw error; // Lança o erro para ser tratado externamente
  }  
}

readLivros();

module.exports = {createLivros, readLivros, readLivro, deleteLivro, updateLivro, searchLivro};