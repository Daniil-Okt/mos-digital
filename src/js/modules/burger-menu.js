import Popup from '../helpers/popup';

class BurgerMenu extends Popup {
  constructor() {
    super();
    this.burgerButton = document.querySelector('.icon-menu');
    this.menu = document.querySelector('.menu');
    this.closeTimer = null;
  }

  init() {
    if (this.burgerButton && this.menu) {
      this.menu.style.visibility = 'hidden';
      
      document.addEventListener('click', ({ target }) => {
        // Клик по бургер-кнопке
        if (target.closest('.icon-menu')) {
          if (this.isMenuOpen) {
            this.menuClose();
          } else {
            this.menuOpen();
          }
          return;
        }

        // Если меню открыто
        if (this.isMenuOpen) {
          const protectedElements = [
            '.menu-left-btn', 
            '.menu-right',
            '.header__bot-email',
            '.header__bot-phone',
            '.btn-theme',
            '.header__phone'
          ];
          
          const isClickOnProtectedElement = protectedElements.some(selector => 
            target.closest(selector)
          );
          
          const isClickInsideMenu = target.closest('.menu');
          
          // Закрываем меню если:
          // 1. Клик был НЕ на защищенных элементах И
          // 2. Клик был внутри меню ИЛИ вне меню
          if (!isClickOnProtectedElement && (isClickInsideMenu || !isClickInsideMenu)) {
            this.menuClose();
          }
        }
      });
    }
  }

  menuOpen() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    this.menu.style.visibility = 'visible';
    this.html.classList.add('menu-open');
    this.toggleBodyLock(true);
  }

  menuClose() {
    this.html.classList.remove('menu-open');
    this.toggleBodyLock(false);
    if (this.closeTimer) clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => {
      this.menu.style.visibility = 'hidden';
      this.closeTimer = null;
    }, 3000);
  }

  get isMenuOpen() {
    return this.html.classList.contains('menu-open');
  }
}

export default BurgerMenu;