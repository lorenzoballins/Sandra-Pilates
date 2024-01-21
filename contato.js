document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', async function (event) {
        event.preventDefault();

        document.getElementById('botao-enviar').disabled = true;

        try {
            await enviarFormulario();

            alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
            document.getElementById('formulario').reset();
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);

            if (error.message) {
                alert(`Ocorreu um erro ao enviar o formulário: ${error.message}`);
            } else {
                alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
            }
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

    const response = await fetch('https://127.0.0.1:3001/salvar-dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });

    if (!response.ok) {
        throw new Error(`Erro ao enviar o formulário. Status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error('Erro ao enviar o formulário.');
    }
}