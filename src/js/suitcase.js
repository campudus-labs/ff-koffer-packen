function Suitcase() {
  this.elements = [];
  this.correctElements = 0;
  this.elementsCount = 0;
}

Suitcase.prototype.isEmpty = function () {
  return true;
};

Suitcase.prototype.isDone = function () {
  return false;
};

Suitcase.prototype.hint = function() {
  return this.elements[this.correctElements];
};

Suitcase.prototype.set = function (elements) {
  this.elements = elements;
  this.correctElements = 0;
  this.elementsCount = this.elements.length;
};

Suitcase.prototype.put = function (element) {
  return false;
};

module.exports = Suitcase;
