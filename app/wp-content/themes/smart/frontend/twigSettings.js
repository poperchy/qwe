const createScript = function(url){
    return `<script src="${url}"></script>`;
};
const createStyles = function(url){
    return `<link rel="stylesheet" href="${url}" type="text/css" media="screen" />`;
};


module.exports = {
    data: require('./data.json'),
    functions: [
        {
            name: "_e",
            func: function (args) {
                return args;
            }
        },
        {
            name: "function",
            func: function (name) {
                let result = '';
                switch (name){
                    case 'wp_head':
                        result += createStyles('./styles/style.css');
                        break;
                    case 'wp_footer':
                        result += createScript('./js/libraries.js');
                        result += createScript('./js/scripts.js');
                        break;
                }

                return result;
            }
        }
    ],
    filters: [
        {
            name: "nameOfFilter",
            func: function (args) {
                return "the filter";
            }
        }
    ]
};