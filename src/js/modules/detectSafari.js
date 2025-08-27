export function detectSafari() {
    const { userAgent, vendor, platform } = navigator;
    const ua = userAgent.toLowerCase();
    
    // Быстрые проверки через регулярные выражения
    const isSafari = (
        // Проверка на Safari и исключение других браузеров
        (/safari/.test(ua) && !/chrome|crios|chromium|edg|edge|fx|firefox|opr|opera/.test(ua)) ||
        // Проверка vendor Apple (надежный признак)
        /apple/i.test(vendor) ||
        // iOS устройства с Safari
        (/(ipad|iphone|ipod)/.test(platform) && !/crios/.test(ua))
    );
    
    // Добавляем класс только если это точно Safari
    document.documentElement.classList.toggle('safari', isSafari);
    return isSafari;
}