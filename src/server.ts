const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 4900;

// Start the server
app.listen(PORT, () => 
{
    console.log(`Server rodando na porta ${PORT}!`);
});