document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");

    const botaoEnviar = document.getElementById("botao-enviar");
    botaoEnviar.addEventListener("click", function (event) {
        event.preventDefault();
        botaoEnviar.disabled = true;
        enviarFormulario();
    });
});

async function enviarFormulario() {
    try {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const mensagem = document.getElementById('mensagem').value;

        const dados = {
            nome: nome,
            email: email,
            telefone: telefone,
            mensagem: mensagem
        };

        const response = await fetch('https://sandrastoco-pilates.netlify.app/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                mostrarMensagem('Formulário enviado com sucesso!', true);
                document.getElementById('formulario').reset();
            } else {
                throw new Error('Erro ao enviar o formulário.');
            }
        } else {
            throw new Error('Erro ao enviar o formulário.');
        }
    } catch (error) {
        console.error("Erro ao enviar o formulário:", error.message);
        mostrarMensagem("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.", false);
    } finally {
        document.getElementById("botao-enviar").disabled = false;
    }
}

function mostrarMensagem(message, isSuccess) {
    const mensagemElement = document.createElement('div');
    mensagemElement.textContent = message;
    mensagemElement.classList.add(isSuccess ? 'success' : 'error');

    document.body.appendChild(mensagemElement);

    setTimeout(() => {
        document.body.removeChild(mensagemElement);
    }, 5000);
}