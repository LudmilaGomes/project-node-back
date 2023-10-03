const {api} = require('./axiosConfig');
const url_str = 'livro';

async function createLivros(nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao) 
{
  const response = await api.post(url_str, {nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao})
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log("ERRO: ", error.response.data);
  });
}

async function readLivros() 
{
  const response = await api.get(url_str)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log("ERRO: ", error.response.data);
  });
}

async function readLivro(id) 
{
  const url = url_str + '/' + id;
  const response = await api.get(url)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log("ERRO: ", error.response.data);
  });
}

async function updateLivro(id, nome, nome_livro, nome_editora, descricao, quantidade, data_public, genero, volume, edicao) 
{
  const url = url_str + '/' + id;
  const response = await api.put(url, {nome, nome_livro, nome_editora, descricao, quantidade, data_public, genero, volume, edicao})
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log("ERRO: ", error.response.data);
  });
}

async function deleteLivro(id) 
{
  const url = url_str + '/' + id;
  const response = await api.delete(url)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log("ERRO: ", error.response.data);
  });
}

async function searchLivro(nome_livro) 
{
  const url_new = url_str + '/busca/' + nome_livro;
  const response = await api.get(url_new)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log("ERRO: ", error.response.data);
  });
}

module.exports = {createLivros, readLivros, readLivro, deleteLivro, updateLivro, searchLivro};