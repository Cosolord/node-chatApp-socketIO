var moment = require('moment');

console.log("Oggi è " + moment().locale('it').format('dddd') + " " + moment().locale('it').format('DD MMMM YYYY') + " e sono le ore " + moment().format('h:mm:ss a'));
