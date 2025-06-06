export function textBlurAnim() {
    document.addEventListener('DOMContentLoaded', function() {
        const blurElements = document.querySelectorAll('.text-blur-anim');
        
        blurElements.forEach(el => {
            // Добавляем эти стили для исправления артефактов на iOS
            el.style.willChange = 'filter'; // Готовим браузер к анимации
            el.style.backfaceVisibility = 'hidden'; // Фикс для Safari
            el.style.transform = 'translateZ(0)'; // Аппаратное ускорение
            el.style.filter = 'blur(15px)';
            el.style.transition = 'filter 0.8s ease';
            
            // Важно: родительский контейнер не должен иметь overflow: hidden
            if (getComputedStyle(el.parentElement).overflow === 'hidden') {
                console.warn('Parent element has overflow:hidden — this may cause blur artifacts on iOS!');
            }
        });
      
        function isElementTopAtCenter(el, offset = 0) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const screenCenter = windowHeight / 3 * 2;
            return rect.top <= screenCenter + offset && rect.bottom >= 0;
        }
      
        let lastScrollY = 0;
        
        function handleScroll() {
            const scrollDirection = window.scrollY > lastScrollY ? 'down' : 'up';
            lastScrollY = window.scrollY;
            
            blurElements.forEach(el => {
                const offset = parseInt(el.dataset.offset) || 0;
                if (isElementTopAtCenter(el, offset)) {
                    el.style.filter = 'blur(0)';
                }
            });
        }
      
        // Используем requestAnimationFrame + throttle
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true }); // Оптимизация для iOS
    });
}