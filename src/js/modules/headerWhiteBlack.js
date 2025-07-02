export function headerWhiteBlack() {
    const header = document.querySelector('header');
    
    // Конфигурация: классы блоков → классы для header
    const blockConfig = {
        '.black-block': 'header-black-block',
        '.white-block': 'header-white-block'
        // Добавьте другие блоки по необходимости
    };

    // Проверяем, находится ли центр header над блоками
    function checkHeaderCenterOverBlocks() {
        const headerRect = header.getBoundingClientRect();
        const headerCenterY = headerRect.top + (headerRect.height / 2); // Y-координата центра header

        Object.entries(blockConfig).forEach(([blockSelector, headerClass]) => {
            const blocks = document.querySelectorAll(blockSelector);
            let isCenterOverBlock = false;

            blocks.forEach(block => {
                const blockRect = block.getBoundingClientRect();
                
                // Проверяем, попадает ли центр header в границы блока
                if (headerCenterY >= blockRect.top && headerCenterY <= blockRect.bottom) {
                    isCenterOverBlock = true;
                }
            });

            header.classList.toggle(headerClass, isCenterOverBlock);
        });
    }

    // Запускаем проверку при скролле и ресайзе
    window.addEventListener('scroll', checkHeaderCenterOverBlocks);
    window.addEventListener('resize', checkHeaderCenterOverBlocks);

    // Первоначальная проверка
    checkHeaderCenterOverBlocks();
}