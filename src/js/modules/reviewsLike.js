export function reviewsLike() {
    const slideReviewsLike = document.querySelectorAll('.slide-reviews__like')

    if (slideReviewsLike.length > 0) {
        slideReviewsLike.forEach(like => {
            like.addEventListener('click', () => {
                like.classList.toggle('_active')
            })
        });
    }
}