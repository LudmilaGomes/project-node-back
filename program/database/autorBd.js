const {api} = require('./axiosConfig');
const url_str = 'autor';

async function createAutores(nome, data_nasc, nacionalidade) 
{
  const response = await api.post(url_str, {nome, data_nasc, nacionalidade})
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("ERRO: ", error.response.data);
    });
}

async function readAutores() 
{
  const response = await api.get(url_str)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log("ERRO: ", error.response.data);
  });
}

async function readAutor(id) 
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

async function updateAutor(id, nome, data_nasc, nacionalidade) 
{
  const url = url_str + '/' + id;
  const response = await api.put(url, {nome, data_nasc, nacionalidade})
  .then(function (response) {
    console.log("Dados do autor atualizados!");
  })
  .catch(function (error) {
    console.log("ERRO: ", error.response.data);
  });
}

async function deleteAutor(id) 
{
  const url = url_str + '/' + id;
  const response = await api.delete(url)
  .then(function (response) {
    console.log("Autor removido!");
  })
  .catch(function (error) {
    console.log("ERRO: ", error.response.data);
  });
}

async function searchAutor(nome_autor) 
{
  const url_new = url_str + '/busca/' + nome_autor;
  const response = await api.get(url_new)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log("ERRO: ", error.response.data);
  });
}

module.exports = {createAutores, readAutores, readAutor, deleteAutor, updateAutor, searchAutor};