// export function autoplayVideo() {
//     const isAppleDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
//     const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && !/CriOS|FxiOS/.test(navigator.userAgent);
//     const isMacbook = /Macintosh/.test(navigator.userAgent) && !window.MSStream;

//     // Создаем структуру для времени внутри p
//     function createTimeElements(pElement) {
//         // Очищаем p, но сохраняем другие возможные элементы
//         pElement.innerHTML = '';
        
//         const minutesSpan = document.createElement('span');
//         minutesSpan.className = 'time-minutes';
//         minutesSpan.textContent = '00';
        
//         const colon = document.createTextNode(':');
        
//         const secondsSpan = document.createElement('span');
//         secondsSpan.className = 'time-seconds';
//         secondsSpan.textContent = '00';
        
//         pElement.appendChild(minutesSpan);
//         pElement.appendChild(colon);
//         pElement.appendChild(secondsSpan);
        
//         return { minutesSpan, secondsSpan };
//     }

//     // Обновляем только изменившиеся цифры
//     function updateTime(minutesSpan, secondsSpan, time) {
//         const mins = Math.floor(time / 60).toString().padStart(2, '0');
//         const secs = Math.floor(time % 60).toString().padStart(2, '0');
        
//         if (minutesSpan.textContent !== mins) {
//             minutesSpan.textContent = mins;
//         }
//         if (secondsSpan.textContent !== secs) {
//             secondsSpan.textContent = secs;
//         }
//     }

//     function setupVideoTimer(video, pElement) {
//         const { minutesSpan, secondsSpan } = createTimeElements(pElement);
//         let lastDisplayedTime = null;

//         const updateDisplay = () => {
//             const remaining = Math.max(0, video.duration - video.currentTime);
//             const displayTime = Math.floor(remaining);
            
//             if (lastDisplayedTime !== displayTime) {
//                 updateTime(minutesSpan, secondsSpan, remaining);
//                 lastDisplayedTime = displayTime;
//             }
//         };

//         // Инициализация
//         const initTimer = () => {
//             updateTime(minutesSpan, secondsSpan, video.duration);
            
//             video.addEventListener('play', () => {
//                 const interval = setInterval(updateDisplay, 100);
                
//                 const stopUpdating = () => {
//                     clearInterval(interval);
//                     updateDisplay();
//                 };
                
//                 video.addEventListener('pause', stopUpdating, { once: true });
//                 video.addEventListener('ended', stopUpdating, { once: true });
//             }, { once: true });
//         };

//         if (video.readyState >= 1) {
//             initTimer();
//         } else {
//             video.addEventListener('loadedmetadata', initTimer);
//         }
//     }

//     const videoContainers = document.querySelectorAll('.showreel__video-body');
    
//     videoContainers.forEach(container => {
//         const timeContainer = container.querySelector('.showreel__time');
//         const pElement = timeContainer.querySelector('p') || document.createElement('p');
        
//         if (!timeContainer.querySelector('p')) {
//             timeContainer.appendChild(pElement);
//         }

//         const videoElement = container.querySelector('.showreel-video video');
//         const poster = videoElement?.getAttribute('poster');

//         if (isAppleDevice || isSafari) {
//             if (!(isMacbook && !isSafari)) {
//                 // Заменяем video на picture
//                 const picture = document.createElement('picture');
//                 picture.classList.add('showreel-video');
                
//                 const sources = videoElement.querySelectorAll('source');
//                 sources.forEach(source => {
//                     const newSource = document.createElement('source');
//                     newSource.srcset = source.src;
//                     newSource.type = source.type;
//                     picture.appendChild(newSource);
//                 });

//                 const img = document.createElement('img');
//                 img.src = poster;
//                 img.loading = 'lazy';
//                 img.alt = 'Video poster';
//                 img.style.width = '100%';
//                 picture.appendChild(img);

//                 videoElement.parentNode.replaceChild(picture, videoElement);

//                 // Получаем длительность через скрытое видео
//                 const hiddenVideo = document.createElement('video');
//                 hiddenVideo.src = sources[0].src;
//                 hiddenVideo.addEventListener('loadedmetadata', () => {
//                     const { minutesSpan, secondsSpan } = createTimeElements(pElement);
//                     updateTime(minutesSpan, secondsSpan, hiddenVideo.duration);
//                     document.body.removeChild(hiddenVideo);
//                 });
//                 hiddenVideo.style.display = 'none';
//                 document.body.appendChild(hiddenVideo);
//             }
//         } else if (videoElement) {
//             setupVideoTimer(videoElement, pElement);
            
