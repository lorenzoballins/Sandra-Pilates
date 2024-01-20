document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario');
    let envioEmProgresso = false;

    formulario.addEventListener('submit', async function (event) {
        event.preventDefault();

        document.getElementById('botao-enviar').disabled = true;

        try {
            await enviarFormulario();

            alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
            document.getElementById('formulario').reset();
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error.message);
            alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
        } finally {
            document.getElementById('botao-enviar').disabled = false;
        }
    });
});

async function enviarFormulario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;

    if (!nome || !email || !telefone) {
        throw new Error('Por favor, preencha todos os campos obrigatórios.');
    }

    const dados = {
        nome: nome,
        email: email,
        telefone: telefone,
        mensagem: mensagem
    };

    const serverUrl = detectarAmbiente() === 'production' ? 'https://192.168.15.17:3000' : 'http://localhost:3000';
    const response = await fetch(`${serverUrl}/salvar-dados`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });

    const data = await response.json();

    if (!data.success) {
        throw new Error('Erro ao enviar o formulário.');
    }
}

function detectarAmbiente() {
    return typeof window !== 'undefined' && window.location.href.startsWith('https://') ? 'production' : 'development';
}
