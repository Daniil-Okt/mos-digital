// =============================================================
/*
textWordAnim({
    wordDelay: 0.15,
    animationSpeed: 0.9,
    startOffset: 20,
    startBlur: 6,
    triggerPoint: 0.75 // Активация при достижении 25% снизу
});


data-delay-desktop - задержка на десктопах
data-delay-blur - задержка на мобильных
data-offset - смещение точки активации

<div class="text-word-anim" 
     data-delay-desktop="0.5" 
     data-delay-blur="0.2"
     data-offset="50">
     Текст с индивидуальными задержками
</div>
*/
// ==============================================================

export function textWordAnim(userSettings = {}) {
    // Настройки по умолчанию
    const defaults = {
        wordDelay: 0.1,     // Задержка между словами (секунды)
        animationSpeed: 0.7, // Длительность анимации (секунды)
        startOffset: 15,     // Начальное смещение Y (пиксели)
        startBlur: 8,        // Начальное размытие (пиксели)
        triggerPoint: 0.66   // Точка активации (1/3 снизу = 0.66)
    };

    // Объединяем пользовательские настройки с дефолтными
    const settings = {...defaults, ...userSettings};

    document.addEventListener('DOMContentLoaded', function() {
        const animElements = document.querySelectorAll('.text-word-anim');

        // Функция проверки устройства (как в textBlurAnim)
        const checkIsDesktop = () => window.innerWidth > 900;

        animElements.forEach(element => {
            // Сохраняем HTML и получаем задержки
            const originalHTML = element.innerHTML;
            const delayDesktop = element.dataset.delayDesktop ? parseFloat(element.dataset.delayDesktop) : 0;
            const delayMobile = element.dataset.delayBlur ? parseFloat(element.dataset.delayBlur) : 0;
            
            element.innerHTML = '';
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = originalHTML;
            
            processNode(element, tempDiv, 0);
            
            function processNode(parent, node, wordIndex) {
                const childNodes = Array.from(node.childNodes);
                
                childNodes.forEach(child => {
                    if (child.nodeType === Node.TEXT_NODE) {
                        const text = child.textContent;
                        const wordRegex = /(\S+|\s+)/g;
                        let match;
                        
                        while ((match = wordRegex.exec(text)) !== null) {
                            const [word] = match;
                            
                            if (word.trim() === '') {
                                parent.appendChild(document.createTextNode(word));
                            } else {
                                const wordSpan = document.createElement('span');
                                wordSpan.className = 'word-anim';
                                wordSpan.style.display = 'inline-block';
                                wordSpan.style.willChange = 'opacity, transform, filter';
                                wordSpan.style.backfaceVisibility = 'hidden';
                                wordSpan.style.transform = `translateZ(0) translateY(${settings.startOffset}px)`;
                                wordSpan.style.opacity = '0';
                                wordSpan.style.filter = `blur(${settings.startBlur}px)`;
                                
                                // Определяем задержку в зависимости от устройства
                                const baseDelay = checkIsDesktop() ? delayDesktop : delayMobile;
                                const wordDelay = wordIndex * settings.wordDelay;
                                const totalDelay = baseDelay + wordDelay;
                                
                                wordSpan.style.transition = `
                                    opacity ${settings.animationSpeed}s ease ${totalDelay}s,
                                    transform ${settings.animationSpeed}s ease ${totalDelay}s,
                                    filter ${settings.animationSpeed}s ease ${totalDelay}s
                                `;
                                
                                wordSpan.textContent = word;
                                parent.appendChild(wordSpan);
                                wordIndex++;
                            }
                        }
                    } else if (child.nodeType === Node.ELEMENT_NODE) {
                        const newElement = child.cloneNode(false);
                        parent.appendChild(newElement);
                        wordIndex = processNode(newElement, child, wordIndex);
                    }
                });
                return wordIndex;
            }
            
            // Предупреждение об overflow (как в textBlurAnim)
            if (getComputedStyle(element.parentElement).overflow === 'hidden') {
                console.warn('Parent element has overflow:hidden — may cause issues on iOS!');
            }
        });

        // Функция проверки видимости с настраиваемой точкой активации
        function isElementVisible(el, offset = 0) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const triggerPosition = windowHeight * settings.triggerPoint;
            return rect.top <= triggerPosition + offset && rect.bottom >= 0;
        }

        // Обработчик скролла с оптимизацией
        function handleScroll() {
            animElements.forEach(el => {
                const offset = parseInt(el.dataset.offset) || 0;
                if (isElementVisible(el, offset)) {
                    const words = el.querySelectorAll('.word-anim');
                    words.forEach(word => {
                        word.style.opacity = '1';
                        word.style.transform = 'translateZ(0) translateY(0)';
                        word.style.filter = 'blur(0)';
                    });
                }
            });
        }

        // Инициализация
        setTimeout(handleScroll, 100);
        
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Обработчик ресайза
        window.addEventListener('resize', () => {
            handleScroll();
        });
    });
}
