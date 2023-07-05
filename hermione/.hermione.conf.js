let baseUrl = 'http://site.localhost:8000';
let gridUrl = 'http://localhost:4444/wd/hub';

module.exports = {
    baseUrl: baseUrl,
    gridUrl: gridUrl,
    compositeImage: true,

    sets: {
        common: {
            files: 'tests/common'
        }
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
                acceptInsecureCerts: true
            },
            windowSize: '1440x5000',
            // screenshotDelay: 1000
        },
    },

    plugins: {
        'html-reporter/hermione': {
            enabled: true,
            path: 'my/hermione-reports',
            defaultView: 'all',
            baseHost: baseUrl,
            // errorPatterns: [
            //     'Parameter .* must be a string',
            //     {
            //         name: 'Cannot read property of undefined',
            //         pattern: 'Cannot read property .* of undefined',
            //         hint: '<div>google it, i dont know how to fix it =(</div>'
            //     }
            // ]
        }
    },
};