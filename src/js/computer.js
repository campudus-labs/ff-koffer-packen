
var elementCount = require('./elemente.json');

function shuffleInputElements(elementCount) {

  var current, random;

  for( var i = 0; i <= elementCount.length; i++  ){

      random = Math.floor(Math.random() * elementCount.length);
      current = elementCount[i];
      elementCount[i] = elementCount[random];
      elementCount[random] = current;

  }

  return current; // array
}

module.exports = {
  shuffle : shuffleInputElements
};
