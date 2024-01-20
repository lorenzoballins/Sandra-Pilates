document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Desativar o botão de envio para evitar envios múltiplos
        document.getElementById('botao-enviar').disabled = true;

        await enviarFormulario();
    });
});

let envioEmProgresso = false; // Adicionado para rastrear o status do envio

async function enviarFormulario() {
    try {
        // Verificar se o envio já está em andamento
        if (envioEmProgresso) {
            return;
        }

        envioEmProgresso = true;

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const mensagem = document.getElementById('mensagem').value;

        // Validar campos obrigatórios
        if (!nome || !email || !telefone) {
            throw new Error('Por favor, preencha todos os campos obrigatórios.');
        }

        const dados = {
            nome: nome,
            email: email,
            telefone: telefone,
            mensagem: mensagem
        };

        // Enviar os dados para o servidor local
        const response = await fetch('http://localhost:3000/salvar-dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const data = await response.json();

        if (data.success) {
            alert('Formulário enviado com sucesso! Entraremos em contato em breve.');

            // Remova o ouvinte de eventos após o envio bem-sucedido
            document.getElementById('formulario').removeEventListener('submit', enviarFormulario);
        } else {
            throw new Error('Erro ao enviar o formulário.');
        }
    } catch (error) {
        console.error('Erro ao enviar o formulário:', error.message);
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
    } finally {
        // Ative o botão de envio novamente, independentemente do resultado
        document.getElementById('botao-enviar').disabled = false;

        // Resetar o status do envio
        envioEmProgresso = false;
    }
}
