const {api} = require('./axiosConfig');
const url_str = 'autor';

async function createAutores(nome, data_nasc, nacionalidade) 
{
  try 
  {
    const response = await api.post(url_str, {nome, data_nasc, nacionalidade});
    
    if (!response || !response.data) 
      throw new Error('Resposta vazia ou inválida');
    return response.data;
  } 
  catch (error) 
  {
    throw error; // Lança o erro para ser tratado externamente
  }
}

async function readAutores() 
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

async function readAutor(id) 
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

async function updateAutor(id, nome, data_nasc, nacionalidade) 
{
  const url = url_str + '/' + id;
  try 
  {
    const response = await api.put(url, {nome, data_nasc, nacionalidade});
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

async function deleteAutor(id) 
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
async function searchAutor(nome_autor) 
{
  const url_new = url_str + '/busca/' + nome_autor;
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

module.exports = {createAutores, readAutores, readAutor, deleteAutor, updateAutor, searchAutor};