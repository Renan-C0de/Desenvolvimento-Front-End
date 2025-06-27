// Comentário: Este arquivo JavaScript conterá funções para interatividade e validação.

// Função para lidar com a validação do formulário de contato
function validateContactForm() {
    // Comentário: Obtém o formulário pelo seu ID
    const form = document.getElementById('contactForm');
    if (!form) return; // Comentário: Sai da função se o formulário não for encontrado (para evitar erros em outras páginas)

    // Comentário: Adiciona um 'event listener' para o evento de 'submit' do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Comentário: Previne o comportamento padrão de envio do formulário (recarregar a página)

        // Comentário: Limpa mensagens de erro e feedback anteriores
        clearMessages();

        // Comentário: Obtém os valores dos campos do formulário
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const assunto = document.getElementById('assunto').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // Comentário: Variável para controlar se o formulário é válido
        let isValid = true;

        // Comentário: Validação do campo Nome (obrigatório)
        if (nome === '') {
            displayError('nomeError', 'Por favor, digite seu nome.');
            isValid = false;
        }

        // Comentário: Validação do campo E-mail (obrigatório e formato)
        if (email === '') {
            displayError('emailError', 'Por favor, digite seu e-mail.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            displayError('emailError', 'Por favor, digite um formato de e-mail válido.');
            isValid = false;
        }

        // Comentário: Validação do campo Assunto (obrigatório)
        if (assunto === '') {
            displayError('assuntoError', 'Por favor, digite o assunto.');
            isValid = false;
        }

        // Comentário: Validação do campo Mensagem (obrigatório e mínimo de 20 caracteres)
        if (mensagem === '') {
            displayError('mensagemError', 'Por favor, digite sua mensagem.');
            isValid = false;
        } else if (mensagem.length < 20) {
            displayError('mensagemError', 'A mensagem deve ter no mínimo 20 caracteres.');
            isValid = false;
        }

        // Comentário: Exibe mensagem de feedback se o formulário for válido ou inválido
        if (isValid) {
            displayFeedback('success', 'Mensagem enviada com sucesso! Em breve entraremos em contato.');
            form.reset(); // Comentário: Limpa o formulário após o envio bem-sucedido
        } else {
            displayFeedback('error', 'Por favor, corrija os erros no formulário.');
        }
    });

    // Comentário: Função para exibir mensagens de erro
    function displayError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block'; // Garante que a mensagem seja visível
        }
    }

    // Comentário: Função para exibir mensagens de feedback (sucesso/erro)
    function displayFeedback(type, message) {
        const feedbackElement = document.getElementById('feedbackMessage');
        if (feedbackElement) {
            feedbackElement.textContent = message;
            feedbackElement.className = 'feedback-message ' + type; // Adiciona a classe para estilização
            feedbackElement.style.display = 'block';
        }
    }

    // Comentário: Função para limpar todas as mensagens de erro e feedback
    function clearMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.textContent = '';
            msg.style.display = 'none';
        });
        const feedbackElement = document.getElementById('feedbackMessage');
        if (feedbackElement) {
            feedbackElement.textContent = '';
            feedbackElement.className = 'feedback-message';
            feedbackElement.style.display = 'none';
        }
    }

    // Comentário: Função para validar o formato do e-mail usando uma expressão regular
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Comentário: Adiciona um 'event listener' para garantir que o DOM esteja totalmente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', validateContactForm);