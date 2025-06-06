// import AOS from 'aos'
import Swiper, { Navigation, Pagination, Autoplay, Mousewheel, FreeMode } from 'swiper';

export function initSlider() {
    const swiperWarranSite = new Swiper('.warran-site__slider', {
        speed: 1700,
        spaceBetween: 12,
        slidesPerView: 1,
        modules: [Autoplay, Navigation, Pagination],
        autoplay: {
            delay: 2500,
            stopOnLastSlide: false,
            disableOnIteration: false,
        },
        navigation: {
            prevEl: ".warran-site__button-slider-prev",
            nextEl: ".warran-site__button-slider-next"
        },
        breakpoints: {
            651: {
            slidesPerView: 2,
            spaceBetween: 12,
            },
            1025: {
                slidesPerView: 3,
                spaceBetween: 15,
            }
        },
    });

    const swiperReviews = new Swiper('.reviews__slider', {
        speed: 6000,
        spaceBetween: 15,
        slidesPerView: 1,
        modules: [Autoplay, Navigation, Pagination, Mousewheel, FreeMode],
        loop: true,
        centeredSlides: true,
        // mousewheel: {
        //     enabled: true,
        //     forceToAxis: true,  
        //     invert: false,      
        //     sensitivity: 0.8,   
        // },
        // freeMode: true,
        // autoplay: {
        //     delay: 2500,
        //     stopOnLastSlide: false,
        //     disableOnIteration: false,
        // },

        autoplay: {
            delay: 0,
            disableOnInteraction: true,
        },
        allowTouchMove: false,       // Отключает свайп тач-устройствами
        simulateTouch: false,        // Отключает симуляцию touch событий
        resistance: false,           // Отключает сопротивление при скролле
        noSwiping: true,             // Полностью отключает свайп
        noSwipingClass: 'swiper-slide',
        mousewheel: {
            // enabled: false,         // Полностью отключает колесо мыши/тачпад
        },
        mousewheel: {
            enabled: true,
            forceToAxis: true,  
            invert: false,      
            sensitivity: 0.8,   
        },

        
        breakpoints: {
            651: {
            slidesPerView: 2,
            spaceBetween: 15,
            },
            1025: {
                slidesPerView: 3,
                spaceBetween: 17.5,
            }
        },
    });

    const swiperStages = new Swiper('.stages__slider', {
        speed: 6000,
        spaceBetween: 15,
        slidesPerView: 1,
        modules: [Autoplay, Navigation, Pagination, Mousewheel, FreeMode],
        loop: true,
        centeredSlides: true,


        autoplay: {
            delay: 0,
            disableOnInteraction: true,
        },
        allowTouchMove: false,       // Отключает свайп тач-устройствами
        simulateTouch: false,        // Отключает симуляцию touch событий
        resistance: false,           // Отключает сопротивление при скролле
        noSwiping: true,             // Полностью отключает свайп
        noSwipingClass: 'swiper-slide',
        mousewheel: {
            // enabled: false,         // Полностью отключает колесо мыши/тачпад
        },
        mousewheel: {
            enabled: true,
            forceToAxis: true,  
            invert: false,      
            sensitivity: 0.8,   
        },


        breakpoints: {
            651: {
            slidesPerView: 2,
            spaceBetween: 15,
            },
            1025: {
                slidesPerView: 3,
                spaceBetween: 15,
            }
        },
    });

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
