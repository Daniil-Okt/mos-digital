import MobileChecker from './mobile-checker';

class BaseHelpers {
  static html = document.documentElement;
  static header = document.querySelector('.header');
  static firstScreen = document.querySelector('[data-observ]');

  /**
   * Проверка браузера на поддержку .webp изображений
   * (i) необходимо для корректного отображения webp из css
   * */
  static checkWebpSupport() {
    /** Проверка поддержки webp */
    const testWebp = (callback) => {
      const webP = new Image();

      webP.onload = webP.onerror = () => callback(webP.height === 2);
      webP.src =
        'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    };

    /** Добавление класса _webp или _no-webp для HTML */
    testWebp((support) => {
      const className = support ? 'webp' : 'no-webp';
	    BaseHelpers.html.classList.add(className);

      console.log(support ? 'webp поддерживается' : 'webp не поддерживается');
    });
  }

  /**
   * Добавление класса touch для HTML если браузер мобильный
   * */
  static addTouchClass() {
    if (MobileChecker.isAny) {
	    BaseHelpers.html.classList.add('touch');
    }
  }

  /**
   * Добавление loaded для HTML после полной загрузки страницы
   * */
  static addLoadedClass() {
    window.addEventListener('load', () => {
      setTimeout(() => {
	      BaseHelpers.html.classList.add('loaded');
      }, 1000);
    });
  }

  /** Получение хеша в адресе сайта */
  static get getHash() {
    return location.hash?.replace('#', '');
  }

  /** Указание хеша в адресе сайта */
  static setHash(hash) {
    hash = hash ? `#${hash}` : location.href.split('#')[0];
    history.pushState('', '', hash);
  }

  /** Функция для фиксированной шапки при скролле */
  static headerFixed(offsetInPx = 0) {
    if (offsetInPx > 0) {
      // Используем событие scroll для управления фиксацией при заданном отступе
      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        BaseHelpers.html.classList.toggle('header-is-sticky', scrollTop > offsetInPx);
      });
    } else if (BaseHelpers.firstScreen) {
      // Сохраняем поведение через IntersectionObserver, если offsetInPx не передано
      const headerStickyObserver = new IntersectionObserver(([entry]) => {
        BaseHelpers.html.classList.toggle('header-is-sticky', !entry.isIntersecting);
      });

      headerStickyObserver.observe(BaseHelpers.firstScreen);
    }
  }

   /** Функция направления скролла */
  // static handleScrollDirection(threshold = 100) {
  //   let lastScroll = window.scrollY || document.documentElement.scrollTop;
    
  //   window.addEventListener('scroll', () => {
  //     const currentScroll = window.scrollY || document.documentElement.scrollTop;
  //     const isScrollingDown = currentScroll > lastScroll;
  //     const scrollDelta = Math.abs(currentScroll - lastScroll);
  
  //     // Срабатываем только если скролл больше порога (threshold)
  //     if (scrollDelta > threshold) {
  //       if (isScrollingDown) {
  //         document.documentElement.classList.add('scroll-bot');
  //       } else {
  //         document.documentElement.classList.remove('scroll-bot');
  //       }
  //       lastScroll = currentScroll; // Обновляем последнюю позицию скролла
  //     }
  //   });
  // }

  static handleScrollDirection(threshold = 100) {
    let lastScroll = window.scrollY || document.documentElement.scrollTop;
    let scrollTimer = null;
    let lastDirection = null; // 'up' или 'down'
  
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const isScrollingDown = currentScroll > lastScroll;
      const scrollDelta = Math.abs(currentScroll - lastScroll);
      const currentDirection = isScrollingDown ? 'down' : 'up';
  
      // Срабатываем только если скролл больше порога (threshold)
      if (scrollDelta > threshold) {
        // Если направление изменилось, сбрасываем таймер
        if (currentDirection !== lastDirection && scrollTimer) {
          clearTimeout(scrollTimer);
          scrollTimer = null;
        }
  
        // Запускаем новый таймер, если его еще нет
        if (!scrollTimer) {
          scrollTimer = setTimeout(() => {
            if (currentDirection === 'down') {
              document.documentElement.classList.add('scroll-bot');
            } else {
              document.documentElement.classList.remove('scroll-bot');
            }
            scrollTimer = null;
          }, 1000); // 2 секунды
        }
  
        lastDirection = currentDirection;
        lastScroll = currentScroll; // Обновляем последнюю позицию скролла
      }
    });
  }
}

export default BaseHelpers;
