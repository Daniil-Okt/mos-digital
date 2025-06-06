export function running() {
    const runningContainers = document.querySelectorAll('.running');
    
    runningContainers.forEach(container => {
        // Очищаем предыдущие клоны
        const existingClones = container.querySelectorAll('.running__row[data-clone]');
        existingClones.forEach(clone => clone.remove());

        const originalRow = container.querySelector('.running__row');
        if (!originalRow) return;

        // Проверяем наличие класса reverse
        const isReverse = container.classList.contains('reverse');
        
        // Сохраняем оригинальное содержимое
        const originalContent = originalRow.innerHTML;
        
        // Получаем ширину контейнера и исходного ряда
        const containerWidth = container.offsetWidth;
        let rowWidth = originalRow.offsetWidth;
        
        // Дублируем содержимое, пока ширина ряда меньше ширины контейнера
        while (rowWidth < containerWidth) {
            originalRow.innerHTML += originalContent;
            rowWidth = originalRow.offsetWidth;
        }

        // Создаем клон ряда
        const clonedRow = originalRow.cloneNode(true);
        clonedRow.setAttribute('data-clone', 'true');
        container.appendChild(clonedRow);

        // Получаем итоговую ширину ряда
        const finalRowWidth = originalRow.offsetWidth;
        const speed = parseInt(container.dataset.speed) || 100;

        // Создаем анимацию
        const animationName = `runningAnim-${Math.random().toString(36).substr(2, 8)}`;
        const styleElement = document.createElement('style');
        
        // Разные keyframes для обычного и reverse режима
        styleElement.textContent = `
            #${container.id || animationName} .running__row {
                display: inline-flex;
                animation: ${animationName} ${finalRowWidth / speed}s linear infinite;
            }
            
            ${isReverse ? `
                @keyframes ${animationName} {
                    0% { transform: translateX(-${finalRowWidth}px); }
                    100% { transform: translateX(0); }
                }
            ` : `
                @keyframes ${animationName} {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-${finalRowWidth}px); }
                }
            `}
        `;
        
        document.head.appendChild(styleElement);

        if (!container.id) container.id = animationName;
        container.dataset.styleElement = animationName;
    });
}

let previousWidth = window.innerWidth;

export function runningAnit() {
    function handleResize() {
        const currentWidth = window.innerWidth;
        
        if (currentWidth !== previousWidth) {
            setTimeout(running, 10);
            previousWidth = currentWidth;
        }
    }

    window.addEventListener('load', () => {
        setTimeout(running, 10);
    });

    window.addEventListener('resize', handleResize);
}