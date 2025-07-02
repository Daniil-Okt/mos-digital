export function connectBtn() {
    if (document.querySelector('.about__button-row-fixed')) {
        const btnConnect = document.querySelector('.about__connect');
        const btnConnectInner = btnConnect ? btnConnect.querySelector('.about__connect-btn') : null;
        
        if (!btnConnect) return;
    
        // Функция для проверки, является ли элемент или его потомки целевыми
        function isTargetOrChild(target, parent) {
            return parent === target || parent.contains(target);
        }
    
        // Обработчик клика по документу
        function handleDocumentClick(e) {
            // Проверяем, был ли клик вне элемента и не по кнопке внутри
            if (!isTargetOrChild(e.target, btnConnect) && 
                !isTargetOrChild(e.target, btnConnectInner)) {
                btnConnect.classList.remove('_active');
            }
        }
    
        // Обработчик клика по основной кнопке
        btnConnect.addEventListener('click', (e) => {
            // Проверяем, что клик не по внутренней кнопке
            if (!isTargetOrChild(e.target, btnConnectInner)) {
                btnConnect.classList.add('_active');
            }
        });
    
        // Добавляем обработчик клика по документу
        document.addEventListener('click', handleDocumentClick);
    
        // Возвращаем функцию для очистки
        return {
            destroy: () => {
                document.removeEventListener('click', handleDocumentClick);
            }
        };
    }
}