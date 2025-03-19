// JavaScript para a seção de serviços
document.addEventListener("DOMContentLoaded", function () {
  const servicosItens = document.querySelectorAll(".servicos__item");
  const closeButtons = document.querySelectorAll(".servicos__close");
  const grid = document.querySelector(".servicos__grid");
  let isAnimating = false; // Flag para evitar cliques múltiplos durante animações
  let scrollTimeout;

  // Função para expandir um item
  function expandirItem(item) {
    // Não fazer nada se já estiver animando
    if (isAnimating) return;
    isAnimating = true;

    // Verificar se já há um item expandido
    const itemExpandido = document.querySelector(".servicos__item.expandido");

    // Se houver e for diferente do atual, feche-o primeiro
    if (itemExpandido && itemExpandido !== item) {
      fecharItem(itemExpandido, false);

      // Pequeno atraso para garantir que a animação de fechamento comece antes da expansão
      setTimeout(() => {
        aplicarExpansao(item);
      }, 100);
    } else {
      aplicarExpansao(item);
    }
  }

  // Função que aplica a expansão após verificações
  function aplicarExpansao(item) {
    // Salvar a posição original do item antes de expandir
    const itemRect = item.getBoundingClientRect();
    const originalTop = itemRect.top + window.scrollY;

    // Expandir o item clicado
    item.classList.add("expandido");

    // Usar o FLIP (First Last Invert Play) para tornar a animação mais suave
    const newRect = item.getBoundingClientRect();
    const newTop = newRect.top + window.scrollY;

    // Permitir que outros cliques ocorram após a animação completar
    setTimeout(() => {
      isAnimating = false;

      // Se o item expandido ficar fora da visão, fazer scroll
      if (
        newTop < window.scrollY ||
        newTop > window.scrollY + window.innerHeight * 0.5
      ) {
        item.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 550); // Tempo um pouco mais longo que a duração da animação CSS (0.5s)
  }

  // Função para fechar um item
  function fecharItem(item, scrollAfter = true) {
    if (isAnimating && scrollAfter) return;
    if (scrollAfter) isAnimating = true;

    // Armazenar a posição atual para animação
    const itemRect = item.getBoundingClientRect();

    // Remover a classe expandido
    item.classList.remove("expandido");

    // Permitir cliques novamente após a animação
    if (scrollAfter) {
      setTimeout(() => {
        isAnimating = false;

        // Ajustar o scroll se necessário
        const newRect = item.getBoundingClientRect();
        if (newRect.top < 0 || newRect.bottom > window.innerHeight) {
          item.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 550);
    }
  }

  // Função para reorganizar o grid após expansão/contração
  function reorganizarGrid() {
    // Esta função permite que o grid se reorganize após mudanças nos itens
    // Forçando um pequeno recálculo do layout
    grid.style.display = "none";
    // Usar requestAnimationFrame para melhor performance visual
    requestAnimationFrame(() => {
      grid.style.display = "grid";
    });
  }

  // Adicionar evento de clique a cada item
  servicosItens.forEach(function (item) {
    item.addEventListener("click", function (event) {
      // Se o clique for no botão de fechar, não expandir
      if (
        event.target.classList.contains("servicos__close") ||
        event.target.closest(".servicos__close")
      ) {
        event.stopPropagation();
        fecharItem(item);
        return;
      }

      // Se o item já está expandido, não fazer nada
      if (item.classList.contains("expandido")) {
        return;
      }

      expandirItem(item);
    });
  });

  // Adicionar evento de clique nos botões de fechar
  closeButtons.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.stopPropagation(); // Impedir propagação para o item pai
      const item = btn.closest(".servicos__item");
      if (item) {
        fecharItem(item);
      }
    });
  });

  // Adicionar evento de tecla ESC para fechar
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      const itemAberto = document.querySelector(".servicos__item.expandido");
      if (itemAberto && !isAnimating) {
        fecharItem(itemAberto);
      }
    }
  });

  // Adicionar evento de redimensionamento para ajustar o layout
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const itemExpandido = document.querySelector(".servicos__item.expandido");
      if (itemExpandido) {
        // Animar o scroll para o item ao redimensionar
        itemExpandido.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 250); // Throttle para evitar múltiplas chamadas durante redimensionamento
  });
});

