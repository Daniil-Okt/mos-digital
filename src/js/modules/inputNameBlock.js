export function inputNameBlock() {
    document.addEventListener('DOMContentLoaded', function() {
        const nameInput = document.querySelector('[data-input-name-block]');
        if (!nameInput) {
            console.error('Инпут с data-input-name-block не найден');
            return;
        }
        
        const nameButtons = document.querySelectorAll('[data-btn-name-block]');

        nameButtons.forEach(button => {
            button.addEventListener('click', function() {
                const buttonValue = this.getAttribute('data-btn-name-block');
                
                // Устанавливаем значение в инпут
                nameInput.value = buttonValue;
                console.log(nameInput.value)
            });
        });
    });
}