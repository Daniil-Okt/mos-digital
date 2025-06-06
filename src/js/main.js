/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import MousePRLX from './libs/parallaxMouse'


import BaseHelpers from './helpers/base-helpers';
import PopupManager from './modules/popup-manager';
import BurgerMenu from './modules/burger-menu';

import { btnTheme } from './modules/btnTheme';
import { cursor } from './modules/cursor';
import { autoplayVideo } from './modules/autoplayVideo';
import { smoothScroll } from './modules/smoothScroll';
import { CubeAnimator } from './modules/cubeAnimation';
import { showreelAnim } from './modules/showreelAnim';
import { contentBtn } from './modules/connectBtn';
import { runningAnit } from './modules/running';
import focusInput from './modules/focusInput.js';
import { validForm } from './modules/validFrom.js';
import { qualServLineAnim } from './modules/qualServLineAnim.js';
import { initSlider } from './modules/initSlider.js';
import { textBlurAnim } from './modules/textBlurAnim.js';
// import Tabs from './modules/tabs';
// import Accordion from './modules/accordion';

BaseHelpers.checkWebpSupport();
/* Добавление класса touch для HTML если браузер мобильный */
// BaseHelpers.addTouchClass();
/* Добавление loaded для HTML после полной загрузки страницы */
BaseHelpers.addLoadedClass();
/* Фиксированный header */
BaseHelpers.headerFixed();


/** ===================================================================================
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * На кнопку, которая вызывает окно повешай атрибут data-type="<название окна>"

 * На обертку(.popup) окна добавь атрибут '[data-close-overlay]'
 * На кнопку для закрытия окна добавь класс '.button-close'
 * */
// new PopupManager();

/** ===================================================================================
 *  Модуль для работы с меню (Бургер)
 * */
new BurgerMenu().init();


// Скролл с инерцией
if (window.innerWidth > 1024) {
	// smoothScroll()
}




/** ===================================================================================
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */
// AOS.init();

/** ===================================================================================
 * Параллакс мышей
 * */
// new MousePRLX();


/** ===================================================================================
 * <Бегущая строка>
 * */
	// window.addEventListener('load', () => {
	// 	setTimeout(() => {
	// 		running()
			
	// 	}, 10);
	// })
	runningAnit()


/* ТАБЫ ================================================================================================
 	* На wrapper блока табов добавить атрибут data-tabs="название"
	* Для обертки title табов добавить класс "tabs__nav"
	* Для title таба добавить класс "tabs__trigger"
	* Для обертки body табов добавить класс "tabs__content"
	* Для body таба добавить класс "tabs__panel"
*/
// new Tabs('название', {
// 	onChange: (data) => {
// 		console.log(data);
// 	},
// });
/* АККАРДЕОН ===========================================================================================
 	* Класс wrapper блока аккардеона добавить в инициализацию аккардиона
	* Каждый элемент аккардеона обернуть в блок с классом "accordion__item"
	* Для title аккардеона добавить класс "accordion__header"
	* Для content аккардеона добавить класс "accordion__content"
*/
// new Accordion('.accordion', {
// 	shouldOpenAll: false, // true
// 	defaultOpen: [], // [0,1]
// 	collapsedClass: 'open',
// });

/* Динамический адаптив =================================================================================
* Что бы перебросить блок в другой блок, повешай на него атрибут:
* data-da="class блока куда нужно перебросить, брекпоинт(ширина экрана), позиция в блоке(цифра либо first,last)"
*/
/*Расскоментировать для использования*/
import { useDynamicAdapt } from './modules/dynamicAdapt.js'
useDynamicAdapt()

/* Маска для инпута tel =================================================================================
	* Добавить класс tel к нужному инпуту 
*/
import { maskTel } from './modules/index.js'
maskTel()

/* Cкрыть меню при клике на его ссылки ==================================================================
*/
// import { toggleLinkMenuNoOpen } from './modules/index.js'
//toggleLinkMenuNoOpen()

