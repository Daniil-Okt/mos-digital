export function comparInit() {
    const sliders = document.querySelectorAll('.compar-img');
    
    sliders.forEach(container => {
        const sliderInput = container.querySelector('.compar-img__slider');
        const imgAfter = container.querySelector('.compar-img__img-af');
        const sliderButton = container.querySelector('.compar-img__slider-button');
        const imgBefore = container.querySelector('.compar-img__img-bef');
        
        let isDragging = false;
        let currentValue = 50;
        let isAnimating = false;
        let animationId = null;
        let lastUpdateTime = 0;
        let hasAnimated = false;
        const edgeThreshold = 35; // Порог в % от края для добавления классов

        function updateSlider(value) {
            value = Math.max(0, Math.min(100, value));
            currentValue = value;
            
            // Обновление позиции слайдера
            imgAfter.style.clipPath = `inset(0 0 0 ${value}%)`;
            sliderButton.style.left = `${value}%`;
            sliderInput.value = value;
            
            // Добавление/удаление классов при достижении краев
            if (value <= edgeThreshold) {
                container.classList.add('_bef');
                container.classList.remove('_af');
            } else if (value >= 100 - edgeThreshold) {
                container.classList.add('_af');
                container.classList.remove('_bef');
            } else {
                container.classList.remove('_bef', '_af');
            }
        }

        // Остальной код остается без изменений
        function animatePendulum() {
            if (isAnimating || hasAnimated) return;
            isAnimating = true;
            hasAnimated = true;
            
            const amplitude = 3;
            const duration = 2500;
            const damping = 0.5;
            let startTime = null;
            let lastValue = 50;

            function runAnimation(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const oscillation = Math.sin(progress * Math.PI * 3) * 
                                  amplitude * Math.pow(1 - progress, damping);
                
                const newValue = 50 + oscillation;
                
                if (Math.abs(newValue - lastValue) >= 0.1) {
                    updateSlider(newValue);
                    lastValue = newValue;
                }

                if (progress < 1) {
                    animationId = requestAnimationFrame(runAnimation);
                } else {
                    isAnimating = false;
                    updateSlider(50);
                }
            }
            
            animationId = requestAnimationFrame(runAnimation);
        }

        function handleMove(clientX) {
            const now = performance.now();
            if (now - lastUpdateTime < 16) return;
            lastUpdateTime = now;
            
            const rect = container.getBoundingClientRect();
            let value = ((clientX - rect.left) / rect.width) * 100;
            updateSlider(value);
        }

        // Обработчики событий остаются без изменений
        sliderInput.addEventListener('mousedown', (e) => {
            if (isAnimating) {
                cancelAnimationFrame(animationId);
                isAnimating = false;
            }
            isDragging = true;
            handleMove(e.clientX);
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            handleMove(e.clientX);
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        sliderInput.addEventListener('touchstart', (e) => {
            if (isAnimating) {
                cancelAnimationFrame(animationId);
                isAnimating = false;
            }
            isDragging = true;
            handleMove(e.touches[0].clientX);
            e.preventDefault();
        });

        // переносим touchmove на контейнер, чтобы не перехватывать глобальный скролл iOS
        container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            handleMove(e.touches[0].clientX);
            e.preventDefault();
        }, { passive: false });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        sliderInput.addEventListener('input', () => {
            if (isAnimating) {
                cancelAnimationFrame(animationId);
                isAnimating = false;
            }
            updateSlider(sliderInput.value);
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isAnimating && !isDragging && !hasAnimated) {
                    animatePendulum();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(container);
        
        updateSlider(currentValue);
    });
}