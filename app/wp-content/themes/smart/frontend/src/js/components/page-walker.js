export default class PageWalker {

    constructor() {
        const selectorAttr = 'data-goto';

        $('[' + selectorAttr + ']').on('click', (evt) => {
            evt.preventDefault();
            let newItem = $(evt.target).attr('href') ? $(this).attr('href') : $(evt.currentTarget).attr(selectorAttr);
            let newPosition = window.pageYOffset;
            switch (newItem) {
                case 'next':
                    newPosition = $(evt.target).offset().top + $(evt.target).innerHeight();
                    break;
                case 'prev':
                    newPosition = $(evt.target).offset().top + $(evt.target).innerHeight();
                    break;
                case 'top':
                    newPosition = 0;
                    break;
                default:
                    if ($(newItem).length) {
                        newPosition = $(newItem).offset().top;
                    }
                    break;
            }
            this.scrolling(newPosition);
        });
    }

    scrolling(position, speed) {
        speed = !!(speed) ? speed : 1500;
        const headerHeight = app.header ? app.header.getHeight() : 0;
        $([document.documentElement, document.body]).animate({
            scrollTop: position - headerHeight
        }, speed);
    }

    goToBlock ($block, offsetBefore, speed) {
        let newPosition = window.pageYOffset;
        if (!offsetBefore) { offsetBefore = 0 }

        newPosition = newPosition - offsetBefore;

        if ($block.length) {
            newPosition = $block.offset().top - offsetBefore;
        }

        this.scrolling(newPosition, speed);
    }

}