/* Cкрыть меню при клике вне его ========================================================================
	* Добавить к меню класс 'your-menu'
*/
// import { toggleLinkMenuNoOpen } from './modules/index.js'
// toggleOutClickMenuRemoveOpen()

/* Удалить класс _active при клике вне элемента =========================================================
	* Передать в функцию нужный элемент и класс который нужно удалить
*/
// import { removeClassOutClickElement } from './modules/index.js'
// const elements = document.querySelectorAll('.class'); 
// removeClassOutClickElement(elements, '.removeClass')

/* Инициализация  swiper =================================================================================
*/
initSlider()


/* Валидация формы ======================================================================================
* В константу записывает нужную форму
* В переменную formNAME передаем форму
* В переменную popupTranks передаем окно благодарности
* Добавить класс _email на input type='mail'
* Добавить класс tel на input type='tel'
* Добавить каласс _req на input которые нужно проверить
* Добавить класс .popup-thanks для модального окна спасибо
  Раскоментировать для использования
*/ 
// import { validForm } from './modules/validFrom.js'
// const popupTranks = document.querySelector('.popup-thanks')
const forms = document.querySelectorAll('form')

//==== валидация ====
forms.forEach(form => {
	validForm(form)
});

//==== отправка ====
// send
//==== валидация ====

//==== валидация ====

//==== валидация ====

//==== фокус инпута ====
focusInput()

// =======================================================================================================

/* Добавление класса _active родителю при клике ==========================================================
	* Вызвать функцию и передать в нее массив нужных элементов
	* При клике на элемент, у всех элементов класс удаляется
*/
// import { toggleActiveClassParent } from './modules/index.js'
// const elementAll = document.querySelectorAll('.class');
// toggleActiveClassParent(elementAll)

/* Динамический класса _active элементу при клике ========================================================
	* Вызвать функцию и передать в нее массив нужных элементов
	* При клике на элемент, у всех элементов класс удаляется
*/
import { toggleActiveClass } from './modules/index.js'


const directPortMenuItems = document.querySelectorAll('.direct-port__menu-item');
toggleActiveClass(directPortMenuItems)

const itemQuests = document.querySelectorAll('.item-quest');
toggleActiveClass(itemQuests)

//кнопка переключения темы
btnTheme()

//курсор
if (window.innerWidth > 1024) {
	cursor()
}

//анимация текста blur
textBlurAnim()

//автозапус видео на айфонах
autoplayVideo()


//about ============================
//анимация about
showreelAnim()

contentBtn()

//анимация куба
if (window.innerWidth > 550) {
	document.querySelectorAll('.cube-anim').forEach(el => {
		new CubeAnimator(el);
	});
}



//анимация линий
window.addEventListener('load', function() {
    qualServLineAnim()
});


document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    
    // Конфигурация: классы блоков → классы для header
    const blockConfig = {
        '.black-block': 'header-black-block',
        '.white-block': 'header-white-block'
        // Добавьте другие блоки по необходимости
    };

    // Проверяем, находится ли центр header над блоками
    function checkHeaderCenterOverBlocks() {
        const headerRect = header.getBoundingClientRect();
        const headerCenterY = headerRect.top + (headerRect.height / 2); // Y-координата центра header

        Object.entries(blockConfig).forEach(([blockSelector, headerClass]) => {
            const blocks = document.querySelectorAll(blockSelector);
            let isCenterOverBlock = false;

            blocks.forEach(block => {
                const blockRect = block.getBoundingClientRect();
                
                // Проверяем, попадает ли центр header в границы блока
                if (headerCenterY >= blockRect.top && headerCenterY <= blockRect.bottom) {
                    isCenterOverBlock = true;
                }
            });

            header.classList.toggle(headerClass, isCenterOverBlock);
        });
    }

    // Запускаем проверку при скролле и ресайзе
    window.addEventListener('scroll', checkHeaderCenterOverBlocks);
    window.addEventListener('resize', checkHeaderCenterOverBlocks);

    // Первоначальная проверка
    checkHeaderCenterOverBlocks();
});