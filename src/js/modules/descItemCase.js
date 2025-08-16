export function descItemCase() {
    const caseItems = document.querySelectorAll('.desc-case__item');
    
    // Функция для обработки каждого элемента
    const processItem = (item) => {
        const itemRow = item.querySelector('.desc-case__item-row');
        const offerRow = item.querySelector('.desc-case__item-offer-row');
        
        if (!itemRow || !offerRow) return;
        
        // Текущая ширина элемента
        let lastWidth = item.offsetWidth;
        
        const updatePaddings = () => {
            // Проверяем текущую ширину окна перед обновлением
            if (window.innerWidth <= 950) {
                // Сбрасываем padding, если ширина меньше 950px
                itemRow.style.paddingBottom = '';
                offerRow.style.paddingTop = '';
                return;
            }
            
            const offerRowHeight = offerRow.offsetHeight;
            const itemRowHeight = itemRow.offsetHeight;
            
            itemRow.style.paddingBottom = `${offerRowHeight + 100}px`;
            offerRow.style.paddingTop = `${itemRowHeight + 100}px`;
        };
        
        // Инициализация
        updatePaddings();
        
        // Оптимизированный ResizeObserver
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const currentWidth = entry.contentRect.width;
                
                // Реагируем только на изменение ширины >1px
                if (Math.abs(currentWidth - lastWidth) > 1) {
                    lastWidth = currentWidth;
                    updatePaddings();
                }
            }
        });
        
        observer.observe(item);
        return observer; // Возвращаем observer для возможного отключения
    };
    
    // Обрабатываем элементы только если ширина >950px
    if (window.innerWidth > 950 && caseItems.length > 0) {
        const observers = [];
        
        caseItems.forEach(item => {
            const observer = processItem(item);
            if (observer) observers.push(observer);
        });
        
        // Возвращаем функцию для очистки
        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }
    
    // Возвращаем пустую функцию, если ничего не делали
    return () => {};
}