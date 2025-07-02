export function gptAnimation() {
    // Ждем полной загрузки страницы
    window.addEventListener('load', function() {
        const target = document.getElementById('spline-target');
            if (target) {
            // Добавляем скрипт
            const script = document.createElement('script');
            script.type = 'module';
            script.src = 'https://unpkg.com/@splinetool/viewer@1.10.2/build/spline-viewer.js';
            document.head.appendChild(script);
            
            // Добавляем viewer в нужный блок
            script.onload = function() {
            const target = document.getElementById('spline-target');

        
            target.innerHTML = `
                <spline-viewer url="https://prod.spline.design/H3NJrn7HdSNCUs54/scene.splinecode"></spline-viewer>
            `;
            };
        }
    });
}
