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

