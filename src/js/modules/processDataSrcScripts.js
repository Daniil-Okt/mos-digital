
export function processDataSrcScripts() {
    // Находим все script элементы с data-src атрибутом
    const lazyScripts = document.querySelectorAll('script[data-src]');
    
    
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
            
        }
    });
}



