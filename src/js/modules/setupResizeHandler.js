import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function setupResizeHandler() {
  let resizeTimer;
  
  // window.addEventListener('resize', function() {
    // Дебаунс ресайза
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      ScrollTrigger.refresh(); // Критически важно!
      console.log("ScrollTrigger refreshed after resize");
    }, 300);
  // });
}