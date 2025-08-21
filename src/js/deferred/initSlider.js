// import AOS from 'aos'
import { Swiper } from 'swiper';
import { Autoplay, Navigation, Pagination, FreeMode } from 'swiper/modules';

export function initSlider() {


    const directPortItemSlider = new Swiper('.direct-port__item-slider', {
        speed: 1200,
        spaceBetween: 0,
        slidesPerView: 'auto',
        modules: [Autoplay, Pagination],
        // loop: true,
        initialSlide: 0,
        // autoplay: {
        //     delay: 2500,
        //     stopOnLastSlide: false,
        //     disableOnIteration: false,
        // },
        pagination: {
            el: ".direct-port__item-pagination",
            dynamicBullets: true,
            clickable: true,
        },
        breakpoints: {
            651: {
            speed: 1500,
            },
            1025: {
                speed: 2000,
            }
        },
    });

    const swiperWarranSite = new Swiper('.warran-site__slider', {
        speed: 1200,
        spaceBetween: 10,
        slidesPerView: 1,
        modules: [Autoplay, Navigation, Pagination, FreeMode],
        freeMode: {
            enabled: true,
            momentum: true,
            // momentumRatio: 0.9,      // Чуть менее резкая инерция
            momentumBounce: false,   // Убираем отскок для плавности
            // momentumVelocityRatio: 0.9,
            // minimumVelocity: 0.9,
            sticky: false
        },
        autoplay: {
            enabled: false,
            delay: 2500,
            stopOnLastSlide: false,
            disableOnIteration: false,
        },
        navigation: {
            prevEl: ".warran-site__button-prev",
            nextEl: ".warran-site__button-next"
        },
        breakpoints: {
            651: {
                slidesPerView: 2,
                spaceBetween: 10,
                speed: 1500,
            },
            1025: {
                freeMode: false,
                speed: 2000,
                slidesPerView: 3,
                spaceBetween: 10,
                autoplay: {
                    enabled: true,
                }
            }
        },
    });
    swiperWarranSite.on('init', function() {
        this.navigation.update(); // Принудительно обновляем кнопки
    });

    const swiperStages = new Swiper('.stages__slider', {
        speed: 1200,
        spaceBetween: 14,
        slidesPerView: 1,
        modules: [Autoplay, Navigation, Pagination, FreeMode],
        loop: false,
        centeredSlides: true,
        freeMode: {
            enabled: true,
            momentum: true,
            // momentumRatio: 0.9,      // Чуть менее резкая инерция
            momentumBounce: false,   // Убираем отскок для плавности
            // momentumVelocityRatio: 0.9,
            // minimumVelocity: 0.9,
            sticky: false
        },

        autoplay: {
            enabled: false,
            delay: 2500,
            disableOnInteraction: true,
        },

        breakpoints: {
            651: {
                loop: true,
                speed: 1500,
                slidesPerView: 2,
                spaceBetween: 15,
            },
            1025: {
                loop: true,
                speed: 2500,
                slidesPerView: 3,
                spaceBetween: 15,
                freeMode: {
                    enabled: false,
                },
                autoplay: {
                    enabled: true,
                }
            }
        },
    });

    // const swiperPartners = new Swiper('.partners__slider', {
    //     speed: 6000,
    //     spaceBetween: 15,
    //     slidesPerView: 1,
    //     modules: [Autoplay, Navigation, Pagination, Mousewheel, FreeMode],
    //     loop: true,
    //     // centeredSlides: true,
        
    //     // Autoplay
    //     autoplay: {
    //         delay: 0,
    //         disableOnInteraction: false,
    //         pauseOnMouseEnter: false,
    //         waitForTransition: false  
    //     },
    //     allowTouchMove: false,       
    //     simulateTouch: false,       
    //     resistance: false,         
    //     noSwiping: true,           
    //     noSwipingClass: 'swiper-slide',

    //     // observer: true,
    //     // observeParents: true,
    //     // preventInteractionOnTransition: true,
    

    //     mousewheel: {
    //         // enabled: false,       
    //     },
    //     mousewheel: {
    //         enabled: true,
    //         forceToAxis: true,  
    //         invert: false,      
    //         sensitivity: 0.8,   
    //     },
        

        
    //     breakpoints: {
    //         390: {
    //             slidesPerView: 'auto',
    //             spaceBetween: 15,
    //         },
    //         651: {
    //             slidesPerView: 'auto',
    //             spaceBetween: 20,
    //         }
    //     },
    // });


    const swiperExpertSite = new Swiper('.expert-site__slider', {
        speed: 1200,
        spaceBetween: 14,
        slidesPerView: 1,
        modules: [Autoplay, Navigation, Pagination, FreeMode],
        centeredSlides: true,
        autoplay: {
            enabled: false,
            delay: 2500,
            disableOnIteration: false,
        },
        freeMode: {
            enabled: true,
            momentum: true,
            // momentumRatio: 0.8,      // Чуть менее резкая инерция
            momentumBounce: false,   // Убираем отскок для плавности
            // momentumVelocityRatio: 0.3,
            // minimumVelocity: 0.01,
            sticky: false
        },
        navigation: {
            prevEl: ".warran-site__button-slider-prev",
            nextEl: ".warran-site__button-slider-next"
        },
        breakpoints: {
            651: {
                slidesPerView: 1.8,
                spaceBetween: 15,
                speed: 1500,
                // loop: true,
                centeredSlides: false,
            },
            751: {
                slidesPerView: 2.2,
                spaceBetween: 15,
                speed: 1500,
                // loop: true,
                centeredSlides: false,
            },
            1025: {
                speed: 2500,
                slidesPerView: 3,
                spaceBetween: 15,
                centeredSlides: false,
                freeMode: {
                    enabled: false,
                },
                autoplay: {
                    enabled: true,
                }
            }
        },
    });


    const verticalSwiper = new Swiper('.slide-up-anim', {
        direction: 'vertical', // Основное изменение - вертикальное направление
        speed: 1400,
        spaceBetween: 1,
        slidesPerView: 1,
        modules: [Autoplay],
        loop: true,
        initialSlide: 0,
        autoplay: {
            delay: 2500,
            stopOnLastSlide: false,
            disableOnInteraction: false,
            reverseDirection: false // Можно изменить на true для обратного направления
        },
    });



    const sliderFormatOne = new Swiper('.format__slider-one', {
        speed: 1200,
        spaceBetween: 4,
        slidesPerView: 'auto',
        modules: [Autoplay, Navigation, Pagination, FreeMode],
        centeredSlides: true,
        autoplay: {
            enabled: false,
            delay: 2000,
            stopOnLastSlide: false,
            disableOnIteration: false,
        },
        freeMode: {
            enabled: true,
            momentum: true,
            // momentumRatio: 0.8,      // Чуть менее резкая инерция
            momentumBounce: false,   // Убираем отскок для плавности
            // momentumVelocityRatio: 0.3,
            // minimumVelocity: 0.01,
            sticky: false
        },
        navigation: {
            prevEl: '.format__slider-one-prev',
            nextEl: '.format__slider-one-next',
        },
        pagination: {
            el: '.format__slider-one-pagin',
            dynamicBullets: true,
            clickable: true,
        },
        breakpoints: {
            451: {
                loop: true,
                spaceBetween: 4,
            },
            651: {  
                speed: 1500,
                loop: true,
                spaceBetween: 16,
            },
            1025: {
                centeredSlides: false,
                loop: false,
                freeMode: {
                    enabled: false,
                },
                autoplay: {
                    // enabled: true,
                }
            },
            1341: {
                speed: 2000,
                loop: false,
                slidesPerView: 5,
                spaceBetween: 16,
                centeredSlides: false,
                freeMode: {
                    enabled: false,
                },
                autoplay: {
                    // enabled: true,
                }
            },
        },
        // on: {
        //     init() {
        //         this.autoplay.stop();
        //     }
        // }
    });
    const sliderFormatTwo = new Swiper('.format__slider-two', {
        speed: 1200,
        spaceBetween: 4,
        slidesPerView: 'auto',
        modules: [Autoplay, Navigation, Pagination, FreeMode],
        centeredSlides: true,
        autoplay: {
            enabled: false,
            delay: 2000,
            stopOnLastSlide: false,
            disableOnIteration: false,
        },
        freeMode: {
            enabled: true,
            momentum: true,
            // momentumRatio: 0.8,      // Чуть менее резкая инерция
            momentumBounce: false,   // Убираем отскок для плавности
            // momentumVelocityRatio: 0.3,
            // minimumVelocity: 0.01,
            sticky: false
        },
        navigation: {
            prevEl: '.format__slider-two-prev',
            nextEl: '.format__slider-two-next',
        },
        pagination: {
            el: '.format__slider-two-pagin',
            dynamicBullets: true,
            clickable: true,
        },
        breakpoints: {
            451: {
                loop: true,
                spaceBetween: 4,
            },
            651: {  
                speed: 1500,
                loop: true,
                spaceBetween: 16,
            },
            1025: {
                centeredSlides: false,
                loop: false,
                freeMode: {
                    enabled: false,
                },
                autoplay: {
                    // enabled: true,
                }
            },
            1341: {
                speed: 2000,
                loop: false,
                slidesPerView: 5,
                spaceBetween: 16,
                centeredSlides: false,
                freeMode: {
                    enabled: false,
                },
                autoplay: {
                    // enabled: true,
                }
            },
        },
        // on: {
        //     init() {
        //         this.autoplay.stop();
        //     }
        // }
    });


    
    // const visibilityManagerSwiperFormat = enableAutoplayOnVisible('.format__slider', {
    //     threshold: 0.1 // Срабатывать при 30% видимости
    // });




    // const swiperStages = new Swiper('.stages__slider', {
    //     speed: 6000,
    //     spaceBetween: 15,
    //     slidesPerView: 1,
    //     modules: [Autoplay, Navigation, Pagination, Mousewheel, FreeMode],
    //     loop: true,
    //     allowTouchMove: false,       // Отключает свайп тач-устройствами
    //     simulateTouch: false,        // Отключает симуляцию touch событий
    //     resistance: false,           // Отключает сопротивление при скролле
    //     noSwiping: true,             // Полностью отключает свайп
    //     noSwipingClass: 'swiper-slide',
    //     mousewheel: {
    //         enabled: false,         // Полностью отключает колесо мыши/тачпад
    //     },
    //     freeMode: {
    //         enabled: false,          // Отключает свободный режим
    //     },
    //     centeredSlides: true,
    //     autoplay: {
    //         delay: 0,
    //         disableOnInteraction: true,
    //     },
    //     breakpoints: {
    //         651: {
    //             slidesPerView: 2,
    //             spaceBetween: 15,
    //         },
    //         1025: {
    //             slidesPerView: 3,
    //             spaceBetween: 15,
    //         }
    //     },
    // });


    // const swiper = new Swiper('.swiper', {
    //   speed: 800,
    //   spaceBetween: 16,
    //   slidesPerView: 1.4,
    //   modules: [Autoplay, Navigation, Pagination],
    //   loop: true,
    //   initialSlide: 1,
    //   autoplay: {
    //     delay: 2500,
    //     stopOnLastSlide: false,
    //     disableOnIteration: false,
    //   },
    //   navigation: {
    //     prevEl: ".reviews__button-slider-prev",
    //     nextEl: ".reviews__button-slider-next"
    //   },
    //   pagination: {
    //     el: ".card-slider__pagination",
    //     dynamicBullets: true,
    //     clickable: true,
    //   },
    //   breakpoints: {
    //     1400: {
    //       slidesPerView: 4,
    //       spaceBetween: 24,
    //   	},
    //     1650: {
    //         slidesPerView: 4,
    //         spaceBetween: 48,
    //     }
    //   },
    // });
}


