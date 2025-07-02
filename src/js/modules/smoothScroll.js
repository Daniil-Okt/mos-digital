// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';
// import ScrollSmoother from 'gsap/ScrollSmoother';

import Lenis from '@studio-freight/lenis'

export function smoothScroll() {
	const lenis = new Lenis({
        lerp: 0.1,          // Плавность (0.1 - стандартное значение)
        smooth: false,        // Включить плавный скролл
        direction: 'vertical', // Направление ('vertical' или 'horizontal')
        smoothTouch: true, // Критически важно для мобильных
        touchMultiplier: 1.5,
    })
    
      // Цикл анимации
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
}