//             container.addEventListener('click', () => {
//                 if (videoElement.paused) {
//                     videoElement.play().catch(e => console.error('Video play failed:', e));
//                 }
//             });
//         }
//     });
// }



export function autoplayVideo() {
    // const isAppleDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    // const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && !/CriOS|FxiOS/.test(navigator.userAgent);
    // const isMacbook = /Macintosh/.test(navigator.userAgent) && !window.MSStream;

    // // Создаем элементы времени
    // function createTimeElements(pElement) {
    //     pElement.innerHTML = '';
        
    //     const minutesSpan = document.createElement('span');
    //     minutesSpan.className = 'time-minutes';
    //     minutesSpan.textContent = '00';
        
    //     const colon = document.createTextNode(':');
        
    //     const secondsSpan = document.createElement('span');
    //     secondsSpan.className = 'time-seconds';
    //     secondsSpan.textContent = '00';
        
    //     pElement.appendChild(minutesSpan);
    //     pElement.appendChild(colon);
    //     pElement.appendChild(secondsSpan);
        
    //     return { minutesSpan, secondsSpan };
    // }

    // // Обновляем счетчик
    // function updateTime(minutesSpan, secondsSpan, time) {
    //     const mins = Math.floor(time / 60).toString().padStart(2, '0');
    //     const secs = Math.floor(time % 60).toString().padStart(2, '0');
        
    //     if (minutesSpan.textContent !== mins) minutesSpan.textContent = mins;
    //     if (secondsSpan.textContent !== secs) secondsSpan.textContent = secs;
    // }

    // // Настройка таймера для видео
    // function setupVideoTimer(video, pElement) {
    //     const { minutesSpan, secondsSpan } = createTimeElements(pElement);
    //     let lastDisplayedTime = null;
    //     let updateInterval;

    //     const updateDisplay = () => {
    //         const remaining = Math.max(0, video.duration - video.currentTime);
    //         const displayTime = Math.floor(remaining);
            
    //         if (lastDisplayedTime !== displayTime) {
    //             updateTime(minutesSpan, secondsSpan, remaining);
    //             lastDisplayedTime = displayTime;
    //         }
    //     };

    //     const initTimer = () => {
    //         updateTime(minutesSpan, secondsSpan, video.duration);
            
    //         video.addEventListener('play', () => {
    //             updateInterval = setInterval(updateDisplay, 100);
    //         });

    //         video.addEventListener('pause', () => {
    //             clearInterval(updateInterval);
    //             updateDisplay();
    //         });

    //         video.addEventListener('ended', () => {
    //             clearInterval(updateInterval);
    //             updateTime(minutesSpan, secondsSpan, video.duration);
    //         });
    //     };

    //     if (video.readyState >= 1) {
    //         initTimer();
    //     } else {
    //         video.addEventListener('loadedmetadata', initTimer);
    //     }
    // }

    // // Обработка видео для iOS
    // function handleIOSVideo(container, pElement, videoElement) {
    //     const picture = document.createElement('picture');
    //     picture.classList.add('showreel-video');
        
    //     const sources = videoElement.querySelectorAll('source');
    //     sources.forEach(source => {
    //         const newSource = document.createElement('source');
    //         newSource.srcset = source.src;
    //         newSource.type = source.type;
    //         picture.appendChild(newSource);
    //     });

    //     const img = document.createElement('img');
    //     img.src = videoElement.getAttribute('poster');
    //     img.loading = 'lazy';
    //     img.alt = 'Video poster';
    //     picture.appendChild(img);

    //     videoElement.parentNode.replaceChild(picture, videoElement);

    //     // Скрытое видео для получения длительности
    //     const hiddenVideo = document.createElement('video');
    //     hiddenVideo.src = sources[0].src;
    //     hiddenVideo.addEventListener('loadedmetadata', () => {
    //         const { minutesSpan, secondsSpan } = createTimeElements(pElement);
    //         updateTime(minutesSpan, secondsSpan, hiddenVideo.duration);
    //         hiddenVideo.remove();
    //     });
    //     hiddenVideo.style.display = 'none';
    //     document.body.appendChild(hiddenVideo);
    // }

    // // Инициализация Intersection Observer для видео
    // function initVideoObserver(container, videoElement) {
    //     let isPlaying = false;
    //     let observer;

    //     const options = {
    //         root: null,
    //         rootMargin: '0px',
    //         threshold: 0.5 // Срабатывает когда 50% элемента в зоне видимости
    //     };

    //     const callback = (entries) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 if (!isPlaying) {
    //                     videoElement.play().catch(e => console.log('Autoplay blocked:', e));
    //                     isPlaying = true;
    //                 }
    //             } else {
    //                 if (isPlaying) {
    //                     videoElement.pause();
    //                     isPlaying = false;
    //                 }
    //             }
    //         });
    //     };

    //     observer = new IntersectionObserver(callback, options);
    //     observer.observe(container);

    //     // Очистка при демонтаже
    //     return () => observer.disconnect();
    // }

    // // Основная функция
    // const videoContainers = document.querySelectorAll('.showreel__video-body');
    // const cleanupFunctions = [];
    
    // videoContainers.forEach(container => {
    //     const timeContainer = container.querySelector('.showreel__time');
    //     const pElement = timeContainer?.querySelector('p') || document.createElement('p');
    //     if (timeContainer && !timeContainer.querySelector('p')) {
    //         timeContainer.appendChild(pElement);
    //     }

    //     const videoElement = container.querySelector('.showreel-video video');

    //     // Обработка для iOS/Safari
    //     if ((isAppleDevice || isSafari) && !(isMacbook && !isSafari)) {
    //         if (videoElement) handleIOSVideo(container, pElement, videoElement);
    //         return;
    //     }

    //     // Обработка для других устройств
    //     if (videoElement) {
    //         setupVideoTimer(videoElement, pElement);
            
    //         // Отложенная загрузка видео
    //         videoElement.setAttribute('preload', 'none');
    //         videoElement.load();

    //         // Инициализация Intersection Observer
    //         const cleanup = initVideoObserver(container, videoElement);
    //         cleanupFunctions.push(cleanup);

    //         // Клик для ручного управления
    //         container.addEventListener('click', () => {
    //             if (videoElement.paused) {
    //                 videoElement.play().catch(e => console.error('Play error:', e));
    //             } else {
    //                 videoElement.pause();
    //             }
    //         });
    //     }
    // });

    // // Функция очистки
    // return () => {
    //     cleanupFunctions.forEach(fn => fn());
    // };

    const videoContainers = document.querySelectorAll('.showreel__video-body');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('video.lazy');
        const timeDisplay = container.querySelector('.video-lazy__time p');
        
        if (!video || !timeDisplay) return;
        
        // Создаем спан для минут и секунд
        timeDisplay.innerHTML = '<span class="minutes">00</span>:<span class="seconds">00</span>';
        
        const minutesSpan = timeDisplay.querySelector('.minutes');
        const secondsSpan = timeDisplay.querySelector('.seconds');
        
        // Функция обновления времени
        function updateTimeDisplay() {
            if (video.duration) {
            const remainingTime = video.duration - video.currentTime;
            const minutes = Math.floor(remainingTime / 60);
            const seconds = Math.floor(remainingTime % 60);
            
            minutesSpan.textContent = String(minutes).padStart(2, '0');
            secondsSpan.textContent = String(seconds).padStart(2, '0');
            }
        }
        
        // Обработчики событий
        video.addEventListener('loadedmetadata', function() {
            updateTimeDisplay();
            video.addEventListener('timeupdate', updateTimeDisplay);
        });
        
        video.addEventListener('ended', function() {
            minutesSpan.textContent = '00';
            secondsSpan.textContent = '00';
        });
        });
    
        // Ваш существующий код для ленивой загрузки
        var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));
        
        if ("IntersectionObserver" in window) {
        var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(video) {
            if (video.isIntersecting) {
                for (var source in video.target.children) {
                var videoSource = video.target.children[source];
                if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                    videoSource.src = videoSource.dataset.src;
                }
                }
                
                video.target.load();
                video.target.classList.remove("lazy");
                lazyVideoObserver.unobserve(video.target);
            }
            });
        });
        
        lazyVideos.forEach(function(lazyVideo) {
            lazyVideoObserver.observe(lazyVideo);
        });
    }
}
