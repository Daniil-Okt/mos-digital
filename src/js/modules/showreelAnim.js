export function showreelAnim() {
    if (window.innerWidth > 1024) {
        webShowreelAnim()
    } else if (window.innerWidth < 551) {
        mobileShowreelAnim()
    }
  
}
function webShowreelAnim() {
    const showreelBlocks = document.querySelectorAll('.showreel');
  
    showreelBlocks.forEach(showreel => {
      const prevBlock = showreel.previousElementSibling;
      const video = showreel.querySelector('.showreel__video-body');
  
      if (!prevBlock || !video) return;
  
      // Инициализация стилей
      prevBlock.classList.add('sticky-before-showreel');
      prevBlock.style.top = '0';
      prevBlock.style.willChange = 'opacity, margin-bottom';
      prevBlock.style.opacity = '1';
  
      video.style.transform = 'scale(0.5)';
      video.style.transformOrigin = 'center top';
      video.style.willChange = 'transform';
  
      let ticking = false;
      let startPoint = 0;
      let endPoint = 0;
  
      const updatePositions = () => {
        const rect = prevBlock.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        const top = scrollY + rect.top;
        const height = rect.height;
  
        startPoint = top;
        endPoint = top + height / 2;
      };
  
      const animate = () => {
        const scrollY = window.scrollY || window.pageYOffset;
  
        let progress = 0;
        if (scrollY > startPoint) {
          progress = Math.min(1, (scrollY - startPoint) / (endPoint - startPoint));
        }
  
        const eased = easeOutQuad(progress);
  
        // scale (0.5 → 1)
        video.style.transform = `scale(${0.5 + 0.5 * eased})`;
  
        // opacity (1 → 0.5)
        prevBlock.style.opacity = `${1 - 1 * eased}`;
  
        // margin-bottom (0 → -200px)
        prevBlock.style.marginBottom = `${-200 * eased}px`;
      };
  
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            animate();
            ticking = false;
          });
          ticking = true;
        }
      };
  
      const handleResize = () => {
        updatePositions();
        animate();
      };
  
      function easeOutQuad(t) {
        return t * (2 - t);
      }
  
      // Первичная инициализация
      updatePositions();
      animate();
  
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);
    });

}

function mobileShowreelAnim() {
 
    const showreelBlocks = document.querySelectorAll('.showreel');
    let lastState = null;
  
    function checkStickyState() {
      showreelBlocks.forEach(showreel => {
        const prevBlock = showreel.previousElementSibling;
        if (!prevBlock) return;
        prevBlock.classList.add('sticky');
        const showreelRect = showreel.getBoundingClientRect();
        const isNearTop = showreelRect.top <= -10; // -10px от верха экрана
  
        if (isNearTop && !prevBlock.classList.contains('no-sticky')) {
          prevBlock.classList.remove('sticky');
          lastState = true;
        } else if (!isNearTop && prevBlock.classList.contains('no-sticky')) {
          prevBlock.classList.add('sticky');
          lastState = false;
        }
      });
    }
  
    // Оптимизированный обработчик скролла
    let ticking = false;
    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkStickyState();
          ticking = false;
        });
        ticking = true;
      }
    }
  
    // Инициализация
    checkStickyState();
    window.addEventListener('scroll', handleScroll, { passive: true });
  
    // Обработчик ресайза с проверкой ширины
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 550) {
          // На больших экранах удаляем класс и отключаем обработчики
          showreelBlocks.forEach(showreel => {
            const prevBlock = showreel.previousElementSibling;
            if (prevBlock) prevBlock.classList.remove('no-sticky');
          });
          window.removeEventListener('scroll', handleScroll);
        } else if (window.innerWidth <= 550 && !window._mobileStickyInitialized) {
          // Включаем для мобильных
          window._mobileStickyInitialized = true;
          checkStickyState();
          window.addEventListener('scroll', handleScroll, { passive: true });
        }
      }, 100);
    });
}

  