export default function Header(container) {

    const body = document.querySelector('body')
    if (container) {
        const btn = container.querySelector('.js-burger')
        const btnClose = container.querySelector('.js-burger-close')
        const nav = container.querySelector('.js-nav')
        if (btn) {
            btn.addEventListener('click', () => {
                btn.classList.add('active')
                nav.classList.add('active')
                if (btn.classList.contains('active') && nav.classList.contains('active')) {
                    body.classList.add('no-scroll')
                } else {
                    body.classList.remove('no-scroll')
                }
            })
            btnClose.addEventListener('click', () => {
                btn.classList.remove('active')
                nav.classList.remove('active')
                body.classList.remove('no-scroll')
            })
        }

        window.addEventListener('scroll', function () {
            const scrollY = window.scrollY;

            if (scrollY >= 1) {
                container.classList.add("is-scroll")
            } else {
                container.classList.remove("is-scroll")
            }

        })
    }


}
