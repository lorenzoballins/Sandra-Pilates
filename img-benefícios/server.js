const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const https = require('https');

const app = express();
const port = 3001;

// Configuração CORS para aceitar qualquer origem durante o desenvolvimento local
const corsOptions = {
    origin: '*',
    methods: 'POST',
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

// Logs de requisições
app.use((req, res, next) => {
    console.log(`Recebida requisição ${req.method} para ${req.url}`);
    next();
});

// Endpoint para salvar dados
app.post('/salvar-dados', (req, res) => {
    try {
        const dados = req.body;
        console.log('Dados recebidos:', dados);

        if (!dados.nome || !dados.email || !dados.telefone) {
            throw new Error('Campos obrigatórios ausentes.');
        }

        salvarDadosLocalmente(dados);
        res.json({ success: true });
    } catch (error) {
        console.error('Erro no endpoint /salvar-dados:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Configuração do servidor HTTPS
try {
    const options = {
        key: fs.readFileSync(path.join(__dirname, 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
    };

    // Modificação para aceitar conexões de todas as interfaces de rede
    const server = https.createServer(options, app).listen(port, '0.0.0.0', () => {
        console.log(`Servidor HTTPS rodando na porta ${port}`);
    });
} catch (error) {
    console.error('Erro ao configurar o servidor HTTPS:', error);
    process.exit(1);
}

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