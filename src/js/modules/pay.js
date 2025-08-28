export function pay() {
    const pay = document.querySelectorAll('.pay-pat');
    const btnPat = document.querySelector('.about__btn-pat');
    const buyTemp = document.querySelector('.buy-temp-activ');
    const otherCase = document.querySelector('.other-case');

    if (pay.length > 0 && buyTemp && otherCase) {
        function checkPosition() {
            const windowHeight = window.innerHeight;

            const rectBuy = buyTemp.getBoundingClientRect();
            const rectOther = otherCase.getBoundingClientRect();

            // buy-temp-activ пересёк низ экрана И other-case ещё не пересёк низ
            if (rectBuy.top <= windowHeight && rectOther.top > windowHeight) {
                pay.forEach(item => {
                    item.classList.add('_active');
                });
            } else {
                pay.forEach(item => {
                    item.classList.remove('_active');
                });
            }
        }

        window.addEventListener('scroll', checkPosition);
        window.addEventListener('resize', checkPosition);
        checkPosition(); // запуск при загрузке
    }
}