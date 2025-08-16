export function numberDrawingAnim() {
    const drawingLeftElements = document.querySelectorAll('.drawing__left');
    
    drawingLeftElements.forEach(container => {
        const numberElement = container.querySelector('.drawing__number-figure');
        if (!numberElement) return;
        
        // Сохраняем исходное значение
        const targetNumber = parseInt(numberElement.textContent);
        numberElement.textContent = '0';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !container.classList.contains('_start')) {
                    // Добавляем класс _start при появлении контейнера
                    container.classList.add('_start');
                    
                    // Запускаем анимацию числа
                    animateNumber(numberElement, targetNumber, 1000);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '0px 0px -200px 0px' // Небольшой отступ снизу для более раннего срабатывания
        });
        
        observer.observe(container);
    });
    
    function animateNumber(element, target, duration) {
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Линейная анимация (можно изменить на ease-out)
            const currentValue = Math.floor(progress * target);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target; // Фиксируем конечное значение
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
}