
//скрыть/показать фиксированные кнопки
// export function fixedBtnAbout() {
//     // Проверяем ширину экрана
//     if (window.innerWidth > 550) return;
  
//     const fixedButtonRow = document.querySelector('.about__button-row-fixed');
//     const hiddenTriggers = document.querySelectorAll('[data-button-fixed-hidden]');
    
//     if (!fixedButtonRow || hiddenTriggers.length === 0) return;
  
//     // Счетчик видимых триггеров
//     let visibleTriggersCount = 0;
  
//     // Функция обновления состояния
//     function updateFixedButtonState() {
//       fixedButtonRow.classList.toggle('no-fixed', visibleTriggersCount > 0);

//       if (document.querySelector('.about__connect')) {
//         document.querySelector('.about__connect').classList.remove('_active')
//       }
//     }
  
//     // Создаем IntersectionObserver
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             visibleTriggersCount++;
//           } else {
//             visibleTriggersCount--;
//           }
//           // Гарантируем, что счетчик не уйдет в минус
//           visibleTriggersCount = Math.max(0, visibleTriggersCount);
//           updateFixedButtonState();
//         });
//       },
//       {
//         threshold: 0.1,
//         rootMargin: '0px 0px -20px 0px'
//       }
//     );
  
//     // Начинаем наблюдение за всеми триггерами
//     hiddenTriggers.forEach(trigger => {
//       observer.observe(trigger);
//     });
  
//     // Обработчик ресайза
//     function handleResize() {
//       if (window.innerWidth > 550) {
//         // На больших экранах сбрасываем состояние
//         fixedButtonRow.classList.remove('no-fixed');
//         observer.disconnect();
//       } else if (window.innerWidth <= 550) {
//         // На мобильных - перезапускаем наблюдение
//         hiddenTriggers.forEach(trigger => {
//           observer.observe(trigger);
//         });
//       }
//     }
  
//     // Инициализация
//     updateFixedButtonState();
//     window.addEventListener('resize', handleResize);
  
//     // Возвращаем функцию для очистки
//     return {
//       destroy: () => {
//         observer.disconnect();
//         window.removeEventListener('resize', handleResize);
//       }
//     };
// }


export function fixedBtnAbout() {
  // Проверяем ширину экрана
  if (window.innerWidth > 550) return;

  const fixedButtonRow = document.querySelector('.about__button-row-fixed');
  const hiddenTriggers = document.querySelectorAll('[data-button-fixed-hidden]');
  
  if (!fixedButtonRow || hiddenTriggers.length === 0) return;

  // Счетчик видимых триггеров
  let visibleTriggersCount = 0;
  let changeTimer = null;
  let lastState = null; // true - fixed, false - no-fixed

  // Функция обновления состояния с таймером
  function updateFixedButtonState() {
    const newState = visibleTriggersCount > 0;
    
    // Если состояние изменилось
    if (newState !== lastState) {
      // Сбрасываем предыдущий таймер, если он есть
      if (changeTimer) {
        clearTimeout(changeTimer);
        changeTimer = null;
      }
      
      // Устанавливаем новый таймер
      changeTimer = setTimeout(() => {
        fixedButtonRow.classList.toggle('no-fixed', newState);
        
        if (document.querySelector('.about__connect')) {
          document.querySelector('.about__connect').classList.remove('_active');
        }
        
        lastState = newState;
        changeTimer = null;
      }, 1000); // 200ms задержка (можно настроить)
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
    // Сбрасываем таймер при ресайзе
    if (changeTimer) {
      clearTimeout(changeTimer);
      changeTimer = null;
    }
    
    if (window.innerWidth > 550) {
      // На больших экранах сбрасываем состояние
      fixedButtonRow.classList.remove('no-fixed');
      observer.disconnect();
      lastState = null;
    } else if (window.innerWidth <= 550) {
      // На мобильных - перезапускаем наблюдение
      visibleTriggersCount = 0;
      lastState = null;
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
      if (changeTimer) clearTimeout(changeTimer);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    }
  };
}