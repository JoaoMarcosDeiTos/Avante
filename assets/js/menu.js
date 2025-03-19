// JavaScript para o menu mobile
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.getElementById("main-nav");
  const menuLinks = document.querySelectorAll("#main-nav a");
  const contactBtn = document.querySelector(".contact-btn");
  let menuOverlay;

  // Criar overlay para o menu
  function createOverlay() {
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

    // Inserir o overlay antes do nav no DOM para controlar melhor o z-index
    document.body.insertBefore(menuOverlay, document.body.firstChild);

    // Adicionar evento para fechar o menu ao clicar no overlay
    menuOverlay.addEventListener("click", closeMenu);
  }

  // Função para abrir o menu
  function openMenu() {
    mainNav.classList.add("active");
    menuBtn.classList.add("active");
    menuOverlay.style.opacity = "1";
    menuOverlay.style.visibility = "visible";
    document.body.style.overflow = "hidden"; // Impedir rolagem da página quando menu aberto
  }

  // Função para fechar o menu
  function closeMenu() {
    mainNav.classList.remove("active");
    menuBtn.classList.remove("active");
    menuOverlay.style.opacity = "0";
    menuOverlay.style.visibility = "hidden";
    document.body.style.overflow = ""; // Restaurar rolagem da página
  }

  // Adiciona o botão de contato dentro do menu no mobile
  function adjustMenuForMobile() {
    if (window.innerWidth <= 768) {
      if (!document.querySelector("#main-nav .mobile-contact-btn")) {
        const mobileContactBtn = contactBtn.cloneNode(true);
        mobileContactBtn.classList.add("mobile-contact-btn");
        // Garantir que o botão de contato mobile também redirecione para contato.html
        mobileContactBtn.onclick = function () {
          window.location.href = "contato.html";
        };
        mainNav.appendChild(mobileContactBtn);
      }
      contactBtn.style.display = "none";
    } else {
      const mobileContactBtn = document.querySelector(
        "#main-nav .mobile-contact-btn"
      );
      if (mobileContactBtn) {
        mobileContactBtn.remove();
      }
      contactBtn.style.display = "block";

      // Garantir que o menu esteja fechado ao redimensionar para desktop
      closeMenu();
    }
  }

  // Toggle do menu móvel
  if (menuBtn && mainNav) {
    // Criar overlay
    createOverlay();

    menuBtn.addEventListener("click", function () {
      if (mainNav.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Scroll suave para as seções quando clicar nos links do menu
    menuLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        // Fechar o menu móvel antes de qualquer ação
        closeMenu();

        // Se for um link de âncora (começa com #), previne o comportamento padrão e faz scroll suave
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetSection = document.querySelector(href);

          if (targetSection) {
            // Para o link "Início" (#), scroll para o topo
            if (href === "#" && this.textContent === "Início") {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              return;
            }

            // Scroll suave para a seção com mais suavidade
            const headerOffset = 80; // Offset para compensar o header
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }
        // Para links normais (como sobre.html), deixa o comportamento padrão acontecer
      });
    });

    // Adicionar evento para tecla Escape para fechar o menu
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mainNav.classList.contains("active")) {
        closeMenu();
      }
    });

    // Ajustar o menu ao redimensionar
    window.addEventListener("resize", adjustMenuForMobile);

    // Inicializar ao carregar
    adjustMenuForMobile();
  }
});
