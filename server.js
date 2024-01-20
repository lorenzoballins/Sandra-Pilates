const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Configuração CORS
const corsOptions = {
    origin: '*',
    methods: 'POST',
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

// Roteamento de arquivos estáticos (se aplicável)
// app.use(express.static('caminho/para/os/seus/arquivos/estaticos'));

app.post('/salvar-dados', (req, res) => {
    const dados = req.body;
    salvarDadosLocalmente(dados);

    console.log('Dados recebidos:', dados);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

function salvarDadosLocalmente(dados) {
    const dataString = `${new Date().toLocaleString()}\nNome: ${dados.nome}\nEmail: ${dados.email}\nTelefone: ${dados.telefone}\nMensagem: ${dados.mensagem}\n\n`;

    const filePath = path.join(__dirname, 'respostas.txt');
    
    fs.writeFile(filePath, dataString, { flag: 'a' }, (err) => {
        if (err) {
            console.error('Erro ao salvar os dados localmente:', err);
        } else {
            console.log('Dados salvos localmente!');
        }
    });
}