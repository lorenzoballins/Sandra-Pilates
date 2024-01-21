const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const https = require('https');

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
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
};

const server = https.createServer(options, app);

// Logs de inicialização
server.listen(port, () => {
    console.log(`Servidor HTTPS rodando na porta ${port}`);
});

// Logs de erros globais
process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
    // Podemos até encerrar o processo em caso de erro não tratado
    // process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // process.exit(1);
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