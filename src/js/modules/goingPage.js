export function goingPage() {
    // Находим все ссылки с data-attribute
	const links = document.querySelectorAll('a[data-going-page]');
	
	// Добавляем обработчик для каждой ссылки
	links.forEach(link => {
		link.addEventListener('click', function(e) {
			// Блокируем стандартное поведение
			e.preventDefault();
			
			// Добавляем класс к html
			document.querySelector('.preload-close').style.visibility = 'visible';
			document.documentElement.classList.add('going-page');
			
			// Получаем URL ссылки
			const targetUrl = this.href;
			
			// Запускаем таймер на 3 секунды
			setTimeout(() => {
				// Удаляем класс перед переходом
				
				
				
				// Выполняем переход
				window.location.href = targetUrl;

				setTimeout(() => {
					document.documentElement.classList.remove('going-page');
					// document.querySelector('.preload-close').style.visibility = 'hidden';
				}, 400);
			}, 800);
		});
	});
}