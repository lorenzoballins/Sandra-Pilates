document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        // Desativar o botão de envio para evitar envios múltiplos
        document.getElementById("botao-enviar").disabled = true;

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
                        alert('Formulário enviado com sucesso!');
                        mostrarNotificacao('Formulário enviado com sucesso!');
                        document.getElementById('formulario').removeEventListener('submit', enviarFormulario);
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
        alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.");
    } finally {
        // Ativar o botão de envio novamente, independentemente do resultado
        document.getElementById("botao-enviar").disabled = false;
    }
}

function mostrarNotificacao(message) {
    if ("Notification" in window) {
        if (Notification.permission === "granted") {
            new Notification("Notificação de Envio", { body: message });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification("Notificação de Envio", { body: message });
                }
            });
        }
    }
}
