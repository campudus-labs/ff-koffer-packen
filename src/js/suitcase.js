function Suitcase() {
  this.elements = [];
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
    return this.elements[this.correctElements + i];
  }
};

Suitcase.prototype.set = function (elements) {
  this.elements = elements;
  this.correctElements = 0;
  this.elementsCount = this.elements.length;
};

Suitcase.prototype.put = function (element) {
  if (element.name === this.elements[this.correctElements].name) {
    this.correctElements++;
    return true;
  } else {
    return false;
  }
};

module.exports = Suitcase;
