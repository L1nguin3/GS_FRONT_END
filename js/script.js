function enviarFeedback() {

    const nome = document.getElementById("feedback-nome").value.trim();
    const email = document.getElementById("feedback-email").value.trim();
    const descricao = document.getElementById("feedback-descricao").value.trim();

    if (nome === "" || email === "" || descricao === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    alert("Obrigado pelo feedback, " + nome + "! Sua opinião é muito importante para nós.");

    document.getElementById("formulario-feedback").reset();
}
