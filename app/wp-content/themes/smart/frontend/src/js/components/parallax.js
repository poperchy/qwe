export default (function(){

    let windowHeight = window.innerHeight;
    let limiter = {
        min: 70,
        max: 90
    };
    let $FloatBoxes;

    let floating = function () {
        $FloatBoxes.forEach(($box) => {
            let updateLimiter = Math.random() * (limiter.max - limiter.min) + limiter.min;
            let offsetTop = $box.getBoundingClientRect().top;
            const pixelsToScroll = (windowHeight -  offsetTop) * updateLimiter / windowHeight;
            $box.style.transform = 'translateY(-' + pixelsToScroll + 'px)';
        });
    };

    return {
        init: function () {
            $FloatBoxes = document.querySelectorAll('.js-floating');
            if($FloatBoxes.length) {
                window.addEventListener('resize', () => {
                    windowHeight = window.innerHeight;
                    floating();
                });
                window.addEventListener('scroll', floating, false);
            }
        }
    };
})();