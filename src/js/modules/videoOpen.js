export function videoOpen() {
        // Находим все элементы, которые открывают попап с видео
        const videoTriggers = document.querySelectorAll('[data-popup-video]');
    
        // Находим попап с видео и его элементы
        const videoPopup = document.querySelector('.popup-video');
        const videoElement = videoPopup.querySelector('video');
        const videoSource = videoElement.querySelector('source');
        const popupContent = videoPopup.querySelector('.popup__content');
        const closeButtons = document.querySelectorAll('.popup__close, [data-close-overlay]');
      
        // Функция для закрытия попапа и остановки видео
        function closeVideoPopup() {
          videoPopup.classList.remove('is-open');
          videoElement.pause();
          videoElement.currentTime = 0;
        }
      
        // Обработчик клика по триггерам
        videoTriggers.forEach(trigger => {
          trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Получаем путь к видео из data-атрибута
            const videoPath = this.getAttribute('data-popup-video');
            
            // Устанавливаем источник видео и тип
            videoSource.src = videoPath;
            videoSource.type = videoPath.endsWith('.webm') ? 'video/webm' : 'video/mp4';
            
            // Перезагружаем видео элемент
            videoElement.load();
            
            // Открываем попап
            videoPopup.classList.add('is-open');
            
            // Запускаем воспроизведение
            videoElement.play().catch(error => {
              console.log('Autoplay was prevented:', error);
            });
          });
        });
      
        // Закрытие при клике на крестик или overlay
        closeButtons.forEach(btn => {
          btn.addEventListener('click', function(e) {
            e.preventDefault();
            closeVideoPopup();
          });
        });
      
        // Закрытие при клике вне контента попапа
        videoPopup.addEventListener('click', function(e) {
          if (!popupContent.contains(e.target)) {
            closeVideoPopup();
          }
        });
      
        // Предотвращаем закрытие при клике внутри контента
        popupContent.addEventListener('click', function(e) {
          e.stopPropagation();
        });
}