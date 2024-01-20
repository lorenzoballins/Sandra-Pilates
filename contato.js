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
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/salvar-dados', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    if (data.success) {
                        // Exibir mensagem de sucesso no DOM
                        mostrarMensagem('Formulário enviado com sucesso!', true);
                        document.getElementById('formulario').reset();
                    } else {
                        throw new Error('Erro ao enviar o formulário.');
                    }
                } else {
                    throw new Error('Erro ao enviar o formulário.');
                }
            }
        };

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

        xhr.send(JSON.stringify(dados));
    } catch (error) {
        console.error("Erro ao enviar o formulário:", error.message);
        // Exibir mensagem de erro no DOM
        mostrarMensagem("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.", false);
    } finally {
        // Ativar o botão de envio novamente, independentemente do resultado
        document.getElementById("botao-enviar").disabled = false;
    }
}

function mostrarMensagem(message, isSuccess) {
    const mensagemElement = document.createElement('div');
    mensagemElement.textContent = message;
    mensagemElement.classList.add(isSuccess ? 'success' : 'error');

    document.body.appendChild(mensagemElement);

    // Remover a mensagem após alguns segundos
    setTimeout(() => {
        document.body.removeChild(mensagemElement);
    }, 5000);
}