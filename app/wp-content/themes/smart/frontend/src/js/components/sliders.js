import Swiper, {Navigation, Pagination} from 'swiper';

Swiper.use([Navigation]);
Swiper.use([Pagination]);

export default function carousel() {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        lazyLoading: true,
        keyboard: {
            enabled: true
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            formatFractionCurrent: function (number) {
                return ('0' + number).slice(-2);
            },
            formatFractionTotal: function (number) {
                return ('0' + number).slice(-2);
            },
            renderFraction: function (currentClass, totalClass) {
                return '<span class="' + currentClass + '"></span>' +
                    ' <span>/</span> ' +
                    '<span class="' + totalClass + '"></span>';
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            428: {
                slidesPerView: "auto",
                spaceBetween: 10,
                lazyLoading: true,
                keyboard: {
                    enabled: true
                },
            },
        }
    });

    const swiperGallery = new Swiper(".s-gallery__swiper", {
        spaceBetween: 15,
        slidesPerView: 'auto',
        centeredSlides: true,
        lazyLoading: true,
        loop: true,
    });

    const galleryCheck = document.querySelector('.js-gallery-check')
    if (galleryCheck) {
        const countSlides = galleryCheck.querySelectorAll('.swiper-slide').length
        if (countSlides > 1) {
            galleryCheck.classList.remove('single')
        } else {
            galleryCheck.classList.add('single')

        }
    }
}