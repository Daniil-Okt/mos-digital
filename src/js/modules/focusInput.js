    function focusInput() {
        // Находим все поля ввода текста и пароля на странице
        var textInputs = document.querySelectorAll('input[type="text"], input[type="password"]');

        // Для каждого найденного поля
        textInputs.forEach(function(input) {
            // Проверяем изначальное состояние каждого поля ввода
            // и добавляем класс 'focus', если в поле есть текст
            if (input.value.trim() !== '') {
                input.parentNode.classList.add('_focus');
            }

            // Добавляем обработчик события фокусировки
            input.addEventListener('focus', function() {
                // Добавляем класс 'focus' родителю поля ввода
                this.parentNode.classList.add('_focus');
            });

            // Добавляем обработчик события потери фокуса
            input.addEventListener('blur', function() {
                // Проверяем, пустое ли поле ввода
                setTimeout(() => {
                    if (this.value.trim() === '') {
                        // Удаляем класс 'focus' у родителя поля ввода, если поле пустое
                        this.parentNode.classList.remove('_focus');
                    }
                }, 10);
                
                // Если в поле есть символы, класс 'focus' остается
            });
        });
    }


    export default focusInput;