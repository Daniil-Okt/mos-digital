// export function qualServLineAnim() {
//     const animatedItems = document.querySelectorAll('.qual-serv__item');
    
//     // Функция для проверки видимости элемента
//     function isElementInViewport(el) {
//         const rect = el.getBoundingClientRect();
//         return (
//             rect.top <= (window.innerHeight * 0.92) && // Элемент считается видимым, когда появился на 75% высоты экрана
//             rect.bottom >= 0
//         );
//     }
    
//     // Функция для запуска анимации элемента
//     function animateItem(item) {
//         if (item.classList.contains('animated')) return;
        
//         item.classList.add('animated');
//         const percentElement = item.querySelector('.number');
//         const lineElement = item.querySelector('.qual-serv__line span');
//         const targetPercent = parseInt(percentElement.textContent);
        
//         // Рандомная скорость (от 1 до 3 секунд)
//         const randomSpeed = 1000 + Math.random() * 2000; 
        
//         // Анимация процентов
//         let currentPercent = 0;
//         const percentInterval = setInterval(() => {
//             if (currentPercent >= targetPercent) {
//                 clearInterval(percentInterval);
//             } else {
//                 currentPercent++;
//                 percentElement.textContent = currentPercent;
//             }
//         }, randomSpeed / targetPercent);
        
//         // Анимация линии
//         lineElement.style.transition = `width ${randomSpeed/1000}s cubic-bezier(0.22, 0.61, 0.36, 1)`;
//         lineElement.style.width = `${targetPercent}%`;
//     }
    
//     // Функция проверки видимости элементов
//     function checkItemsVisibility() {
//         animatedItems.forEach(item => {
//             if (isElementInViewport(item)) {
//                 animateItem(item);
//             }
//         });
//     }
    
//     // Запускаем проверку при скролле и при загрузке
//     window.addEventListener('scroll', checkItemsVisibility);
//     window.addEventListener('resize', checkItemsVisibility);
//     checkItemsVisibility(); // Проверяем сразу при загрузке
// }


export function qualServLineAnim() {
    const animatedItems = document.querySelectorAll('.qual-serv__item');
    
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight * 0.92) &&
            rect.bottom >= 0
        );
    }
    
    // Инициализация - сохраняем исходные значения и устанавливаем 0
    function initializeItems() {
        animatedItems.forEach(item => {
            const percentElement = item.querySelector('.number');
            const lineElement = item.querySelector('.qual-serv__line span');
            
            // Сохраняем исходное значение в data-атрибут
            const originalPercent = percentElement.textContent;
            item.dataset.originalPercent = originalPercent;
            
            // Устанавливаем 0%
            percentElement.textContent = '0';
            lineElement.style.width = '0%';
            
            // Сбрасываем transition для начального состояния
            lineElement.style.transition = 'none';
        });
    }
    
    // Функция для запуска анимации элемента
    function animateItem(item) {
        if (item.classList.contains('animated')) return;
        
        item.classList.add('animated');
        const percentElement = item.querySelector('.number');
        const lineElement = item.querySelector('.qual-serv__line span');
        const targetPercent = parseInt(item.dataset.originalPercent);
        
        // Рандомная скорость (от 1 до 3 секунд)
        const randomSpeed = 1000 + Math.random() * 2000; 
        
        // Сбрасываем transition перед анимацией
        lineElement.style.transition = 'none';
        // Принудительный рефлоу для сброса анимации
        void lineElement.offsetWidth;
        
        // Анимация процентов
        let currentPercent = 0;
        const percentInterval = setInterval(() => {
            if (currentPercent >= targetPercent) {
                clearInterval(percentInterval);
            } else {
                currentPercent++;
                percentElement.textContent = currentPercent;
            }
        }, randomSpeed / targetPercent);
        
        // Анимация линии
        lineElement.style.transition = `width ${randomSpeed/1000}s cubic-bezier(0.22, 0.61, 0.36, 1)`;
        lineElement.style.width = `${targetPercent}%`;
    }
    
    // Функция проверки видимости элементов
    function checkItemsVisibility() {
        animatedItems.forEach(item => {
            if (isElementInViewport(item)) {
                animateItem(item);
            }
        });
    }
    
    // Инициализируем элементы при загрузке
    initializeItems();
    
    // Запускаем проверку при скролле и при загрузке
    window.addEventListener('scroll', checkItemsVisibility);
    window.addEventListener('resize', checkItemsVisibility);
    checkItemsVisibility(); // Проверяем сразу при загрузке
}