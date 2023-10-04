const axios = require('axios');
const api = axios.create({ baseURL: 'http://192.168.0.253:3100/' });

const url_str = 'autor';

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

readAutores();