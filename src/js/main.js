/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
import MousePRLX from './libs/parallax-mouse'
import AOS from 'aos'

import BaseHelpers from './helpers/base-helpers';
import PopupManager from './modules/popup-manager';
import BurgerMenu from './modules/burger-menu';


import { btnTheme } from './modules/btnTheme';
import { cursor } from './modules/cursor';
import { autoplayVideo } from './modules/autoplayVideo';
import { smoothScroll } from './modules/smoothScroll';
import { CubeAnimator } from './modules/cubeAnimation';
import { showreelAnim } from './modules/showreelAnim';
import { runningAnit } from './modules/running';
import focusInput from './modules/focusInput.js';
import { validForm } from './modules/validFrom.js';
import { qualServLineAnim } from './modules/qualServLineAnim.js';
import { initSlider } from './modules/initSlider.js';
import { textBlurAnim } from './modules/textBlurAnim.js';
import { gptAnimation } from './modules/gptAnimation.js';
import { comparInit } from './modules/compar.js';
import { questInit } from './modules/quest.js';
import { headerWhiteBlack } from './modules/headerWhiteBlack.js';
import { reviewsLike } from './modules/reviewsLike.js';
import { numberDrawingAnim } from './modules/numberDrawingAnim.js';
import { videoOpen } from './modules/videoOpen.js';
import { fixedBtnAbout } from './modules/fixedBtnAbout.js';
import { connectBtn } from './modules/connectBtn.js';
import { fixVHUnitsOnMobile } from './modules/fixVHUnitsOnMobile.js';
import { simpleParallaxInit } from './libs/simple-parallax.js';


// import { SimpleParallax } from './libs/simple-parallax.js';
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
new PopupManager();

/** ===================================================================================
 *  Модуль для работы с меню (Бургер)
 * */
new BurgerMenu().init();


simpleParallaxInit()

// Скролл с инерцией
// if (window.innerWidth > 1024) {
// 	smoothScroll()
// }
// smoothScroll()


// // Вариант 2 - с явным указанием .default
// import { simpleParallax } from 'simple-parallax-js';

// // Вариант 3 - импорт из dist-файла
// import SimpleParallax from 'simple-parallax-js/dist/simpleParallax.min';


// // Вариант 4 - через require (если используете CommonJS)
// const SimpleParallax = require('simple-parallax-js').default;




/** ===================================================================================
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */

window.addEventListener('load', () => {
	setTimeout(() => {
		AOS.init();
	}, 10);
})

/** ===================================================================================
 * Параллакс мышей
 * */
new MousePRLX();

/** ===================================================================================
 * Параллакс блоков
 * */

// parallaxInit()


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
document.addEventListener('DOMContentLoaded', initSlider());



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
import { textWordAnim } from './libs/textWordAnim.js';





const directPortMenuItems = document.querySelectorAll('.direct-port__menu-item');
toggleActiveClass(directPortMenuItems)

// const itemQuests = document.querySelectorAll('.item-quest');
// toggleActiveClass(itemQuests)

// открытие/закрытие вопросов
document.addEventListener('load', questInit());



//кнопка переключения темы
btnTheme()

//курсор
if (window.innerWidth > 1024) {
	cursor()
}

//анимация текста blur
window.addEventListener('load', textBlurAnim())



//автозапус видео на айфонах
window.addEventListener('load', autoplayVideo())




//about ============================

connectBtn()

//анимация куба
// if (window.innerWidth > 550) {
// 	document.querySelectorAll('.cube-anim').forEach(el => {
// 		new CubeAnimator(el);
// 	});
// }



//анимация линий
window.addEventListener('load', function() {
    qualServLineAnim()
});

//анимация gpt
gptAnimation()

//белый/черны header относительно блоков
headerWhiteBlack()


//блоки сравнения изображений
comparInit()

//лайк отзывов
reviewsLike()

//анимация цифр +
window.addEventListener('load', numberDrawingAnim())


//анимация шоурила
document.addEventListener('DOMContentLoaded', showreelAnim());


//откртие видео
document.addEventListener('DOMContentLoaded', videoOpen());


//скрыть/показать фиксированные кнопки
document.addEventListener('DOMContentLoaded', fixedBtnAbout());






// vh на мобилках
window.addEventListener('load', fixVHUnitsOnMobile);

let lastWidth = window.innerWidth;
window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;
    if (currentWidth === lastWidth) return;
    lastWidth = currentWidth;
    fixVHUnitsOnMobile();
});




//анимация слов

document.addEventListener('load', textWordAnim());





function checkElementsInCenter() {
	// Работает только на экранах ≤ 768px
	if (window.innerWidth > 768) {
	  // У всех элементов снимаем класс, если ширина больше 768px
	  document.querySelectorAll('[data-ctr-scr]').forEach(el => {
		el.classList.remove('_scr-activ');
	  });
	  return;
	}
  
	const elements = document.querySelectorAll('[data-ctr-scr]');
	if (elements.length === 0) return;
  
	let activeElement = null;
	const windowHeight = window.innerHeight;
	const centerThreshold = windowHeight / 2;
  
	// Определяем зону "центра" (например, ±30% от центра экрана)
	const centerZoneMin = centerThreshold * 0.7; // 30% выше центра
	const centerZoneMax = centerThreshold * 1.3; // 30% ниже центра
  
	elements.forEach(element => {
	  const rect = element.getBoundingClientRect();
	  const elementCenter = (rect.top + rect.bottom) / 2;
  
	  // Если центр элемента попадает в зону центра экрана
	  if (elementCenter >= centerZoneMin && elementCenter <= centerZoneMax) {
		// Если ещё не нашли активный элемент или этот элемент ближе к центру
		if (!activeElement || 
			Math.abs(elementCenter - centerThreshold) < 
			Math.abs((activeElement.getBoundingClientRect().top + activeElement.getBoundingClientRect().bottom) / 2 - centerThreshold)
		) {
		  activeElement = element;
		}
	  }
	});
  
	// У всех убираем класс, затем добавляем только активному (если он есть)
	elements.forEach(element => element.classList.remove('_scr-activ'));
	if (activeElement) activeElement.classList.add('_scr-activ');
  }
  
  // Запускаем проверку при загрузке, скролле и ресайзе
  window.addEventListener('load', checkElementsInCenter);
  window.addEventListener('scroll', checkElementsInCenter);
  window.addEventListener('resize', checkElementsInCenter);
  
  // Оптимизация: Throttle для scroll/resize
  let isThrottled = false;
  function throttleCheck() {
	if (!isThrottled) {
	  checkElementsInCenter();
	  isThrottled = true;
	  setTimeout(() => isThrottled = false, 100);
	}
  }
  
  window.addEventListener('scroll', throttleCheck);
  window.addEventListener('resize', throttleCheck);



