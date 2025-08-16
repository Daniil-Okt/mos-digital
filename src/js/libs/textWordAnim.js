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


// export function textWordAnim(userSettings = {}) {
//     const defaults = {
//         wordDelay: 0.1,
//         animationSpeed: 0.7,
//         startOffset: 15,
//         startBlur: 8,
//         triggerPoint: 0.66
//     };

//     const settings = { ...defaults, ...userSettings };

//     document.addEventListener('DOMContentLoaded', function () {
//         const animElements = document.querySelectorAll('.text-word-anim');

//         const checkIsDesktop = () => window.innerWidth > 900;

//         animElements.forEach(element => {
//             const originalHTML = element.innerHTML;
//             const delayDesktop = element.dataset.delayDesktop ? parseFloat(element.dataset.delayDesktop) : 0;
//             const delayMobile = element.dataset.delayBlur ? parseFloat(element.dataset.delayBlur) : 0;

//             element.innerHTML = '';
//             const tempDiv = document.createElement('div');
//             tempDiv.innerHTML = originalHTML;

//             processNode(element, tempDiv, 0);

//             function processNode(parent, node, wordIndex) {
//                 const childNodes = Array.from(node.childNodes);

//                 for (const child of childNodes) {
//                     if (child.nodeType === Node.TEXT_NODE) {
//                         const text = child.textContent;
//                         const wordRegex = /(\S+|\s+)/g;
//                         let match;

//                         while ((match = wordRegex.exec(text)) !== null) {
//                             const [word] = match;

//                             if (word.trim() === '') {
//                                 parent.appendChild(document.createTextNode(word));
//                             } else {
//                                 const wordSpan = document.createElement('span');
//                                 wordSpan.className = 'word-anim';
//                                 wordSpan.style.display = 'inline-block';
//                                 wordSpan.style.willChange = 'opacity, transform, filter';
//                                 wordSpan.style.backfaceVisibility = 'hidden';
//                                 wordSpan.style.transform = `translateZ(0) translateY(${settings.startOffset}px)`;
//                                 wordSpan.style.opacity = '0';
//                                 wordSpan.style.filter = `blur(${settings.startBlur}px)`;

//                                 wordSpan.dataset.wordIndex = wordIndex;
//                                 wordSpan.textContent = word;
//                                 parent.appendChild(wordSpan);
//                                 wordIndex++;
//                             }
//                         }
//                     } else if (child.nodeType === Node.ELEMENT_NODE) {
//                         const newElement = child.cloneNode(false);
//                         parent.appendChild(newElement);
//                         wordIndex = processNode(newElement, child, wordIndex);
//                     }
//                 }

//                 return wordIndex;
//             }

//             if (getComputedStyle(element.parentElement).overflow === 'hidden') {
//                 console.warn('Parent element has overflow:hidden — may cause issues on iOS!');
//             }
//         });

//         function isElementVisible(el, offset = 0) {
//             const rect = el.getBoundingClientRect();
//             const windowHeight = window.innerHeight;
//             const triggerPosition = windowHeight * settings.triggerPoint;
//             return rect.top <= triggerPosition + offset && rect.bottom >= 0;
//         }

//         function setWordsVisibleWithoutAnimation(words) {
//             words.forEach(word => {
//                 word.style.transition = '';
//                 word.style.opacity = '1';
//                 word.style.transform = 'translateZ(0) translateY(0)';
//                 word.style.filter = 'blur(0)';
//                 word.style.willChange = '';
//             });
//         }

//         function handleScroll() {
//             animElements.forEach(el => {
//                 if (el.dataset.animated === 'true' || el.dataset.animating === 'true') {
//                     // Уже анимирован или анимация в процессе — ничего не делаем
//                     return;
//                 }

//                 const offset = parseInt(el.dataset.offset) || 0;
//                 if (isElementVisible(el, offset)) {
//                     const words = el.querySelectorAll('.word-anim');
//                     const baseDelay = checkIsDesktop()
//                         ? parseFloat(el.dataset.delayDesktop) || 0
//                         : parseFloat(el.dataset.delayBlur) || 0;

//                     el.dataset.animating = 'true';

//                     words.forEach(word => {
//                         const wordIndex = parseInt(word.dataset.wordIndex, 10) || 0;
//                         const totalDelay = baseDelay + wordIndex * settings.wordDelay;

//                         word.style.transition = `
//                             opacity ${settings.animationSpeed}s ease ${totalDelay}s,
//                             transform ${settings.animationSpeed}s ease ${totalDelay}s,
//                             filter ${settings.animationSpeed}s ease ${totalDelay}s
//                         `;
//                     });

//                     requestAnimationFrame(() => {
//                         words.forEach(word => {
//                             word.style.opacity = '1';
//                             word.style.transform = 'translateZ(0) translateY(0)';
//                             word.style.filter = 'blur(0)';
//                         });
//                     });

//                     const cleanupDelay = (settings.animationSpeed + settings.wordDelay * words.length) * 1000 + 200;

//                     setTimeout(() => {
//                         words.forEach(word => {
//                             word.style.transition = '';
//                             word.style.willChange = '';
//                         });
//                         el.dataset.animating = 'false';
//                         el.dataset.animated = 'true';
//                     }, cleanupDelay);
//                 }
//             });
//         }

//         // При ресайзе просто убеждаемся, что уже анимированные слова отображаются корректно, без сброса анимации
//         function updateVisibleWordsOnResize() {
//             animElements.forEach(el => {
//                 if (el.dataset.animated === 'true') {
//                     const words = el.querySelectorAll('.word-anim');
//                     setWordsVisibleWithoutAnimation(words);
//                 }
//             });
//         }

//         setTimeout(handleScroll, 100);

//         let ticking = false;
//         window.addEventListener('scroll', () => {
//             if (!ticking) {
//                 requestAnimationFrame(() => {
//                     handleScroll();
//                     ticking = false;
//                 });
//                 ticking = true;
//             }
//         }, { passive: true });

//         window.addEventListener('resize', () => {
//             requestAnimationFrame(updateVisibleWordsOnResize); 
//         }, { passive: true });

//         window.addEventListener('orientationchange', () => {
//             requestAnimationFrame(updateVisibleWordsOnResize);
//         }, { passive: true });
//     });


    
// }

