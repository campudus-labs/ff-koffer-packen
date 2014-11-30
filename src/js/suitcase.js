var elements = [];

function Suitcase() {
  this.correctElements = 0;
  this.elementsCount = 0;
}

Suitcase.prototype.isEmpty = function () {
  return this.elementsCount === 0;
};

Suitcase.prototype.isDone = function () {
  return this.correctElements === this.elementsCount;
};

Suitcase.prototype.hint = function (i) {
  i = i || 0;
  if (this.isDone() || this.correctElements + i >= this.elementsCount) {
    return false;
  } else {
    return elements[this.correctElements + i];
  }
};

Suitcase.prototype.set = function (list) {
  elements = list;
  this.correctElements = 0;
  this.elementsCount = elements.length;
};

Suitcase.prototype.put = function (element) {
  if (element.name === elements[this.correctElements].name) {
    this.correctElements++;
    return true;
  } else {
    return false;
  }
};

module.exports = Suitcase;
