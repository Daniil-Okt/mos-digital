


export function animateTitleWords(userSettings = {}) {
    // Настройки по умолчанию
    const defaults = {
        wordDelay: 0.1,      // Задержка между словами
        duration: 0.7,       // Длительность анимации
        yOffset: 20,         // Начальное смещение
        startBlur: 8,        // Начальное размытие
        triggerPoint: 'top 80%', // Когда запускать анимацию
        triggerDelay: 0,    // Задержка перед анимацией связанных элементов
        textAnimDuration: 0.6, // Длительность анимации для data-text-anim
        textAnimEase: 'power2.out', // easing для анимации data-text-anim
		wordTag: 'span'
    };

    const settings = { ...defaults, ...userSettings };

    // Ждем полной загрузки страницы
    window.addEventListener('load', function() {
        const textElements = document.querySelectorAll('.text-word-anim');
        
        // Проверяем, есть ли элементы для анимации
        if (!textElements.length) {
            console.warn('No elements with class "text-word-anim" found');
            return;
        }

        textElements.forEach(element => {
            // Инициализируем SplitText ТОЛЬКО для слов
            const split = new SplitText(element, {
                type: 'words',
                wordsClass: 'word-anim',
				tag: settings.wordTag
            });

            const words = split.words;
            const triggerId = element.dataset.textTrigger;

            // Устанавливаем начальное состояние для основного текста
            gsap.set(words, {
                opacity: 0,
                y: settings.yOffset,
                filter: `blur(${settings.startBlur}px)`,
                display: 'inline-block',
                willChange: 'transform, opacity, filter'
            });

            // Устанавливаем начальное состояние для связанных элементов (data-text-anim)
            if (triggerId) {
                const targetElements = document.querySelectorAll(`[data-text-anim="${triggerId}"]`);
                gsap.set(targetElements, {
                    opacity: 0,
                    y: 10,
					filter: `blur(${settings.startBlur}px)`,
                    willChange: 'transform, opacity'
                });
            }

            // Создаем анимацию для ScrollTrigger
            ScrollTrigger.create({
                trigger: element,
                start: settings.triggerPoint,
                onEnter: () => {
                    // Анимация каждого слова с задержкой
                    const animation = gsap.to(words, {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: settings.duration,
                        stagger: settings.wordDelay,
                        ease: 'power2.out',
                        onComplete: function() {
                            // Если есть data-text-trigger, анимируем соответствующие data-text-anim
                            if (triggerId) {
                                const targetElements = document.querySelectorAll(`[data-text-anim="${triggerId}"]`);
                                gsap.to(targetElements, {
                                    opacity: 1,
                                    y: 0,
									filter: 'blur(0px)',
                                    duration: settings.textAnimDuration,
                                    ease: settings.textAnimEase,
                                    delay: settings.triggerDelay,
                                    stagger: settings.wordDelay * 0.5 // Небольшой stagger для множественных элементов
                                });
                            }
                        }
                    });
                },
                once: true // Анимация сработает только один раз
            });
        });

        // Важно обновить ScrollTrigger после создания всех анимаций
        ScrollTrigger.refresh();
    });
}


