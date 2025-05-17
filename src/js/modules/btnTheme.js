export function btnTheme() {
	const btnThemeElement = document.querySelector('.btn-theme');
	if (btnThemeElement) {
		btnThemeElement.addEventListener('click', () => {
			if (!btnThemeElement.classList.contains('_active')) {
				whiteThemeActive()
				localStorage.setItem('theme','white')
			} else {
				blackThemeActive()
				localStorage.setItem('theme','black')
			}
		})
	}

	function blackThemeActive() {
		btnThemeElement.classList.remove('_active');
		document.documentElement.classList.remove('white-theme');

		if (window.matchMedia('(max-width: 650px)').matches) {
			btnThemeElement.querySelector('.slide-anim').dataset.content = 'вкл';
		} else {
			btnThemeElement.querySelector('.slide-anim').dataset.content = 'Включить свет';
		}
	}
	function whiteThemeActive() {
		btnThemeElement.classList.add('_active');
		document.documentElement.classList.add('white-theme');

		if (window.matchMedia('(max-width: 650px)').matches) {
			btnThemeElement.querySelector('.slide-anim').dataset.content = 'выкл';
		} else {
			btnThemeElement.querySelector('.slide-anim').dataset.content = 'Выключить свет';
		}
	}

	if (localStorage.getItem('theme') == 'white') {
		whiteThemeActive()
		window.addEventListener('resize', whiteThemeActive);
	} else {
		blackThemeActive()
		window.addEventListener('resize', blackThemeActive);
	}
}