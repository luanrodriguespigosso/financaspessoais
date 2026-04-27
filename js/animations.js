// ============================================
// ANIMAÇÃO DE CONTADOR - Números que scrollam
// ============================================
function animateCounter(element) {
  const target = parseInt(element.textContent);
  let current = 0;
  const increment = target / 30;
  const step = 30;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, step);
}

// Inicia animação quando números ficam visíveis
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.classList.contains('pn')) {
      // Verifica se já foi animado
      if (!entry.target.dataset.animated) {
        animateCounter(entry.target);
        entry.target.dataset.animated = 'true';
        counterObserver.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.pn').forEach(el => counterObserver.observe(el));

// ============================================
// PARALLAX SUAVE - Background do hero
// ============================================
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const parallaxValue = scrollY * 0.4;
    hero.style.backgroundPosition = `0 ${parallaxValue}px`;
  }, { passive: true });
}

// ============================================
// SCROLL REVEAL - Reveal elementos ao scroll
// ============================================
function createScrollReveal() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Adiciona classe de reveal para elementos que têm animação
        entry.target.style.animationPlayState = 'running';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Aplica aos elementos com animação
  const animatedElements = document.querySelectorAll(
    '.pain-list li, .bc, .tcard, .clist li, .fi'
  );
  
  animatedElements.forEach(el => {
    // Pausa a animação inicialmente
    el.style.animationPlayState = 'paused';
    revealObserver.observe(el);
  });
}

createScrollReveal();

// ============================================
// HOVER SHINE - Efeito de brilho ao hover
// ============================================
document.querySelectorAll('.quote').forEach(quote => {
  quote.addEventListener('mouseenter', function() {
    const afterElement = this.querySelector('::after') || 
                        getComputedStyle(this, '::after');
    // A animação já está no CSS, então apenas garantimos que funciona
  });
});

// ============================================
// ANIMAÇÃO DE BONUS - Card bonus com slide
// ============================================
const bonusCard = document.querySelector('.bonus');
if (bonusCard) {
  const bonusObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideIn 0.8s ease-out forwards';
      }
    });
  }, { threshold: 0.3 });
  
  bonusObserver.observe(bonusCard);
}

// ============================================
// ANIMAÇÃO DO PBOX - Preço com scale
// ============================================
const priceBox = document.querySelector('.pbox');
if (priceBox) {
  const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'scaleIn 0.8s ease-out forwards';
      }
    });
  }, { threshold: 0.3 });
  
  priceObserver.observe(priceBox);
}

// ============================================
// ANIMAÇÃO DE ITEMS DA PLANILHA
// ============================================
const miItems = document.querySelectorAll('.mi');
miItems.forEach((item, index) => {
  item.style.opacity = '0';
  item.style.animation = `slideIn 0.5s ease-out ${index * 0.1}s forwards`;
});

// ============================================
// TRANSIÇÃO SUAVE AO CARREGAR
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Garante que elementos com classe "reveal" apareçam se já estão na viewport
  document.querySelectorAll('.pain-list li, .bc, .tcard, .clist li, .fi').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.style.animationPlayState = 'running';
    }
  });
});

// ============================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

console.log('🎬 Animações carregadas com sucesso!');
