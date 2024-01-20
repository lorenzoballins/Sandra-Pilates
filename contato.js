document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', async function (event) {
        event.preventDefault();
        document.getElementById('botao-enviar').disabled = true;

        await enviarFormulario();
    });
});

let envioEmProgresso = false;

async function enviarFormulario() {
    try {
        if (envioEmProgresso) {
            return;
        }

        envioEmProgresso = true;

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

        const response = await fetch('https://localhost:3000/salvar-dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const data = await response.json();

        if (data.success) {
            alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
            document.getElementById('formulario').reset();
        } else {
            throw new Error('Erro ao enviar o formulário.');
        }
    } catch (error) {
        console.error('Erro ao enviar o formulário:', error.message);
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
    } finally {
        document.getElementById('botao-enviar').disabled = false;
        envioEmProgresso = false;
    }
}