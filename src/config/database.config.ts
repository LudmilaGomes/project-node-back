import { createConnection } from 'typeorm';

(async () => {
  try {
    console.log('Conectando com banco de dados...');
    await createConnection();
    console.log('Banco de dados está pronto para ser usado!');
  } catch (e) {
    console.log('Erro de conexão com banco de dados =>', e);
  }
})();