// export function btnTheme() {
// 	const btnThemeElement = document.querySelector('.btn-theme');
// 	if (btnThemeElement) {
// 		btnThemeElement.addEventListener('click', () => {
// 			if (!btnThemeElement.classList.contains('_active')) {
// 				whiteThemeActive()
// 				localStorage.setItem('theme','white')
// 			} else {
// 				blackThemeActive()
// 				localStorage.setItem('theme','black')
// 			}
// 		})
// 	}

// 	function blackThemeActive() {
// 		btnThemeElement.classList.remove('_active');
// 		document.documentElement.classList.remove('white-theme');

// 		if (window.matchMedia('(max-width: 650px)').matches) {
// 			btnThemeElement.querySelector('.slide-anim').dataset.content = 'вкл';
// 		} else {
// 			btnThemeElement.querySelector('.slide-anim').dataset.content = 'Включить свет';
// 		}
// 	}
// 	function whiteThemeActive() {
// 		btnThemeElement.classList.add('_active');
// 		document.documentElement.classList.add('white-theme');

// 		if (window.matchMedia('(max-width: 650px)').matches) {
// 			btnThemeElement.querySelector('.slide-anim').dataset.content = 'выкл';
// 		} else {
// 			btnThemeElement.querySelector('.slide-anim').dataset.content = 'Выключить свет';
// 		}
// 	}

// 	function changeTheme() {
// 		if (localStorage.getItem('theme') == 'white') {
// 			whiteThemeActive()
// 		} else {
// 			blackThemeActive()
// 		}
// 	}
	
// 	changeTheme()
// 	window.addEventListener('resize', changeTheme);
// }


export function btnTheme() {
    const btnThemeElement = document.querySelector('.btn-theme');
    if (!btnThemeElement) return;

    // Функция для временного отключения transition цветов
    const disableTransitions = () => {
        document.documentElement.classList.add('theme-switching');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.documentElement.classList.remove('theme-switching');
            });
        });
    };

    function blackThemeActive() {
        disableTransitions(); // Добавляем перед сменой темы
        btnThemeElement.classList.remove('_active');
        document.documentElement.classList.remove('white-theme');

        if (window.matchMedia('(max-width: 650px)').matches) {
            btnThemeElement.querySelector('.slide-anim').dataset.content = 'вкл';
        } else {
            btnThemeElement.querySelector('.slide-anim').dataset.content = 'Включить свет';
        }
    }

    function whiteThemeActive() {
        disableTransitions(); // Добавляем перед сменой темы
        btnThemeElement.classList.add('_active');
        document.documentElement.classList.add('white-theme');

        if (window.matchMedia('(max-width: 650px)').matches) {
            btnThemeElement.querySelector('.slide-anim').dataset.content = 'выкл';
        } else {
            btnThemeElement.querySelector('.slide-anim').dataset.content = 'Выключить свет';
        }
    }

    btnThemeElement.addEventListener('click', () => {
        if (!btnThemeElement.classList.contains('_active')) {
            whiteThemeActive();
            localStorage.setItem('theme', 'white');
        } else {
            blackThemeActive();
            localStorage.setItem('theme', 'black');
        }
    });

    function changeTheme() {
        if (localStorage.getItem('theme') == 'white') {
            whiteThemeActive();
        } else {
            blackThemeActive();
        }
    }
    
    changeTheme();
    window.addEventListener('resize', changeTheme);
}