const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Porta configurada automaticamente pelo ambiente do servidor (Netlify)

app.use(cors());
app.use(bodyParser.json());

app.post('/salvar-dados', (req, res) => {
    const dados = req.body;

    // Salve os dados localmente
    salvarDadosLocalmente(dados);

    console.log('Dados recebidos:', dados);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
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