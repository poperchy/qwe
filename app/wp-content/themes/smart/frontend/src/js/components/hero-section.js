export default class heroSection {

    constructor(container) {
        this.container = container;
        this.isRun = false;

        this.configs = {
            starsSpeed: 30,
            rocketSpeed: 1.4,
            screenToStart: 1024,
        };

        this.scenes = [];

        this.svg = container.querySelector("[data-hero-svg]");
        this.stars = this.svg.querySelectorAll("[data-hero-stars] path");
        this.rocket = container.querySelector("[data-hero-rocket]");
        this.rocketFire = container.querySelector("[data-hero-fire='heat']");
        this.rocketFireHeat = container.querySelector("[data-hero-fire='heat']");
        this.svgBox = {
            width: this.svg.getAttribute('viewBox').split(' ')[2],
            height: this.svg.getAttribute('viewBox').split(' ')[3],
        };

        this.triggerFlight();

        window.addEventListener('resize', () => {
            this.triggerFlight();
        });
    }


    triggerFlight(){
        if(!this.isRun && document.body.clientWidth > this.configs.screenToStart){
            this.isRun = true;
            this.rocketFlight();
            this.starsFlight();

        } else if (this.isRun && !(document.body.clientWidth > this.configs.screenToStart)) {
            // todo: kill animation ??
            this.isRun = false;
            // this.scenes.forEach((timeline) => {
            //     timeline.kill();
            // });
            // this.scenes = [];
            gsap.globalTimeline.clear();
        }

    }

    rocketFlight(){
        let rocketTimeline = gsap.timeline({
            repeat: -1,
        });
        rocketTimeline.to(this.rocket, {
            duration: this.configs.rocketSpeed * 0.6,
            skewX: -8,
            rotate: -4,
            transformOrigin:"100% 100%"
        });
        rocketTimeline.to(this.rocket, {
            duration: this.configs.rocketSpeed * 0.4,
            skewX: 2,
            rotate: 1,
            transformOrigin:"100% 100%",
            'ease': Power1.easeOut
        });
        this.scenes.push(rocketTimeline);

        // gsap.to(this.rocketFire, {
        //     duration: this.configs.rocketSpeed / 2,
        //     scale: 0.9,
        //     transformOrigin:"top left",
        //     yoyo: true,
        //     repeat: -1,
        // });

        let rocketHeat = gsap.to(this.rocketFireHeat, {
            duration: this.configs.rocketSpeed / 2,
            opacity: 0.8,
            transformOrigin:"top left",
            yoyo: true,
            repeat:-1
        });

        this.scenes.push(rocketHeat);
    }

    starsFlight(){
        this.stars.forEach((star) => {

            let parts = star.getAttribute('d').split('c', 2);
            let specs = {
                x: parseFloat(parts[0].split(',')[0].substr(1)),
                y: parseFloat(parts[0].split(',')[1]),
                r: Math.abs( parseFloat(parts[1].split(',', 1)))
            };
            let speed = this.configs.starsSpeed * specs.r;
            let flyY = this.svgBox.height - specs.y;
            let flyX =  0.6 * flyY;

            let starTimeline = gsap.timeline({
                repeat: -1,
            });
            starTimeline.to(star,
                {
                    duration: flyY / speed,
                    y: flyY,
                    x: flyX,
                    ease: "none"
                });
            starTimeline.set(star,
                {
                    y: -specs.y,
                    x: -specs.y * 0.6,
                });
            starTimeline.to(star,
                {
                    duration: specs.y / speed,
                    y: 0,
                    x: 0,
                    ease: "none"
                });


            this.scenes.push(starTimeline);
        });
    }
}