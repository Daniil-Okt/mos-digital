
export function processDataSrcScripts() {
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



