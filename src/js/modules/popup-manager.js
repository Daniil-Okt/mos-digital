import Popup from '../helpers/popup';

class PopupManager extends Popup {
  constructor(options = {}) {
    super();

    const defaultOptions = {
      isOpenClass: 'is-open',
      buttonCloseName: 'button-close',
    };

    this.options = { ...defaultOptions, ...options };

    this.init();
    this.addEventListeners();
  }

  init() {
    this.popups.forEach((popup) => {
      popup.setAttribute('aria-hidden', 'true');
    });
  }

  addEventListeners() {
    document.addEventListener('click', this.togglePopup.bind(this));
  }

  togglePopup({ target }) {
    const targetDataTypeElement = target.closest('[data-type]');

    if (targetDataTypeElement && !target.closest('[data-popup]')) {
      const popupName = targetDataTypeElement.dataset.type;
      const popup = this.getPopupBySelector(popupName);

      if (popup) {
        this.isOpenElements.forEach((modal) => this.closePopup(modal));
        this.openPopup(popup);
        this.toggleBodyLock(true);
      }
    }

    // Проверяем только нажатие на явные элементы закрытия
    const targetCloseElement = target.closest(`.${this.options.buttonCloseName}`) ||
      (target.hasAttribute('data-close-overlay') && target);

    if (targetCloseElement) {
      const popupToClose = targetCloseElement.closest('[data-popup]');
      if (popupToClose) {
        this.closePopup(popupToClose);
        this.toggleBodyLock(false);
      }
    }
  }

  getPopupBySelector(popupName) {
    return document.querySelector(`[data-popup="${popupName}"]`);
  }

  get popups() {
    return document.querySelectorAll('[data-popup]');
  }

  get isOpenElements() {
    return document.querySelectorAll(`.${this.options.isOpenClass}`);
  }

  openPopup(popup) {
    popup.classList.add(this.options.isOpenClass);
    popup.setAttribute('aria-hidden', 'false');
  }

  closePopup(popup) {
    popup.classList.remove(this.options.isOpenClass);
    popup.setAttribute('aria-hidden', 'true');
  }
}

export default PopupManager;
