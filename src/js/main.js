/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
import { btnTheme } from './modules/btnTheme';
//кнопка переключения темы
btnTheme()

import { goingPage } from './modules/goingPage.js';
document.addEventListener('DOMContentLoaded', goingPage());



// import MousePRLX from './libs/parallax-mouse'
import AOS from 'aos'

import BaseHelpers from './helpers/base-helpers';
import PopupManager from './modules/popup-manager';
import BurgerMenu from './modules/burger-menu';



import { cursor } from './modules/cursor';
import { autoplayVideo } from './modules/autoplayVideo';
import { smoothScroll } from './modules/smoothScroll';
import { runningAnit } from './modules/running';
import focusInput from './modules/focusInput.js';
import { validForm } from './modules/validFrom.js';
import { qualServLineAnim } from './modules/qualServLineAnim.js';
import { questInit } from './modules/quest.js';
import { headerWhiteBlack } from './modules/headerWhiteBlack.js';
import { reviewsLike } from './modules/reviewsLike.js';
import { numberDrawingAnim } from './modules/numberDrawingAnim.js';
import { videoOpen } from './modules/videoOpen.js';
import { fixedBtnAbout } from './modules/fixedBtnAbout.js';
import { connectBtn } from './modules/connectBtn.js';
import { fixVHUnitsOnMobile } from './modules/fixVHUnitsOnMobile.js';
import { simpleParallaxInit } from './libs/simple-parallax.js';
import { descItemCase } from './modules/descItemCase.js';
import { checkElementsInCenter } from './modules/checkElementsInCenter.js';
import { typeWriteAbout } from './modules/typeWriteAbout.js';
import { whiteBlacBlockVisible } from './modules/whiteBlackBlockVisible.js';
import { menuEncl } from './modules/menuEncl.js';
import { createBottomBlur } from './modules/createBottomBlur.js';
import { animGsapInit } from './modules/animGsapInit.js';
import { animateTitleWords } from './modules/animateTitleWords.js';



// import { initSlider } from './modules/initSlider.js';
// import { textBlurAnim } from './modules/textBlurAnim.js';
// import { gptAnimation } from './modules/gptAnimation.js';
// import { comparInit } from './modules/compar.js';
// import { setupAccurateParallaxOverlap } from './libs/setupAccurateParallaxOverlap.js';

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
/* Направления скролла */
BaseHelpers.handleScrollDirection()


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

// Скролл с инерцией
if (window.innerWidth > 1024) {
	smoothScroll()
}


window.addEventListener('load', () => {
	setTimeout(() => {
		simpleParallaxInit()
	}, 500);

})



//Анимация слов заголвка первого экрана
window.addEventListener('load', typeWriteAbout);


/** ===================================================================================
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */

window.addEventListener('load', () => {
	setTimeout(() => {
		AOS.init({
			once: true, // Анимация сработает только один раз
			duration: 800,
			anchorPlacement: 'bottom-bottom'
		})
	}, 1300);
})

/** ===================================================================================
 * Параллакс мышей
 * */
// new MousePRLX();

/** ===================================================================================
 * Параллакс блоков
 * */

// parallaxInit()


/** ===================================================================================
 * <Бегущая строка>
 * */
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
// document.addEventListener('DOMContentLoaded', initSlider());



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

// const itemQuests = document.querySelectorAll('.item-quest');
// toggleActiveClass(itemQuests)

// открытие/закрытие вопросов
window.addEventListener('load', () => {
	setTimeout(() => {
		questInit()
	}, 100);
});



//курсор
if (window.innerWidth > 1024) {
	cursor()
}

//анимация текста blur
// window.addEventListener('load', textBlurAnim())



//автозапус видео 
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
// gptAnimation()

//белый/черны header относительно блоков
headerWhiteBlack()


//блоки сравнения изображений до/после
// comparInit()

//лайк отзывов
reviewsLike()

//анимация цифр +
window.addEventListener('load', numberDrawingAnim())




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



// функция активности элемента в центре при скролле
window.addEventListener('load', checkElementsInCenter);
window.addEventListener('scroll', checkElementsInCenter);
window.addEventListener('resize', checkElementsInCenter);







// станица кейса =====================================================================
// Инициализация парралакста для страницы кейса
// document.addEventListener('DOMContentLoaded', () => {
// 	const cleanup = setupAccurateParallaxOverlap(
// 		'.desc-case', // Наезжающий блок
// 		'.about-case', // Блок, на который наезжают
// 		950,          // Брейкпоинт
// 		0.6           // Интенсивность (по умолчанию 0.5)
// 	);
// });

//паддинги
descItemCase()



//добавление класс visible к черным/белым блокам
window.addEventListener('load', whiteBlacBlockVisible);

//вся анимация gsap
animGsapInit()


