document.addEventListener("DOMContentLoaded", function () {
  // Configuração do carrossel de clientes
  const carrossel = document.querySelector(".clientes__carrossel");
  const itens = document.querySelectorAll(".clientes__item");

  if (!carrossel || itens.length === 0) return;

  // Duplicar itens para criar efeito infinito
  const clonarItens = () => {
    // Clone todos os itens originais
    itens.forEach((item) => {
      const clone = item.cloneNode(true);
      carrossel.appendChild(clone);
    });

    // Ajustar a animação com base no número de itens
    atualizarAnimacao();
  };

  // Atualizar a duração e a distância da animação
  const atualizarAnimacao = () => {
    // Calcula a largura total dos itens originais (antes da duplicação)
    let larguraTotal = 0;
    itens.forEach((item) => {
      const style = window.getComputedStyle(item);
      const marginLeft = parseFloat(style.marginLeft);
      const marginRight = parseFloat(style.marginRight);
      larguraTotal += item.offsetWidth + marginLeft + marginRight;
    });

    // Define a regra de animação CSS
    document.documentElement.style.setProperty(
      "--translate-width",
      `-${larguraTotal}px`
    );

    // Atualiza a animação com base na largura
    const velocidadeBase = 15; // segundos (reduzido de 30 para 15 para aumentar a velocidade)
    const novaVelocidade = (larguraTotal / 200) * velocidadeBase;

    // Remove animação existente
    carrossel.style.animation = "none";

    // Força um reflow
    void carrossel.offsetWidth;

    // Aplica a nova animação
    carrossel.style.animation = `scrollX ${novaVelocidade}s linear infinite`;

    // Adicionar interações de velocidade
    carrossel.addEventListener("mouseenter", () => {
      // Desacelerar ao invés de pausar completamente
      carrossel.style.animationPlayState = "running";
      carrossel.style.animationDuration = `${novaVelocidade * 3}s`; // Triplica o tempo de animação (torna 3x mais lento)
    });

    carrossel.addEventListener("mouseleave", () => {
      // Volta à velocidade normal
      carrossel.style.animationPlayState = "running";
      carrossel.style.animationDuration = `${novaVelocidade}s`;
    });

    // Para dispositivos touch
    carrossel.addEventListener("touchstart", () => {
      // Desacelerar ao invés de pausar completamente
      carrossel.style.animationPlayState = "running";
      carrossel.style.animationDuration = `${novaVelocidade * 3}s`; // Triplica o tempo de animação
    });

    carrossel.addEventListener("touchend", () => {
      // Volta à velocidade normal
      carrossel.style.animationPlayState = "running";
      carrossel.style.animationDuration = `${novaVelocidade}s`;
    });
  };

  // Inicializar o carrossel
  clonarItens();

  // Recalcular em caso de redimensionamento da janela
  window.addEventListener("resize", atualizarAnimacao);

  // Adiciona CSS personalizado para a animação
  const style = document.createElement("style");
  style.textContent = `
    @keyframes scrollX {
      0% { transform: translateX(0); }
      100% { transform: translateX(var(--translate-width, -50%)); }
    }
  `;
  document.head.appendChild(style);
});
