
var elemente = require('./elemente.json');
var calc = require('./calculator');

var summe = calc.mult(3, calc.sum(1, 5));

console.log(summe);
console.log('elemente:');
console.log(elemente);

