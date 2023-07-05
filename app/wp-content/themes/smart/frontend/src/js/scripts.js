"use strict";
import svg4everybody from 'svg4everybody';
import scrollLock from 'scroll-lock';

import Header from './components/header.js';
import Carousel from './components/sliders.js'
import Tabs from './components/tabs.js'
import Modals from './components/modals.js'
import {formProcessing} from './components/forms'

svg4everybody();
window.app = {
    content: null,
    header: null,

    scroll: {
        disable: scrollLock.disablePageScroll,
        enable: scrollLock.enablePageScroll
    },
    setInert(...args) {
        args.forEach(item => {
            item.setAttribute('inert', true);
        })
    },
    removeInert(...args) {
        args.forEach(item => {
            item.removeAttribute('inert');
        })
    },

    initModule(Module, selector) {
        if (!!selector) {
            let blocks = Array.prototype.slice.call(document.querySelectorAll(selector));
            blocks.forEach(block => {
                new Module(block);
            });
        } else {
            new Module();
        }
    },


    init() {
        app.initModule(Header, ".js-header");
        app.initModule(Carousel);
        app.initModule(Tabs);
        app.initModule(Modals);
        $('.js-form').each(formProcessing);

    },
};

window.addEventListener('DOMContentLoaded', app.init);
