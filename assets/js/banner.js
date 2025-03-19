// JavaScript para o banner rotativo
document.addEventListener("DOMContentLoaded", function () {
  // Elementos do DOM
  const slides = document.querySelectorAll(".banner__slide");
  const dots = document.querySelectorAll(".banner__nav-dot");
  const prevBtn = document.querySelector(".banner__arrow--prev");
  const nextBtn = document.querySelector(".banner__arrow--next");

  // Variáveis de controle
  let currentSlide = 0;
  let slideInterval;

  // Função para mostrar um slide específico
  function showSlide(index) {
    // Esconder todos os slides
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
      dots[i].classList.remove("active");
    }

    // Mostrar o slide atual
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  // Função para avançar para o próximo slide
  function nextSlide() {
    let next = currentSlide + 1;
    if (next >= slides.length) {
      next = 0;
    }
    showSlide(next);
  }

  // Função para voltar para o slide anterior
  function prevSlide() {
    let prev = currentSlide - 1;
    if (prev < 0) {
      prev = slides.length - 1;
    }
    showSlide(prev);
  }

  // Iniciar a rotação automática
  function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 5000);
  }

  // Parar a rotação automática
  function stopAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  }

  // Event listeners para os botões de navegação
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  }

  // Event listeners para os pontos de navegação
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function () {
      showSlide(i);
      stopAutoSlide();
      startAutoSlide();
    });
  }

  // Iniciar o carrossel
  startAutoSlide();
});
