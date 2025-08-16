export function createBottomBlur() {
	const container = document.querySelector('.bottom-blur');
	
	// Очищаем контейнер перед созданием новых элементов
	container.innerHTML = '';
	
	// Настройки для каждого слоя размытия
	const layers = [
	  { opacity: 1, gradient: [0, 12.5, 25, 37.5], blur: 0.078125, zIndex: 1 },
	  { opacity: 1, gradient: [12.5, 25, 37.5, 50], blur: 0.15625, zIndex: 2 },
	  { opacity: 1, gradient: [25, 37.5, 50, 62.5], blur: 0.3125, zIndex: 3 },
	  { opacity: 1, gradient: [37.5, 50, 62.5, 75], blur: 0.625, zIndex: 4 },
	  { opacity: 1, gradient: [50, 62.5, 75, 87.5], blur: 1.25, zIndex: 5 },
	  { opacity: 1, gradient: [62.5, 75, 87.5, 100], blur: 2.5, zIndex: 6 },
	  { opacity: 1, gradient: [75, 87.5, 100], blur: 5, zIndex: 7 },
	  { opacity: 1, gradient: [87.5, 100], blur: 10, zIndex: 8 }
	];
  
	// Создаем каждый слой
	layers.forEach(layer => {
	  const div = document.createElement('div');
	  
	  // Формируем gradient stops
	  const stops = layer.gradient.map((stop, i) => {
		const color = i === layer.gradient.length - 1 ? 'rgb(0, 0, 0)' : `rgba(0, 0, 0, ${i === 0 ? '0' : '0'})`;
		return `${color} ${stop}%`;
	  }).join(', ');
	  
	  div.style.cssText = `
		opacity: ${layer.opacity};
		position: absolute;
		inset: 0;
		z-index: ${layer.zIndex};
		mask-image: linear-gradient(${stops});
		border-radius: 0;
		pointer-events: none;
		backdrop-filter: blur(${layer.blur}px);
		will-change: auto;
	  `;
	  
	  container.appendChild(div);
	});
	
	// Устанавливаем стили контейнера
	container.style.cssText = `
	   	position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 15vh;
		z-index: 48;
		pointer-events: none;
	`;
  }
  