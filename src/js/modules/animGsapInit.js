import { gsap } from "gsap";
// import { Physics2DPlugin } from "gsap/Physics2DPlugin"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from "gsap/CustomEase";



// Регистрируем плагины
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
// ScrollTrigger.normalizeScroll(true);
ScrollTrigger.config({
    ignoreMobileResize: true
});


export function animGsapInit() {
    const screenHeight = window.innerHeight;

    function prcSH(prc) {
        const prcEnter = screenHeight * prc + 'px';

        return prcEnter;
    }




    //анимация шоурила
    function showreelAnimation() {
        const showreel = document.querySelector('.showreel__video-body');
        const about = document.querySelector('.about');
        const aboutContainer = document.querySelector('.about__container');
    
        if (!showreel || !about) return;
    
        const aboutHeight = about.offsetHeight;
        const isDesktop = window.innerWidth > 1150;
    
        // Оптимизация: hardware acceleration
        [showreel, about, aboutContainer].forEach(el => {
            if (el) el.style.willChange = 'transform, opacity';
        });
    
        // Начальное состояние
        if (isDesktop) {
            gsap.set(showreel, {
                scale: 0.82 
            });
        }
    
        const tlShow = gsap.timeline({
            scrollTrigger: {
                trigger: about,
                start: isDesktop ? "top top" : `${prcSH(0.15)} top`,
                end: isDesktop ? "75% top" : `${prcSH(0.75)} top`,
                scrub: isDesktop ? true : 0.3,
                markers: false,
                fastScrollEnd: true,
            }
        });
    
        // Общая часть
        tlShow.to(about, { 
            opacity: 0,
            y: aboutHeight / 4 + 'px', 
            ease: 'none'
        })
        .to(showreel, {
            scale: 1,
            ease: 'none'
        }, 0);
    
        // Только для десктопа
        if (isDesktop) {
            tlShow.to(aboutContainer, {
                scale: 0.8,
                ease: 'none'
            }, 0);
        }
    }
    window.addEventListener('load', showreelAnimation) 




    //анимация страницы кейса
    function caseAnimation() {
        const descCase = document.querySelector('.desc-case');
        const aboutCase = document.querySelector('.about-case');
        const aboutCaseContent = document.querySelector('.about-case__body');

        if (!descCase || !aboutCase) return;

        const aboutCaseHeight = aboutCase.offsetHeight;

        const tlShow = gsap.timeline({
            scrollTrigger: {
                trigger: aboutCase,
                start: "top top", // Когда низ триггера (footer) пересекает низ вьюпорта
                end: "75% top", // Когда верх триггера пересекает низ вьюпорта
                scrub: true, // Плавное следование за скроллом (можно изменить на true для дискретной анимации)
                markers: false, // Включите для отладки
            }
        });

        // Создаем анимацию
        if (window.innerWidth > 1150) {
            
            
            tlShow.to(aboutCase, { 
                opacity: 0,
                y: aboutCaseHeight / 4 + 'px',
                ease: 'none'
            })
            .to(aboutCaseContent, {
                scale: 0.8,
                ease: 'none'
            }, 0)
        } else {
            tlShow.to(aboutCase, { 
                opacity: 0,
                y: aboutCaseHeight / 4 + 'px',
                ease: 'none'
            })
        }




    }
    window.addEventListener('load', caseAnimation) 




    //анимация формы
    function connectAnimation() {
        if (window.innerWidth > 1024) {
            const connectContents = document.querySelectorAll('.connect__content');
            
            if (!connectContents.length) return;
        
            connectContents.forEach(connectContent => {
                const connectImg = connectContent.querySelector('.connect__human-img');
                if (!connectImg) return;
            
                // Устанавливаем начальный масштаб
                gsap.set(connectImg, { 
                    scale: 1.15
                });
            
                // Создаем анимацию для каждого блока
                const tlConnect = gsap.timeline({
                    scrollTrigger: {
                        trigger: connectContent,
                        start: "top 100%",  // Когда верх блока появляется у нижней границы окна
                        end: "120% 100%",    // Когда низ блока достигает верха окна
                        scrub: true,          // Плавная привязка к скроллу
                        markers: false,       // Отключить маркеры в продакшене
                        invalidateOnRefresh: true // Важно для респонсив верстки
                    }
                });
            
                tlConnect.to(connectImg, {
                    scale: 1,
                    ease: 'none'
                });
            });
        }
    }
    window.addEventListener('load', connectAnimation) 




    //анимация item цен, item цифр
    function animateServiceItems() {
            const serviceItems = document.querySelectorAll('.service-pr__item, .desc-case__key-item');
            
            if (!serviceItems.length) {
                return;
            }

            // Устанавливаем начальное состояние
            gsap.set(serviceItems, {
                x: '25%',
                opacity: 0,
                willChange: 'transform, opacity'
            });
            
            // Создаем анимацию для каждого элемента
            serviceItems.forEach((item, index) => {
                gsap.to(item, {
                    x: '0%',
                    opacity: 1,
                    duration: 1.2,
                    // ease: CustomEase.create("custom", "M0,0 C0.306,0.292 0.278,0.212 0.33,0.371 0.372,0.502 0.371,1 1,1 "),
                    ease: CustomEase.create("custom", "M0,0 C0,0 0.319,0.047 0.409,0.138 0.532,0.261 0.596,0.81 0.673,0.893 0.774,1.003 1,1 1,1 "),
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%', // Начинаем анимацию когда элемент на 80% от верха вьюпорта
                        toggleActions: 'play none none none', // Анимация только при появлении
                        once: true // Анимация сработает только один раз
                    },
                    // delay: index * 0.1 // Небольшая задержка между элементами
                });
            });

            // Обновляем ScrollTrigger после создания всех анимаций
            ScrollTrigger.refresh();
    }
    window.addEventListener('load', animateServiceItems) 




    //анимация вопросов
    function animateQuestItem() {
        const serviceItems = document.querySelectorAll('.item-quest');
        
        if (!serviceItems.length) {
            return;
        }

        // Устанавливаем начальное состояние
        gsap.set(serviceItems, {
            y: '100px',
            opacity: 0,
            willChange: 'transform, opacity'
        });
        
        // Создаем анимацию для каждого элемента
        serviceItems.forEach((item, index) => {
                gsap.to(item, {
                    y: '0%',
                    opacity: 1,
                    duration: 1,
                    // ease: CustomEase.create("custom", "M0,0 C0.306,0.292 0.278,0.212 0.33,0.371 0.372,0.502 0.371,1 1,1 "),
                    ease: CustomEase.create("custom", "M0,0 C0,0 0.319,0.047 0.409,0.138 0.532,0.261 0.596,0.81 0.673,0.893 0.774,1.003 1,1 1,1 "),
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%', // Начинаем анимацию когда элемент на 80% от верха вьюпорта
                        toggleActions: 'play none none none', // Анимация только при появлении
                        once: true // Анимация сработает только один раз
                    },
                    // delay: index * 0.1 // Небольшая задержка между элементами
                });
        });

        // Обновляем ScrollTrigger после создания всех анимаций
        ScrollTrigger.refresh();
    }
    window.addEventListener('load', () => {
        setTimeout(() => {
            animateQuestItem()
        }, 500);
    } ) 




    //анимация футера
    function footerAnimation() {
        // const footer = document.querySelector('.footer');
        const footerContent = document.querySelector('.footer__content');
        const accent = document.querySelector('.footer__accent');

        const accentBox = document.querySelector('.footer__accent-box');

        const accentBody = document.querySelector('.footer__accent-body');

        if (!accent || !accentBox || !accentBody) return;

        const accentBoxHeight = accent.offsetHeight;

        // Создаем анимацию
        const tlFoot = gsap.timeline({
            scrollTrigger: {
                trigger: footerContent,
                start: "bottom 100%", // Когда низ триггера (footer) пересекает низ вьюпорта
                end: `bottom+=${accentBoxHeight}px 100%`, // Когда верх триггера пересекает низ вьюпорта
                scrub: true, // Плавное следование за скроллом (можно изменить на true для дискретной анимации)
                markers: false, // Включите для отладки
            }
        });

        tlFoot.to(accentBox, { 
            height: accentBoxHeight + 'px',
            ease: 'none'
        })
        .to(accentBody, {
            bottom: '0px',
            ease: 'none'
        }, 0);

        ScrollTrigger.refresh();
    }
    window.addEventListener('load', () => {
        setTimeout(() => {
            footerAnimation()
        }, 500);
    } )




    //анимация карточек в моб версии
    function animateStageItem() {
        if (window.innerWidth < 651) {
            const stagesItems = document.querySelectorAll('.stages__slide');
            
            if (!stagesItems.length) {
                return;
            }

            // Устанавливаем начальное состояние
            gsap.set(stagesItems, {
                // y: '100px',
                // opacity: 0,
                willChange: 'transform, opacity'
            });


            // Создаем анимацию для каждого элемента
            stagesItems.forEach((item, index) => {
                    

                    if (index < stagesItems.length - 1) {
                        let heightItem = item.offsetHeight;
                        console.log(heightItem)
                        gsap.to(item, {
                            scale: '0.7',
                            opacity: 0,
                            // y: '-0%',
                            

                            scrollTrigger: {
                                trigger: stagesItems[index + 1],
                                start: `top top+=${heightItem + 140}px`,  // Когда верх блока появляется у нижней границы окна
                                end: "top 130px", 
                                scrub: true,          // Плавная привязка к скроллу
                                markers: false,       // Отключить маркеры в продакшене
                                invalidateOnRefresh: true,
                            },
                        });
                    }
            });

            // Обновляем ScrollTrigger после создания всех анимаций
            ScrollTrigger.refresh();
        }
    }
    window.addEventListener('load', animateStageItem) 




    // Анимация градиента этапов
    function animateStageFon() {
        if (window.innerWidth > 650) {
            const fonBody = document.querySelector('.stages__fon-body');
            const arranged  = document.querySelector('.arranged');
            if (!fonBody) {
                return;
            }

            // Устанавливаем начальное состояние
            gsap.set(fonBody, {
                // y: '100px',
                // opacity: 0,
                willChange: 'transform, opacity'
            });


            // Создаем анимацию для каждого элемента
            let heightItem = fonBody.offsetHeight;

            gsap.to(fonBody, {
                opacity: 0,
                y: '-5%',
                x: '10%',
                rotate: '40deg',
            
                scrollTrigger: {
                    trigger: arranged,
                    start: `top top`,  // Когда верх блока появляется у нижней границы окна
                    end: "bottom 100%", 
                    scrub: 1,          // Плавная привязка к скроллу
                    markers: false,       // Отключить маркеры в продакшене
                    invalidateOnRefresh: true,
                },
            });

            // Обновляем ScrollTrigger после создания всех анимаций
            ScrollTrigger.refresh();
        }
    }
    window.addEventListener('load', animateStageFon) 


    // Глобальный объект для управления анимацией
    const animQrBlackManager = {
            elements: new Set(),
            animations: new Map(),
            isInitialized: false,

            // Инициализация
            init: function() {
                if (this.isInitialized) return;
                
                this.isInitialized = true;
                this.setupMutationObserver();
                this.animateExistingElements();
                
                // Также инициализируем при загрузке
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', () => {
                        this.animateExistingElements();
                    });
                }
            },

            // Добавление элементов
            addElements: function(elements) {
                if (!elements || elements.length === 0) return;
                
                elements.forEach(element => {
                    if (!this.elements.has(element)) {
                        this.elements.add(element);
                        this.animateElement(element);
                    }
                });
                
                ScrollTrigger.refresh();
            },

            // Анимация существующих элементов
            animateExistingElements: function() {
                const elements = document.querySelectorAll('[data-anim-qr]');
                this.addElements(Array.from(elements));
            },

            // Анимация конкретного элемента
            animateElement: function(element) {
                if (!element || this.animations.has(element)) return;

                this.addBox(element);
                
                const boxs = element.querySelectorAll('.anim-qr__box');
                const duration = parseFloat(element.dataset.animQrDuration) || 1.2;
                const easeConfig = CustomEase.create("custom", "M0,0 C0,0 0.319,0.047 0.409,0.138 0.532,0.261 0.596,0.81 0.673,0.893 0.774,1.003 1,1 1,1");
                
                const animations = [];

                boxs.forEach(box => {
                    gsap.set(box, { willChange: 'transform, opacity' });
                    
                    const isVertical = box.classList.contains('top') || box.classList.contains('bottom');
                    const isHorizontal = box.classList.contains('left') || box.classList.contains('right');
                    
                    if (isVertical || isHorizontal) {
                        const animation = gsap.to(box, {
                            [isVertical ? 'height' : 'width']: '0px',
                            duration: duration,
                            ease: easeConfig,
                            scrollTrigger: {
                                trigger: element,
                                start: 'top 80%',
                                toggleActions: 'play none none none',
                                once: true
                            }
                        });
                        
                        animations.push(animation);
                    }
                });

                this.animations.set(element, animations);
            },

            // Добавление box элементов
            addBox: function(element) {
                if (element.querySelector('.anim-qr__box')) return;
                
                const boxes = [
                    '<div class="anim-qr__box top"></div>',
                    '<div class="anim-qr__box left"></div>',
                    '<div class="anim-qr__box bottom"></div>',
                    '<div class="anim-qr__box right"></div>'
                ];
                
                element.insertAdjacentHTML('beforeend', boxes.join(''));
            },

            // Перезапуск анимации для элемента
            restartElement: function(element) {
                this.killElement(element);
                this.animateElement(element);
            },

            // Удаление анимации элемента
            killElement: function(element) {
                const animations = this.animations.get(element);
                if (animations) {
                    animations.forEach(animation => {
                        if (animation.scrollTrigger) {
                            animation.scrollTrigger.kill();
                        }
                        animation.kill();
                    });
                    this.animations.delete(element);
                }
                this.elements.delete(element);
            },

            // Обновление всех анимаций
            refresh: function() {
                this.animations.forEach((animations, element) => {
                    animations.forEach(animation => {
                        if (animation.scrollTrigger) {
                            animation.scrollTrigger.refresh();
                        }
                    });
                });
                ScrollTrigger.refresh();
            },

            // Сброс всех анимаций
            reset: function() {
                this.animations.forEach((animations, element) => {
                    this.killElement(element);
                });
                this.elements.clear();
                this.animateExistingElements();
            },

            // Mutation Observer для новых элементов
            setupMutationObserver: function() {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.addedNodes.length > 0) {
                            mutation.addedNodes.forEach((node) => {
                                if (node.nodeType === 1) { // Element node
                                    // Проверяем сам node
                                    if (node.matches('[data-anim-qr]')) {
                                        this.addElements([node]);
                                    }
                                    
                                    // Проверяем детей node
                                    const newElements = node.querySelectorAll ? node.querySelectorAll('[data-anim-qr]') : [];
                                    if (newElements.length > 0) {
                                        this.addElements(Array.from(newElements));
                                    }
                                }
                            });
                        }
                    });
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
    };
    // Также инициализируем при полной загрузке страницы
    window.addEventListener('load', function() {
        
        setTimeout(() => {
            animQrBlackManager.init();
        }, 1200);
    });

    // Глобальная функция для обновления анимации
    window.updateQrBlackAnimation = function(selector = '[data-anim-qr]') {
            // Если передан селектор, ищем элементы по нему
            if (selector) {
                const newElements = document.querySelectorAll(selector);
                animQrBlackManager.addElements(Array.from(newElements));
            } else {
                // Иначе обновляем все
                animQrBlackManager.reset();
            }
            
            animQrBlackManager.refresh();
    };




    // анимация слов
    function animateTitleWords(userSettings = {}) {
        // Настройки по умолчанию
        const defaults = {
            wordDelay: 0.1,
            duration: 0.7,
            yOffset: 20,
            startBlur: 8,
            triggerPoint: 'top 80%',
            triggerDelay: 0,
            textAnimDuration: 0.6,
            textAnimEase: 'power2.out',
            wordTag: 'span'
        };

        const settings = { ...defaults, ...userSettings };

        // Ждем полной загрузки страницы
        window.addEventListener('load', function () {
            const textElements = document.querySelectorAll('.text-word-anim');

            if (!textElements.length) {
                console.warn('No elements with class "text-word-anim" found');
                return;
            }

            textElements.forEach(element => {
                // 🔹 Удаляем все <p>, оставляя только текст/узлы
                const paragraphs = element.querySelectorAll('p');
                paragraphs.forEach(p => {
                    while (p.firstChild) {
                        element.insertBefore(p.firstChild, p);
                    }
                    p.remove();
                });

                // Делаем SplitText только по словам
                const split = new SplitText(element, {
                    type: 'words',
                    wordsClass: 'word-anim',
                    tag: settings.wordTag
                });

                const words = split.words;
                const triggerId = element.dataset.textTrigger;

                // Начальное состояние слов
                gsap.set(words, {
                    opacity: 0,
                    y: settings.yOffset,
                    filter: `blur(${settings.startBlur}px)`,
                    display: 'inline-block',
                    willChange: 'transform, opacity, filter'
                });

                // Начальное состояние связанных элементов
                if (triggerId) {
                    const targetElements = document.querySelectorAll(`[data-text-anim="${triggerId}"]`);
                    gsap.set(targetElements, {
                        opacity: 0,
                        y: 10,
                        // filter: `blur(${settings.startBlur}px)`,
                        willChange: 'transform, opacity'
                    });
                }

                // ScrollTrigger для анимации
                ScrollTrigger.create({
                    trigger: element,
                    start: settings.triggerPoint,
                    onEnter: () => {
                        gsap.to(words, {
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            duration: settings.duration,
                            stagger: settings.wordDelay,
                            ease: 'power2.out',
                            onComplete: function () {
                                if (triggerId) {
                                    const targetElements = document.querySelectorAll(`[data-text-anim="${triggerId}"]`);
                                    gsap.to(targetElements, {
                                        opacity: 1,
                                        y: 0,
                                        filter: 'blur(0px)',
                                        duration: settings.textAnimDuration,
                                        ease: settings.textAnimEase,
                                        delay: settings.triggerDelay,
                                        stagger: settings.wordDelay * 0.5
                                    });
                                }
                            }
                        });
                    },
                    once: true
                });
            });

            ScrollTrigger.refresh();
        });
    }
    animateTitleWords()



    //обновление gsap анимации
    window.addEventListener("load", () => {
        setTimeout(() => {
            const body = document.body;
            let lastWidth = window.innerWidth;
            let lastHeight = window.innerHeight;
            let refreshTimeout;
            let isTicking = false;
    
            // Оптимизированный ResizeObserver (только по высоте)
            // const resizeObserver = new ResizeObserver((entries) => {
            //     const currentheight = entries[0].contentRect.height;
                
            //     // Реагируем только если изменилась ширина (с порогом 5px)
            //     if (Math.abs(currentheight - lastHeight) > 5) {
            //         lastHeight = currentheight;
                    
            //         if (!isTicking) {
            //             isTicking = true;
            //             clearTimeout(refreshTimeout);
            //             refreshTimeout = setTimeout(() => {
            //                 ScrollTrigger.refresh();
            //                 isTicking = false;
            //             }, 100);
            //         }
            //     }
            // });
    
            // Наблюдаем только body
            // resizeObserver.observe(body);

            ScrollTrigger.refresh();
            // Обработчик resize (только по ширине)
            const handleResize = () => {
                const currentWidth = window.innerWidth;
                
                if (Math.abs(currentWidth - lastWidth) > 5) {
                    lastWidth = currentWidth;
                    
                    if (!isTicking) {
                        isTicking = true;
                        requestAnimationFrame(() => {
                            ScrollTrigger.refresh();
                            isTicking = false;
                        });
                    }
                }
            };
    
            window.addEventListener("resize", handleResize);
    
            // Отключение (для SPA)
            // return () => {
            //     resizeObserver.unobserve(body);
            //     window.removeEventListener("resize", handleResize);
            // };
        }, 1000);
    });

}




