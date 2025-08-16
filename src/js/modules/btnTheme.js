
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
        document.documentElement.classList.add('black-theme');
    }

    function whiteThemeActive() {
        disableTransitions(); // Добавляем перед сменой темы
        btnThemeElement.classList.add('_active');
        document.documentElement.classList.add('white-theme');
        document.documentElement.classList.remove('black-theme');
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