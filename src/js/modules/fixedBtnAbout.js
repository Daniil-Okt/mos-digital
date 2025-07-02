
//скрыть/показать фиксированные кнопки
export function fixedBtnAbout() {
    // Проверяем ширину экрана
    if (window.innerWidth > 550) return;
  
    const fixedButtonRow = document.querySelector('.about__button-row-fixed');
    const hiddenTriggers = document.querySelectorAll('[data-button-fixed-hidden]');
    
    if (!fixedButtonRow || hiddenTriggers.length === 0) return;
  
    // Счетчик видимых триггеров
    let visibleTriggersCount = 0;
  
    // Функция обновления состояния
    function updateFixedButtonState() {
      fixedButtonRow.classList.toggle('no-fixed', visibleTriggersCount > 0);

      if (document.querySelector('.about__connect')) {
        document.querySelector('.about__connect').classList.remove('_active')
      }
    }
  
    // Создаем IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visibleTriggersCount++;
          } else {
            visibleTriggersCount--;
          }
          // Гарантируем, что счетчик не уйдет в минус
          visibleTriggersCount = Math.max(0, visibleTriggersCount);
          updateFixedButtonState();
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      }
    );
  
    // Начинаем наблюдение за всеми триггерами
    hiddenTriggers.forEach(trigger => {
      observer.observe(trigger);
    });
  
    // Обработчик ресайза
    function handleResize() {
      if (window.innerWidth > 550) {
        // На больших экранах сбрасываем состояние
        fixedButtonRow.classList.remove('no-fixed');
        observer.disconnect();
      } else if (window.innerWidth <= 550) {
        // На мобильных - перезапускаем наблюдение
        hiddenTriggers.forEach(trigger => {
          observer.observe(trigger);
        });
      }
    }
  
    // Инициализация
    updateFixedButtonState();
    window.addEventListener('resize', handleResize);
  
    // Возвращаем функцию для очистки
    return {
      destroy: () => {
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
      }
    };
  }
  