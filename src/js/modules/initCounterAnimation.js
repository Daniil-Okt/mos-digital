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
