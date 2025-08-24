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
import { initCounterAnimation } from './modules/initCounterAnimation.js';



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



// Инициализация при загрузке страницы нижнего блюра
document.addEventListener('DOMContentLoaded', createBottomBlur);


// Анимация счетчика
document.addEventListener('DOMContentLoaded', initCounterAnimation);

/**
 * Скрипт для отложенной загрузки скриптов с data-src атрибутами
 * Ищет все <script defer data-src='путь'> и загружает их правильно
 */
document.addEventListener('DOMContentLoaded', function() {
    // Ждем полную загрузку страницы
    window.addEventListener('load', function() {
        processDataSrcScripts();
    });
});

function processDataSrcScripts() {
    // Находим все script элементы с data-src атрибутом
    const lazyScripts = document.querySelectorAll('script[data-src]');
    
    console.log(`Found ${lazyScripts.length} lazy scripts to load`);
    
    lazyScripts.forEach((scriptElement, index) => {
        const dataSrc = scriptElement.getAttribute('data-src');
        const shouldDefer = scriptElement.hasAttribute('defer');
        const shouldAsync = scriptElement.hasAttribute('async');
        
        if (dataSrc) {
            // Создаем новый script элемент
            const newScript = document.createElement('script');
            newScript.src = dataSrc;
            
            // Сохраняем оригинальные атрибуты
            if (shouldDefer) newScript.defer = true;
            if (shouldAsync) newScript.async = true;
            
            // Копируем другие атрибуты (кроме data-src)
            Array.from(scriptElement.attributes).forEach(attr => {
                if (attr.name !== 'data-src' && attr.name !== 'src') {
                    newScript.setAttribute(attr.name, attr.value);
                }
            });
            
            // Обработчики событий
            newScript.onload = function() {
                console.log(`Script loaded: ${dataSrc}`);
                // Можно вызвать кастомное событие
                document.dispatchEvent(new CustomEvent('lazyScriptLoaded', {
                    detail: { src: dataSrc, element: newScript }
                }));
            };
            
            newScript.onerror = function() {
                console.error(`Script failed to load: ${dataSrc}`);
                document.dispatchEvent(new CustomEvent('lazyScriptError', {
                    detail: { src: dataSrc, element: newScript }
                }));
            };
            
            // Заменяем старый элемент на новый
            scriptElement.parentNode.replaceChild(newScript, scriptElement);
            
            console.log(`Loading script: ${dataSrc} (defer: ${shouldDefer}, async: ${shouldAsync})`);
        }
    });
}

// Альтернативная версия с поддержкой Intersection Observer для загрузки при видимости
function processDataSrcScriptsAdvanced(options = {}) {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        loadImmediately = false
    } = options;
    
    const lazyScripts = document.querySelectorAll('script[data-src]');
    
    if (loadImmediately || !('IntersectionObserver' in window)) {
        // Простая загрузка всех скриптов сразу
        loadAllScriptsImmediately(lazyScripts);
        return;
    }
    
    // Используем Intersection Observer для загрузки при появлении в viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const scriptElement = entry.target;
                loadSingleScript(scriptElement);
                observer.unobserve(scriptElement);
            }
        });
    }, { threshold, rootMargin });
    
    // Наблюдаем за каждым script элементом
    lazyScripts.forEach(scriptElement => {
        observer.observe(scriptElement);
    });
}

function loadAllScriptsImmediately(scriptElements) {
    scriptElements.forEach(loadSingleScript);
}

function loadSingleScript(scriptElement) {
    const dataSrc = scriptElement.getAttribute('data-src');
    const shouldDefer = scriptElement.hasAttribute('defer');
    const shouldAsync = scriptElement.hasAttribute('async');
    
    if (!dataSrc) return;
    
    const newScript = document.createElement('script');
    newScript.src = dataSrc;
    
    if (shouldDefer) newScript.defer = true;
    if (shouldAsync) newScript.async = true;
    
    // Копируем все атрибуты кроме data-src и src
    Array.from(scriptElement.attributes).forEach(attr => {
        if (attr.name !== 'data-src' && attr.name !== 'src') {
            newScript.setAttribute(attr.name, attr.value);
        }
    });
    
    // Обработчики событий
    newScript.onload = function() {
        console.log(`✅ Script loaded: ${dataSrc}`);
        scriptElement.dispatchEvent(new CustomEvent('lazyLoadComplete', {
            bubbles: true,
            detail: { success: true, src: dataSrc }
        }));
    };
    
    newScript.onerror = function() {
        console.error(`❌ Script failed: ${dataSrc}`);
        scriptElement.dispatchEvent(new CustomEvent('lazyLoadComplete', {
            bubbles: true,
            detail: { success: false, src: dataSrc }
        }));
    };
    
    // Заменяем элемент
    scriptElement.parentNode.replaceChild(newScript, scriptElement);
}

// Автоматическая инициализация при полной загрузке
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoader);
} else {
    initLazyLoader();
}

function initLazyLoader() {
    // Ждем полную загрузку страницы
    if (document.readyState === 'complete') {
        startLazyLoading();
    } else {
        window.addEventListener('load', startLazyLoading);
    }
}

function startLazyLoading() {
    // Проверяем, есть ли скрипты для ленивой загрузки
    const hasLazyScripts = document.querySelectorAll('script[data-src]').length > 0;
    
    if (hasLazyScripts) {
        console.log('🚀 Starting lazy script loading...');
        processDataSrcScriptsAdvanced({
            threshold: 0.1,
            rootMargin: '50px',
            loadImmediately: false // Меняйте на true для немедленной загрузки
        });
    }
}

// Экспортируем функции для использования в других модулях
window.LazyScriptLoader = {
    processDataSrcScripts,
    processDataSrcScriptsAdvanced,
    loadAllScriptsImmediately,
    loadSingleScript,
    init: initLazyLoader
};








