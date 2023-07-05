export default function Modals() {
    const btnClose = document.querySelectorAll('.js-close-modal')
    const modal = document.querySelector('.js-modal')
    const form = document.querySelector('.js-form')
    if (form) {
        form.addEventListener('submit', () => {
            modal.classList.add('show')
        })
    }
    if (btnClose) {
        btnClose.forEach((item) => {
            item.addEventListener('click', () => {
                modal.classList.remove('show')
            })
        })
    }
}