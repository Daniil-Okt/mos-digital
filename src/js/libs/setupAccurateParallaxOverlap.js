
/**
 * Параллакс-эффект с правильным отслеживанием скролла
 * @param {string} targetSelector - Наезжающий элемент
 * @param {string} overlapSelector - Элемент, на который наезжают
 * @param {number} [mobileBreakpoint=950] - Брейкпоинт
 * @param {number} [parallaxRatio=0.5] - Интенсивность
 */
export function setupAccurateParallaxOverlap(
	targetSelector,
	overlapSelector,
	mobileBreakpoint = 950,
	parallaxRatio = 0.5
  ) {
	const targetElement = document.querySelector(targetSelector);
	const overlapElement = document.querySelector(overlapSelector);
	
	if (!targetElement || !overlapElement) return;
  
	// Устанавливаем начальные стили
	targetElement.style.marginTop = '0';
	targetElement.style.position = 'relative';
	let isEffectActive = false;
  
	const handleScroll = () => {
	  if (window.innerWidth > mobileBreakpoint) {
		if (isEffectActive) {
		  targetElement.style.marginTop = '0';
		  isEffectActive = false;
		}
		return;
	  }
  
	  const overlapRect = overlapElement.getBoundingClientRect();
	  const overlapBottom = overlapRect.bottom;
	  const viewportHeight = window.innerHeight;
  
	  // Начинаем эффект только когда overlapElement начинает уходить вверх
	  if (overlapRect.top < 0 && overlapBottom > 0) {
		isEffectActive = true;
		// Прогресс от 0 (верх overlapElement на верху экрана) до 1 (полностью ушел)
		const progress = Math.min(1, -overlapRect.top / overlapRect.height);
		
		// Смещаем targetElement вверх пропорционально прогрессу
		const offset = progress * overlapRect.height * parallaxRatio;
		targetElement.style.marginTop = `${-offset}px`;
	  } else if (overlapRect.top >= 0 && isEffectActive) {
		// Если overlapElement полностью в viewport, сбрасываем эффект
		targetElement.style.marginTop = '0';
		isEffectActive = false;
	  } else if (overlapBottom <= 0 && isEffectActive) {
		// Если overlapElement полностью ушел, фиксируем максимальное смещение
		targetElement.style.marginTop = `${-overlapRect.height * parallaxRatio}px`;
	  }
	};
  
	// Оптимизация скролла
	let isTicking = false;
	const optimizedScroll = () => {
	  if (!isTicking) {
		window.requestAnimationFrame(() => {
		  handleScroll();
		  isTicking = false;
		});
		isTicking = true;
	  }
	};
  
	// Инициализация
	handleScroll();
	window.addEventListener('scroll', optimizedScroll);
	window.addEventListener('resize', handleScroll);
  
	// Функция очистки
	return () => {
	  window.removeEventListener('scroll', optimizedScroll);
	  window.removeEventListener('resize', handleScroll);
	  targetElement.style.marginTop = '0';
	  targetElement.style.position = '';
	};
}

