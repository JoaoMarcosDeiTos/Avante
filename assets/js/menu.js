// JavaScript para o menu mobile
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.getElementById("main-nav");
  const menuLinks = document.querySelectorAll("#main-nav a");
  const contactBtn = document.querySelector(".contact-btn");

  if (menuBtn && mainNav) {
    // Adiciona o botão de contato dentro do menu no mobile
    function adjustMenuForMobile() {
      if (window.innerWidth <= 768) {
        if (!document.querySelector("#main-nav .mobile-contact-btn")) {
          const mobileContactBtn = contactBtn.cloneNode(true);
          mobileContactBtn.classList.add("mobile-contact-btn");
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
      }
    }

    // Toggle do menu móvel
    menuBtn.addEventListener("click", function () {
      mainNav.classList.toggle("active");
      menuBtn.classList.toggle("active");
    });

    // Scroll suave para as seções quando clicar nos links do menu
    menuLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        // Fechar o menu móvel antes de qualquer ação
        mainNav.classList.remove("active");
        menuBtn.classList.remove("active");

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
        // não faz nada, apenas deixa o navegador redirecionar
      });
    });

    // Ajustar o menu ao redimensionar
    window.addEventListener("resize", adjustMenuForMobile);

    // Inicializar ao carregar
    adjustMenuForMobile();
  }
});
