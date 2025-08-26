export function marquizBtn() {
    document.addEventListener('DOMContentLoaded', function() {
        const marquizButtons = document.querySelectorAll('[data-marquiz]');
    
        // Если есть кнопки и целевая кнопка существует
        if (marquizButtons.length > 0) {
            // Добавляем обработчик для каждой кнопки
            marquizButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const marquizTargetButton = document.querySelector('.marquiz__button');
                    if (marquizTargetButton) {
                        marquizTargetButton.click();
                    }
                });
            });
        }
    });
}