/**
 * Включает автоплей Swiper только при видимости для одного или нескольких слайдеров
 * @param {Swiper|string} swiperInstanceOrSelector - Экземпляр Swiper или селектор
 * @param {object} [options] - Дополнительные параметры
 * @param {number} [options.threshold=0.5] - Порог видимости (0-1)
 */
function enableAutoplayOnVisible(swiperInstanceOrSelector, options = {}) {
    const { threshold = 0.5 } = options;
    
    // Обработка случая, когда передается селектор
    if (typeof swiperInstanceOrSelector === 'string') {
      const sliders = document.querySelectorAll(swiperInstanceOrSelector);
      if (!sliders.length) return [];
      
      return Array.from(sliders).map(slider => {
        const swiper = slider.swiper;
        if (!swiper) {
          console.warn('Экземпляр Swiper не найден для элемента:', slider);
          return null;
        }
        return setupAutoplay(swiper, threshold);
      }).filter(Boolean);
    }
    
    // Обработка случая, когда передается экземпляр Swiper
    return setupAutoplay(swiperInstanceOrSelector, threshold);
}

function setupAutoplay(swiper, threshold) {
    if (!swiper || !swiper.el) {
      console.warn('Некорректный экземпляр Swiper');
      return null;
    }
  
    // Останавливаем автоплей при инициализации
    swiper.autoplay?.stop();
    
    // Создаем наблюдатель
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (swiper.autoplay && !swiper.autoplay.running) {
            swiper.autoplay.start();
          }
        } else {
          if (swiper.autoplay?.running) {
            swiper.autoplay.stop();
          }
        }
      });
    }, { threshold });
  
    observer.observe(swiper.el);
  
    return {
      swiper,
      observer,
      destroy: () => {
        observer.disconnect();
        swiper.autoplay?.stop();
      }
    };
}









    // const swiperReviews = new Swiper('.reviews__slider', {
    //     speed: 6000,
    //     spaceBetween: 15,
    //     slidesPerView: 1,
    //     modules: [Autoplay, Navigation, Pagination, Mousewheel, FreeMode],
    //     loop: true,
    //     centeredSlides: true,
        
    //       // Autoplay
    //     autoplay: {
    //         delay: 0,
    //         disableOnInteraction: false,
    //         pauseOnMouseEnter: false,
    //         waitForTransition: false  
    //     },
    //     allowTouchMove: false,       
    //     simulateTouch: false,       
    //     resistance: false,         
    //     noSwiping: true,           
    //     noSwipingClass: 'swiper-slide',

    //     // observer: true,
    //     // observeParents: true,
    //     // preventInteractionOnTransition: true,
    

    //     mousewheel: {
    //         // enabled: false,       
    //     },
    //     mousewheel: {
    //         enabled: true,
    //         forceToAxis: true,  
    //         invert: false,      
    //         sensitivity: 0.8,   
    //     },
        

        
    //     breakpoints: {
    //         651: {
    //         slidesPerView: 2,
    //         spaceBetween: 15,
    //         },
    //         1025: {
    //             slidesPerView: 3,
    //             spaceBetween: 17.5,
    //         }
    //     },
    // });