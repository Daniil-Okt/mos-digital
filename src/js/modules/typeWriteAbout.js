export function typeWriteAbout() {
    const element = document.getElementById('typewriter');
	
	if (element) {
		// Получаем слова из data-атрибута
		const words = JSON.parse(element.getAttribute('data-typed-words'));
		
		const options = {
			strings: words,
			typeSpeed: 150,
			backSpeed: 85,
			backDelay: 2500,
			loop: true,
			showCursor: false
		};
		
		new Typed('#typewriter', options);
	}
}