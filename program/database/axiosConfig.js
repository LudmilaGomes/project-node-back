const axios = require('axios');
const api = axios.create({ baseURL: 'http://192.168.0.253:3100/' });

module.exports = {api};