
// export function whiteBlacBlockVisible() {
//     const blocks = document.querySelectorAll('.white-block, .black-block');
//     let lastScrollY = window.scrollY; // позиция скролла на предыдущем шаге
//     let scrollDirection = 'down';     // направление скролла по умолчанию

//     // следим за направлением
//     window.addEventListener('scroll', () => {
//         const currentScroll = window.scrollY;
//         scrollDirection = currentScroll > lastScrollY ? 'down' : 'up';
//         lastScrollY = currentScroll;
//     });

//     const observerOptions = {
//         root: null,
//         rootMargin: '0px 0px -35% 0px',
//         threshold: 0,
//     };

//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//             const { bottom } = entry.boundingClientRect;
//             const element = entry.target;

//             if (entry.isIntersecting) {
//                 // ✅ Добавляем классы ТОЛЬКО если скролл вниз
//                 if (scrollDirection === 'down') {
//                     element.classList.add('visible');

//                     if (element.classList.contains('bubble-trans')) {
//                         if (element.classList.contains('white-block')) {
//                             document.querySelector('header').classList.add('header-white-buble');

//                             setTimeout(() => {
//                                 document.documentElement.classList.add('white-theme');
//                             }, 300);
//                         } else if (element.classList.contains('black-block')) {
//                             document.querySelector('header').classList.add('header-black-buble');


//                             setTimeout(() => {
//                                 document.documentElement.classList.add('black-theme');
//                             }, 300);
//                         }
//                     }
//                 }
//             } else {

//                 // Если элемент вышел из зоны видимости
//                 if (element.classList.contains('bubble-trans')) {
//                     if (element.classList.contains('white-block')) {
//                         document.querySelector('header').classList.remove('header-white-buble');
//                         document.documentElement.classList.remove('white-theme');
//                     } else if (element.classList.contains('black-block')) {
//                         document.querySelector('header').classList.remove('header-black-buble');
//                         document.documentElement.classList.remove('black-theme');
//                     }
//                 }

//                 if (bottom < 0) {
//                     // элемент ушёл вверх — ничего не трогаем
//                     return;
//                 }

//                 // ушёл вниз — убираем
//                 element.classList.remove('visible');
//             }
//         });
//     }, observerOptions);

//     if (blocks.length > 0) {
//         blocks.forEach(block => observer.observe(block));
//     }
// }




















export function whiteBlacBlockVisible() {
     // Находим все элементы с классами white-block и black-block
     const blocks = document.querySelectorAll('.white-block, .black-block');
  
     // Настройки Intersection Observer
     const observerOptions = {
         root: null,
         rootMargin: '0px 0px -35% 0px', // Срабатывает при входе в нижние 35% экрана
         threshold: 0,
     };
   
     // Создаем observer для каждого элемента
     const observer = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
             const { bottom } = entry.boundingClientRect;
             const element = entry.target;
             
             if (entry.isIntersecting) {
                 // Элемент вошел в зону видимости → добавляем класс
                 element.classList.add('visible');
 
                 if (element.classList.contains('bubble-trans')) {
                     if (element.classList.contains('white-block')) {
                         document.querySelector('header').classList.add('header-white-buble')
                     } else if (element.classList.contains('black-block')) {
                         document.querySelector('header').classList.add('header-black-buble')
                     }
                 }
             } else {
                 
                 if (element.classList.contains('bubble-trans')) {
                     if (element.classList.contains('white-block')) {
                         document.querySelector('header').classList.remove('header-white-buble')
                     } else if (element.classList.contains('black-block')) {
                         document.querySelector('header').classList.remove('header-black-buble')
                     }
                 }
 
                 // Элемент вышел из зоны видимости
                 if (bottom < 0) {
                     // Если элемент ушел вверх (за верх viewport) → НЕ убираем класс
                     return;
                 }
                 // Если элемент ушел вниз → убираем класс
                 element.classList.remove('visible');

             }
         });
     }, observerOptions);
   
     // Наблюдаем за всеми найденными элементами
     if (blocks.length > 0) {
         blocks.forEach(block => {
             observer.observe(block);
         });
     }
}