// JavaScript para a seção de serviços e modal
document.addEventListener("DOMContentLoaded", function () {
  // Elementos do DOM
  const servicosItens = document.querySelectorAll(".servicos__item");
  const modal = document.getElementById("servicosModal");
  const modalClose = document.getElementById("modalClose");
  const modalImagem = document.getElementById("modalImagem");
  const modalTitulo = document.getElementById("modalTitulo");
  const modalSubtitulo = document.getElementById("modalSubtitulo");
  const modalConteudo = document.getElementById("modalConteudo");
  const modalPrev = document.getElementById("modalPrev");
  const modalNext = document.getElementById("modalNext");

  // Variáveis de controle
  let servicoAtual = 0;
  const totalServicos = servicosItens.length;

  // Dados detalhados de cada serviço
  const servicosData = [
    {
      titulo: "Captação de Editais",
      subtitulo: "Encontramos as melhores oportunidades para seu negócio",
      conteudo: `
        <p class="servicos-modal__texto">A captação de editais é frequentemente negligenciada pelas empresas que desejam trabalhar com o mercado público, por acreditarem que é algo simples de ser realizado. No entanto, sem experiência, é comum enfrentar diversos problemas:</p>
        <ul class="servicos-modal__lista">
          <li>Perda de oportunidades por não identificar editais compatíveis com seu negócio</li>
          <li>Desconhecimento dos portais onde são publicados os editais</li>
          <li>Dificuldade de interpretação dos termos técnicos</li>
          <li>Falhas no monitoramento de novos editais</li>
        </ul>
        <p class="servicos-modal__texto">Nossa equipe realiza diariamente a captação e análise de centenas de editais publicados em todo o Brasil, identificando as melhores oportunidades para nossos clientes, de acordo com seu segmento de atuação.</p>
      `,
    },
    {
      titulo: "Análise Técnica dos Editais",
      subtitulo: "Avaliação detalhada para garantir competitividade",
      conteudo: `
        <p class="servicos-modal__texto">A análise técnica de editais é fundamental para empresas que desejam participar de licitações públicas. Nosso serviço de análise oferece:</p>
        <ul class="servicos-modal__lista">
          <li>Verificação minuciosa de cada cláusula do edital</li>
          <li>Identificação de exigências desproporcionais ou restritivas</li>
          <li>Avaliação de conformidade com a legislação vigente</li>
          <li>Identificação de oportunidades para impugnação ou pedidos de esclarecimento</li>
          <li>Orientação sobre a viabilidade de participação</li>
        </ul>
        <p class="servicos-modal__texto">Com nossa análise, seu negócio estará protegido de possíveis armadilhas jurídicas e terá maior chance de sucesso nas licitações, evitando participar de processos licitatórios que possam gerar prejuízos.</p>
      `,
    },
    {
      titulo: "Gestão Documental",
      subtitulo: "Organização e controle de toda documentação necessária",
      conteudo: `
        <p class="servicos-modal__texto">A gestão documental é um dos pilares mais importantes para empresas que participam de licitações. Nossa equipe oferece:</p>
        <ul class="servicos-modal__lista">
          <li>Organização e digitalização de documentos</li>
          <li>Controle de vencimento de certidões e documentos</li>
          <li>Emissão de documentos eletrônicos necessários</li>
          <li>Criação de checklist personalizado conforme o tipo de licitação</li>
          <li>Armazenamento seguro em nuvem para acesso rápido</li>
        </ul>
        <p class="servicos-modal__texto">Com nosso serviço de gestão documental, sua empresa estará sempre pronta para participar de qualquer licitação, sem o risco de desclassificação por problemas com documentação.</p>
      `,
    },
    {
      titulo: "Montagem de Documentação",
      subtitulo: "Preparação completa dos documentos para cada licitação",
      conteudo: `
        <p class="servicos-modal__texto">A montagem correta da documentação é crucial para o sucesso em licitações. Nossa equipe especializada:</p>
        <ul class="servicos-modal__lista">
          <li>Prepara minuciosamente cada envelope conforme exigências do edital</li>
          <li>Organiza os documentos na ordem exata solicitada</li>
          <li>Confere cada documento para garantir que atende às exigências</li>
          <li>Elabora propostas de preços competitivas e estratégicas</li>
          <li>Verifica inconsistências ou falhas que poderiam causar desclassificação</li>
        </ul>
        <p class="servicos-modal__texto">Com nossa assistência, sua empresa evita o risco de desclassificação por erros na documentação e aumenta significativamente suas chances de vitória nos processos licitatórios.</p>
      `,
    },
    {
      titulo: "Representação Presencial",
      subtitulo: "Profissionais experientes representando sua empresa",
      conteudo: `
        <p class="servicos-modal__texto">A representação presencial em certames licitatórios é fundamental para defender os interesses da sua empresa. Nossos representantes:</p>
        <ul class="servicos-modal__lista">
          <li>Possuem ampla experiência em processos licitatórios</li>
          <li>Analisam criticamente a documentação dos concorrentes</li>
          <li>Identificam falhas e apresentam recursos quando necessário</li>
          <li>Negociam ativamente nos pregões para obter melhores preços</li>
          <li>Defendem os interesses da sua empresa com conhecimento técnico e jurídico</li>
        </ul>
        <p class="servicos-modal__texto">Com nossa representação presencial, sua empresa terá uma postura ativa durante todo o processo licitatório, garantindo que seus direitos sejam respeitados e maximizando suas chances de sucesso.</p>
      `,
    },
    {
      titulo: "Cadastramento em Portais e Órgãos",
      subtitulo: "Registro completo em todas as plataformas necessárias",
      conteudo: `
        <p class="servicos-modal__texto">O cadastramento correto nos diversos portais e órgãos públicos é o primeiro passo para atuar no mercado de licitações. Nosso serviço inclui:</p>
        <ul class="servicos-modal__lista">
          <li>Cadastro no SICAF (Sistema de Cadastramento Unificado de Fornecedores)</li>
          <li>Registro em plataformas estaduais e municipais de compras</li>
          <li>Cadastro em portais específicos como ComprasNet, Licitações-e, BEC/SP</li>
          <li>Obtenção de certificados digitais necessários</li>
          <li>Monitoramento constante da situação cadastral da empresa</li>
        </ul>
        <p class="servicos-modal__texto">Com nosso suporte, sua empresa estará devidamente registrada em todos os sistemas necessários, evitando impedimentos técnicos para participação em licitações importantes.</p>
      `,
    },
    {
      titulo: "Pregões Eletrônicos",
      subtitulo: "Participação estratégica em licitações online",
      conteudo: `
        <p class="servicos-modal__texto">Os pregões eletrônicos requerem estratégia e conhecimento técnico específico. Nossa equipe oferece:</p>
        <ul class="servicos-modal__lista">
          <li>Análise prévia do edital e da concorrência</li>
          <li>Elaboração de estratégia de lances personalizada</li>
          <li>Participação ativa durante toda a sessão pública</li>
          <li>Negociação direta com o pregoeiro para obtenção de melhores preços</li>
          <li>Interposição imediata de recursos quando necessário</li>
          <li>Acompanhamento até a homologação final</li>
        </ul>
        <p class="servicos-modal__texto">Com nossa participação nos pregões eletrônicos, sua empresa terá mais chances de sucesso, contando com profissionais experientes que conhecem todas as nuances desse tipo de licitação.</p>
      `,
    },
    {
      titulo: "Jurídico Especializado",
      subtitulo: "Suporte legal completo em todas as etapas",
      conteudo: `
        <p class="servicos-modal__texto">O suporte jurídico especializado é essencial no mercado de licitações. Nossa equipe jurídica oferece:</p>
        <ul class="servicos-modal__lista">
          <li>Análise jurídica detalhada de editais</li>
          <li>Elaboração de impugnações e recursos administrativos</li>
          <li>Representação em processos administrativos</li>
          <li>Consultoria na elaboração de contratos e aditivos</li>
          <li>Defesa em processos de penalização</li>
          <li>Acompanhamento jurídico durante toda a execução contratual</li>
        </ul>
        <p class="servicos-modal__texto">Com nosso suporte jurídico, sua empresa estará amparada legalmente em todas as etapas do processo licitatório, desde a análise do edital até a conclusão do contrato.</p>
      `,
    },
  ];

  // Funções
  function abrirModal(index) {
    servicoAtual = index;
    const servicoData = servicosData[index];
    const servicoItem = servicosItens[index];

    // Atualizar dados do modal
    modalImagem.src = servicoItem.querySelector(".servicos__imagem").src;
    modalImagem.alt = servicoItem.querySelector(".servicos__imagem").alt;
    modalTitulo.textContent = servicoData.titulo;
    modalSubtitulo.textContent = servicoData.subtitulo;
    modalConteudo.innerHTML = servicoData.conteudo;

    // Exibir modal
    modal.classList.add("ativo");
    document.body.style.overflow = "hidden"; // Impedir scroll da página

    // Atualizar botões de navegação
    atualizarBotoesNavegacao();
  }

  function fecharModal() {
    modal.classList.remove("ativo");
    document.body.style.overflow = ""; // Restaurar scroll da página
  }

  function navegarParaAnterior() {
    if (servicoAtual > 0) {
      abrirModal(servicoAtual - 1);
    }
  }

  function navegarParaProximo() {
    if (servicoAtual < totalServicos - 1) {
      abrirModal(servicoAtual + 1);
    }
  }

  function atualizarBotoesNavegacao() {
    modalPrev.disabled = servicoAtual === 0;
    modalNext.disabled = servicoAtual === totalServicos - 1;
  }

  // Event Listeners
  servicosItens.forEach((item, index) => {
    item.addEventListener("click", () => {
      abrirModal(index);
    });
  });

  modalClose.addEventListener("click", fecharModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      fecharModal();
    }
  });

  modalPrev.addEventListener("click", navegarParaAnterior);
  modalNext.addEventListener("click", navegarParaProximo);

  // Navegação por teclado
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("ativo")) return;

    if (e.key === "Escape") {
      fecharModal();
    } else if (e.key === "ArrowLeft" && !modalPrev.disabled) {
      navegarParaAnterior();
    } else if (e.key === "ArrowRight" && !modalNext.disabled) {
      navegarParaProximo();
    }
  });
});
