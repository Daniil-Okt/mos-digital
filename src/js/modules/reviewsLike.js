export function reviewsLike() {
    // Делегирование событий на весь документ
    document.addEventListener('click', handleLikeClick);

    // MutationObserver для элементов, которые появляются динамически
    new MutationObserver(handleMutations).observe(document.body, {
        childList: true,
        subtree: true
    });

    // Инициализация уже существующих лайков
    initExistingLikes();
}

function handleLikeClick(event) {
    const like = event.target.closest('[data-reviews-like]');
    if (!like) return;

    const likeId = like.dataset.reviewsLike;
    const numberEl = like.querySelector('.slide-reviews__like-number');

    const wasActive = like.classList.contains('_active');
    const isActive = !wasActive;

    like.classList.toggle('_active', isActive);
    if (numberEl) updateLikeCounter(like, numberEl, isActive, wasActive);

    saveLikeState(likeId, isActive);
    syncAllElementsWithId(likeId);
}

function updateLikeCounter(likeEl, numberEl, isActive, wasActive) {
    let original = parseInt(likeEl.dataset.originalCount);

    if (isNaN(original)) {
        original = parseInt(numberEl.textContent.replace(/\s/g, '')) || 0;
        likeEl.dataset.originalCount = original;
    }

    const newCount = (isActive && !wasActive) ? original + 1 :
                     (!isActive && wasActive) ? original : numberEl.textContent;

    numberEl.textContent = formatNumber(newCount);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function saveLikeState(likeId, isActive) {
    const key = `reviewsLike_${likeId}`;
    isActive ? localStorage.setItem(key, 'active') : localStorage.removeItem(key);
}

function getLikeState(likeId) {
    return localStorage.getItem(`reviewsLike_${likeId}`) === 'active';
}

function handleMutations(mutations) {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType !== 1) return;

            const likes = node.matches('[data-reviews-like]')
                ? [node]
                : [...node.querySelectorAll('[data-reviews-like]')];

            likes.forEach(initLikeElement);
        });
    });
}

function initLikeElement(like) {
    const likeId = like.dataset.reviewsLike;
    const numberEl = like.querySelector('.slide-reviews__like-number');

    if (!numberEl) return;

    const original = parseInt(numberEl.textContent.replace(/\s/g, '')) || 0;
    like.dataset.originalCount = original;

    const isActive = getLikeState(likeId);
    like.classList.toggle('_active', isActive);
    numberEl.textContent = formatNumber(original + (isActive ? 1 : 0));
}

function initExistingLikes() {
    document.querySelectorAll('[data-reviews-like]').forEach(initLikeElement);
}

function syncAllElementsWithId(likeId) {
    const elements = document.querySelectorAll(`[data-reviews-like="${likeId}"]`);
    if (!elements.length) return;

    // Смотрим состояние из localStorage
    const isActive = getLikeState(likeId);

    elements.forEach(el => {
        const numberEl = el.querySelector('.slide-reviews__like-number');
        if (!numberEl) return;

        const original = parseInt(el.dataset.originalCount) || 0;

        if (isActive) {
            el.classList.add('_active');
            numberEl.textContent = formatNumber(original + 1);
        } else {
            el.classList.remove('_active');
            numberEl.textContent = formatNumber(original);
        }
    });
}


// Получение списка ID активных лайков
export function getActiveLikes() {
    return Object.keys(localStorage)
        .filter(k => k.startsWith('reviewsLike_'))
        .map(k => k.replace('reviewsLike_', ''));
}

// Сброс лайка по ID
export function resetReviewLike(likeId) {
    localStorage.removeItem(`reviewsLike_${likeId}`);
    syncAllElementsWithId(likeId);
}

// Полный сброс всех лайков
export function resetAllReviewsLikes() {
    getActiveLikes().forEach(resetReviewLike);
}