//элементы меню
document.addEventListener('DOMContentLoaded', menuEncl());



// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', createBottomBlur);





// document.addEventListener('DOMContentLoaded', function() {
// 	const main = document.querySelector('main.page');
// 	if (!main) return;
  
// 	const sections = Array.from(main.querySelectorAll('section'));
// 	const visibleRange = 2; // Количество видимых секций в каждую сторону
  
// 	function updateVisibility() {
// 	  // Находим первую видимую секцию (в зоне viewport)
// 	  let activeIndex = -1;
	  
// 	  sections.forEach((section, index) => {
// 		const rect = section.getBoundingClientRect();
// 		const isVisible = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
		
// 		if (isVisible) {
// 		  activeIndex = index;
// 		}
// 	  });
  
// 	  // Если не нашли активную секцию, используем первую
// 	  if (activeIndex === -1) {
// 		activeIndex = 0;
// 	  }
  
// 	  // Обновляем видимость всех секций
// 	  sections.forEach((section, index) => {
// 		const isInRange = Math.abs(index - activeIndex) <= visibleRange;
		
// 		if (isInRange) {
// 		  section.style.visibility = 'visible';
// 		//   section.style.opacity = '1';
// 		//   section.style.transition = 'opacity 0.3s ease';
// 		} else {
// 		  section.style.visibility = 'hidden';
// 		//   section.style.opacity = '0';
// 		//   section.style.transition = 'opacity 0.3s ease';
// 		}
// 	  });
// 	}
  
// 	// Инициализация и обработка скролла
// 	updateVisibility();
// 	window.addEventListener('scroll', updateVisibility);
// 	window.addEventListener('resize', updateVisibility);
//   });


export function initCounterAnimation() {
    const elements = document.querySelectorAll('[data-counter-anim]');
    
    if (!elements.length) return;

    // Сначала заменяем все значения на 0
    elements.forEach(element => {
        const originalValue = element.textContent;
        element.setAttribute('data-original-value', originalValue);
        element.textContent = '0';
        prepareElementWidth(element, originalValue);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const originalValue = element.getAttribute('data-original-value');
                const numericValue = parseFloat(originalValue);
                const isDecimal = numericValue % 1 !== 0;
                const decimalPlaces = originalValue.split('.')[1]?.length || 0;
                
                // Добавляем задержку 1 секунду перед запуском анимации
                setTimeout(() => {
                    animateCounter(element, numericValue, isDecimal, decimalPlaces);
                }, 1000);
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '80% 0px -20% 0px'
    });

    elements.forEach(element => observer.observe(element));

    function prepareElementWidth(element, originalValue) {
		const value = parseFloat(originalValue);
		const isDecimal = value % 1 !== 0;
		const decimalPlaces = originalValue.split('.')[1]?.length || 0;
	
		// возможные варианты для теста
		const testValues = [];
	
		// Ноль (с точками если нужно)
		testValues.push(isDecimal ? (0).toFixed(decimalPlaces) : '0');
	
		// Само оригинальное значение
		testValues.push(originalValue);
	
		// Максимальное по количеству цифр (например, "9999.99")
		const intPartLength = Math.floor(value).toString().length;
		if (isDecimal) {
			testValues.push('9'.repeat(intPartLength) + '.' + '9'.repeat(decimalPlaces));
		} else {
			testValues.push('9'.repeat(intPartLength));
		}
	
		// создаём контейнер для измерения
		const tempContainer = document.createElement('div');
		tempContainer.style.position = 'absolute';
		tempContainer.style.visibility = 'hidden';
		tempContainer.style.whiteSpace = 'nowrap';
		tempContainer.style.font = getComputedStyle(element).font;
		document.body.appendChild(tempContainer);
	
		let maxWidth = 0;
		testValues.forEach(testValue => {
			const tempElement = document.createElement('span');
			tempElement.textContent = testValue;
			tempContainer.appendChild(tempElement);
			maxWidth = Math.max(maxWidth, tempElement.offsetWidth);
			tempContainer.removeChild(tempElement);
		});
	
		document.body.removeChild(tempContainer);
	
		element.style.minWidth = `${maxWidth + 4}px`;
		element.style.display = 'inline-block';
		element.style.textAlign = 'center';
	}
	

    function animateCounter(element, targetValue, isDecimal, decimalPlaces) {
        const duration = 1500;
        const startTime = performance.now();
        const startValue = 0;
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 3);
            let currentValue;
            
            if (isDecimal) {
                currentValue = (startValue + (targetValue - startValue) * easeOut)
                    .toFixed(decimalPlaces);
            } else {
                currentValue = Math.floor(startValue + (targetValue - startValue) * easeOut);
            }
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = isDecimal ? targetValue.toFixed(decimalPlaces) : targetValue.toString();
            }
        }
        
        requestAnimationFrame(update);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', initCounterAnimation);