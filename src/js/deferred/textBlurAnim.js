// data-delay-desktop
// data-delay-blur="1500"

export function textBlurAnim() {
    const blurElements = document.querySelectorAll('.text-blur-anim');

    // Функция для проверки ширины экрана
    const checkIsDesktop = () => window.innerWidth > 900;

    // Сначала всем элементам устанавливаем размытие
    blurElements.forEach(el => {
        el.style.willChange = 'filter';
        el.style.backfaceVisibility = 'hidden';
        el.style.transform = 'translateZ(0)';
        el.style.filter = 'blur(15px)';
        el.style.transition = 'filter 0.8s ease';
        
        if (getComputedStyle(el.parentElement).overflow === 'hidden') {
            console.warn('Parent element has overflow:hidden — this may cause blur artifacts on iOS!');
        }
    });

    // Функция для проверки видимости элемента
    function isElementVisible(el, offset = 0) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const screenCenter = windowHeight / 3 * 2;
        return rect.top <= screenCenter + offset && rect.bottom >= 0;
    }

    // Функция для анимации элемента
    function animateElement(el) {
        const isDesktop = checkIsDesktop();
        const offset = parseInt(el.dataset.offset) || 0;
        
        let delay = 0;
        
        // ТОЛЬКО если это десктоп и указан data-delay-desktop
        if (isDesktop && el.hasAttribute('data-delay-desktop')) {
            delay = parseInt(el.dataset.delayDesktop) || 0;
        } 
        // Иначе используем data-delay-blur (если есть)
        else if (el.hasAttribute('data-delay-blur')) {
            delay = parseInt(el.dataset.delayBlur) || 0;
        }
        
        setTimeout(() => {
            el.style.filter = 'blur(0)';
        }, delay);
    }

    // Функция для обработки появления элементов
    function handleElementVisibility() {
        blurElements.forEach(el => {
            const offset = parseInt(el.dataset.offset) || 0;
            if (isElementVisible(el, offset) && el.style.filter !== 'blur(0px)') {
                animateElement(el);
            }
        });
    }

    // Первичная обработка видимых элементов при загрузке
    function handleInitialVisibility() {
        blurElements.forEach(el => {
            const offset = parseInt(el.dataset.offset) || 0;
            if (isElementVisible(el, offset)) {
                animateElement(el);
            }
        });
    }

    // Запускаем проверку видимости при загрузке с небольшой задержкой
    setTimeout(handleInitialVisibility, 100);

    // Оптимизированный обработчик скролла
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleElementVisibility();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Обработчик ресайза с троттлингом
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleInitialVisibility();
            handleElementVisibility();
        }, 100);
    });
}