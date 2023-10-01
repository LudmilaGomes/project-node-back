const {api} = require('./axiosConfig');
const url_str = 'editora';

async function createEditoras(nome, endereco, num_telefone, email, site, ano_fundacao) 
{
  try 
  {
    const response = await api.post(url_str, {nome, endereco, num_telefone, email, site, ano_fundacao});
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

async function readEditoras() 
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

async function readEditora(id) 
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

async function updateEditora(id, nome, endereco, num_telefone, email, site, ano_fundacao) 
{
  const url = url_str + '/' + id;
  try 
  {
    const response = await api.put(url, {nome, endereco, num_telefone, email, site, ano_fundacao});
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

async function deleteEditora(id) 
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
async function searchEditora(nome_editora) 
{
  const url_new = url_str + '/busca/' + nome_editora;
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

readEditoras();

module.exports = {createEditoras, readEditoras, readEditora, deleteEditora, updateEditora, searchEditora};