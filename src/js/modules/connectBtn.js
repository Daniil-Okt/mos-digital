export function contentBtn() { 
    const btnConnect = document.querySelector('.about__connect')
    const btnCloseConnect = document.querySelector('.about__close-connect')
    if (btnConnect && btnCloseConnect) {
        btnConnect.addEventListener('click', () => {
            btnConnect.classList.add('_active')
            btnCloseConnect.classList.add('_active')
        })

        btnCloseConnect.addEventListener('click', () => {
            btnConnect.classList.remove('_active')
            btnCloseConnect.classList.remove('_active')
        })
    }
}