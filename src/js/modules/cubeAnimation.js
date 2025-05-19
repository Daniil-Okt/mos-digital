export class CubeAnimator {
    constructor(element) {
      this.element = element;
      this.cube = element.querySelector('.cube');
      this.faces = element.querySelectorAll('.cube__face');
      this.opacityEl = element.querySelector('.cube-anim__opacity');
      this.delay = parseInt(element.getAttribute('data-delay')) || 1000;
      this.angle = 0;
      this.isAnimating = false;
      this.animationTimeout = null;
      this.visibilityChangeHandler = this.handleVisibilityChange.bind(this);
  
      this.findAndSetWidestWord();
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
  
      this.opacityEl.textContent = widestWord;
    }
  
    init() {
      if (!this.cube) return;
  
      // Добавляем обработчик изменения видимости страницы
      document.addEventListener('visibilitychange', this.visibilityChangeHandler);
  
      setTimeout(() => {
        this.startAnimation();
      }, 500);
    }
  
    handleVisibilityChange() {
      if (document.hidden) {
        // Страница скрыта - останавливаем анимацию
        this.stopAnimation();
      } else {
        // Страница снова видима - возобновляем анимацию
        this.startAnimation();
      }
    }
  
    startAnimation() {
      if (this.isAnimating) return;
      
      this.isAnimating = true;
      this.animate();
    }
  
    stopAnimation() {
      this.isAnimating = false;
      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout);
        this.animationTimeout = null;
      }
    }
  
    animate() {
      if (!this.isAnimating) return;
  
      this.angle += 90;
      this.cube.style.transform = `rotateX(${this.angle}deg)`;
  
      this.animationTimeout = setTimeout(() => {
        this.animate();
      }, this.delay);
    }
  
    // Метод для очистки (удаляем обработчики при уничтожении)
    destroy() {
      this.stopAnimation();
      document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
    }
  }