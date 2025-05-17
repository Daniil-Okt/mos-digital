export class CubeAnimator {
	constructor(element) {
	  this.element = element;
	  this.cube = element.querySelector('.cube');
	  this.faces = element.querySelectorAll('.cube__face');
	  this.opacityEl = element.querySelector('.cube-anim__opacity');
	  this.delay = parseInt(element.getAttribute('data-delay')) || 1000;
	  this.angle = 0;
	  this.isAnimating = false;
  
	  this.findAndSetWidestWord(); // Находим и устанавливаем самое широкое слово
	  this.init();
	}


    findAndSetWidestWord() {
        if (!this.opacityEl) return;
    
        let maxWidth = 0;
        let widestWord = '';
    
    
        this.faces.forEach(face => {
            const words = face.textContent.trim().split();
                const width = face.offsetWidth;
                if (width > maxWidth) {
                    maxWidth = width;
                    widestWord = face.textContent;
                }
        });
    
        // Вставляем самое широкое слово
        this.opacityEl.textContent = widestWord;
    }
    
    
  
	init() {
	  if (!this.cube) return;
  
	  // Запускаем анимацию после небольшой задержки
	  setTimeout(() => {
		this.startAnimation();
	  }, 500);
	}
  
	startAnimation() {
        setTimeout(() => {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.animate();
        }, 1000);
	}
  
	animate() {
	  this.angle += 90;
	  this.cube.style.transform = `rotateX(${this.angle}deg)`;
  
	  // Планируем следующий кадр анимации
	  setTimeout(() => {
		this.animate();
	  }, this.delay);
	}
  }
  
