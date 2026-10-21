
function navegar(url) {

  document.body.classList.add("saindo");

  setTimeout(() => {
    window.location.href = url;
  }, 1000);
}

document.addEventListener("click", (evento) => {
  // Encontra o link clicado (mesmo que o clique tenha sido num elemento dentro dele)
  const link = evento.target.closest("a[href]");
  

  // Cancela a navegação imediata e usa a transição
  evento.preventDefault();
  navegar(link.href);
});

// Remove o estado "saindo" ao voltar pelo histórico (cache bfcache),senão a página voltaria invisível


window.addEventListener("pageshow", () => document.body.classList.remove("saindo"));
