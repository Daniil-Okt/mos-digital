export function reviewsLike() {
    // Обработчик кликов с делегированием событий
    document.addEventListener('click', handleLikeClick);
    
    // MutationObserver для динамических элементов
    const observer = new MutationObserver(handleMutations);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Инициализация существующих элементов
    initExistingLikes();
}

function handleLikeClick(event) {
    const like = event.target.closest('[data-reviews-like]');
    if (!like) return;
    
    const likeValue = like.dataset.reviewsLike;
    const isActive = like.classList.toggle('_active');
    
    // Синхронизируем все элементы с таким же значением
    document.querySelectorAll(`[data-reviews-like="${likeValue}"]`).forEach(el => {
        el.classList.toggle('_active', isActive);
    });
}

function handleMutations(mutations) {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Проверяем только элементы
                const newLikes = node.matches('[data-reviews-like]') 
                    ? [node] 
                    : [...node.querySelectorAll('[data-reviews-like]')];
                
                newLikes.forEach(like => {
                    const likeValue = like.dataset.reviewsLike;
                    const isActive = document.querySelector(`[data-reviews-like="${likeValue}"]._active`);
                    like.classList.toggle('_active', !!isActive);
                });
            }
        });
    });
}

function initExistingLikes() {
    const likesByValue = {};
    
    // Группируем элементы по значению data-атрибута
    document.querySelectorAll('[data-reviews-like]').forEach(like => {
        const value = like.dataset.reviewsLike;
        if (!likesByValue[value]) {
            likesByValue[value] = [];
        }
        likesByValue[value].push(like);
    });
    
    // Синхронизируем состояния внутри групп
    Object.values(likesByValue).forEach(likes => {
        const hasActive = likes.some(like => like.classList.contains('_active'));
        likes.forEach(like => like.classList.toggle('_active', hasActive));
    });
}