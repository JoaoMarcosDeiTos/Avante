// Arquivo de debug para o menu
console.log("Script menu-debug.js carregado");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded disparado");

  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.getElementById("main-nav");
  let menuOverlay;

  console.log("Botão do menu:", menuBtn);
  console.log("Nav principal:", mainNav);

  // Criar overlay para o menu
  function createOverlay() {
    console.log("Criando overlay para o menu");
    menuOverlay = document.createElement("div");
    menuOverlay.className = "menu-overlay";
    menuOverlay.style.position = "fixed";
    menuOverlay.style.top = "0";
    menuOverlay.style.left = "0";
    menuOverlay.style.width = "100%";
    menuOverlay.style.height = "100%";
    menuOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    menuOverlay.style.zIndex = "90";
    menuOverlay.style.opacity = "0";
    menuOverlay.style.visibility = "hidden";
    menuOverlay.style.transition = "all 0.3s ease-in-out";

    // Inserir overlay no DOM
    document.body.insertBefore(menuOverlay, document.body.firstChild);
    console.log("Overlay criado:", menuOverlay);

    // Adicionar evento de clique para fechar o menu
    menuOverlay.addEventListener("click", function () {
      console.log("Overlay clicado, fechando menu");
      closeMenu();
    });
  }

  // Função para abrir o menu
  function openMenu() {
    console.log("Abrindo menu");
    mainNav.classList.add("active");
    menuBtn.classList.add("active");
    menuOverlay.style.opacity = "1";
    menuOverlay.style.visibility = "visible";
    document.body.style.overflow = "hidden";
  }

  // Função para fechar o menu
  function closeMenu() {
    console.log("Fechando menu");
    mainNav.classList.remove("active");
    menuBtn.classList.remove("active");
    menuOverlay.style.opacity = "0";
    menuOverlay.style.visibility = "hidden";
    document.body.style.overflow = "";
  }

  if (menuBtn && mainNav) {
    console.log("Botão do menu e nav encontrados, configurando menu");

    // Criar overlay
    createOverlay();

    menuBtn.addEventListener("click", function () {
      console.log("Botão do menu clicado");
      if (mainNav.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Fechar menu com a tecla ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mainNav.classList.contains("active")) {
        console.log("Tecla ESC pressionada, fechando menu");
        closeMenu();
      }
    });
  } else {
    console.error("Botão do menu ou nav não encontrados");
  }
});
