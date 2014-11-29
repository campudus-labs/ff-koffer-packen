
var elements = require('./elements.json');
var calc = require('./calculator');

var summe = calc.mult(3, calc.sum(1, 5));

console.log(summe);
console.log('elements:');
console.log(elements);

