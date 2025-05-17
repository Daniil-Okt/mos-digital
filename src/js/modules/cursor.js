export function cursor() {
    const follower = document.querySelector('.cursor-follower');
    if (!follower) return;

    // Настройки стилей
    follower.style.position = 'fixed';
    follower.style.pointerEvents = 'none';
    follower.style.transform = 'translate(-50%, 0%)'; // Центрирование по X и Y

    let posX = window.innerWidth / 2;
    let posY = window.innerHeight / 2;
    let mouseX = posX;
    let mouseY = posY;

    // Начальная позиция
    follower.style.left = `${posX}px`;
    follower.style.top = `${posY}px`;

    document.addEventListener('mousemove', (e) => {
        // Для X: всегда центр курсора (clientX + половина ширины курсора)
        // Для Y: обычное положение
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        const smoothness = 0.2;
        posX += (mouseX - posX) * smoothness;
        posY += (mouseY - posY) * smoothness;
        
        // Центрируем по X через transform
        follower.style.left = `${posX}px`;
        follower.style.top = `${posY}px`;
        
        requestAnimationFrame(animate);
    }

    animate();

    // Hover-эффекты
    const hoverElements = document.querySelectorAll('[data-cursor-hover]');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('hover-effect');
        });
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('hover-effect');
        });
    });
}