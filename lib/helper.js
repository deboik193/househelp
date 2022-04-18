// module.exports =  {
//     increaments: function (list, increase) {
//         return increase++
//     },
// }

var Handlebars = require('handlebars');

Handlebars.registerHelper("inc", function (value) {
    return parseInt(value) + 1;
});