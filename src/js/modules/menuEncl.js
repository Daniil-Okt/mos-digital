export function menuEncl() {
    const menuItems = document.querySelectorAll('.menu-encl');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;
  
    // Функция для закрытия всех encl-item в указанном menu-encl
    const closeAllEnclItems = (menuElement) => {
        menuElement.querySelectorAll('.encl-item').forEach(item => {
            item.classList.remove('_active');
        });
    };

    menuItems.forEach(item => {
        // Мобильная версия (клик)
        item.addEventListener('click', (e) => {
            const isClickInsideBody = e.target.closest('.menu-encl__body');
            
            if (!isClickInsideBody) {
                const wasActive = item.classList.contains('_active-link');
                
                // Закрываем другие меню
                menuItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('_active-link');
                        otherItem.closest('.menu-right').classList.remove('menu-encl-active');
                        closeAllEnclItems(otherItem);
                    }
                });
                
                // Переключаем текущее меню
                item.classList.toggle('_active-link');
                item.closest('.menu-right').classList.toggle('menu-encl-active');
                
                // Если меню закрылось, закрываем и его encl-item
                if (wasActive && !item.classList.contains('_active-link')) {
                    closeAllEnclItems(item);
                }
            }
        });
    });

    // Обработчик для encl-item
    document.addEventListener('click', function(e) {
        const enclItem = e.target.closest('.encl-item');
        if (enclItem) {
            if (!e.target.closest('.encl-item__cat-row')) {
                const parentMenu = enclItem.closest('.menu-encl');
                if (parentMenu && parentMenu.classList.contains('_active-link')) {
                    enclItem.classList.toggle('_active');
                }
            }
        }
        
        // Закрытие при клике вне menu-encl
        if (!e.target.closest('.menu-encl')) {
            menuItems.forEach(item => {
                const wasActive = item.classList.contains('_active-link');
                item.classList.remove('_active-link');
                item.closest('.menu-right').classList.remove('menu-encl-active');
                if (wasActive) {
                    closeAllEnclItems(item);
                }
            });
        }
    });
}