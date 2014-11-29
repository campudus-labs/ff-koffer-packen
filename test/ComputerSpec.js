describe('The computer-shuffle of elements', function () {

  var computer = require('../src/js/computer');

  it('should take as much elements as expected', function () {
    expect(computer.shuffle(3).length).toBe(3);
  });

  it('should never take more elements than we have in elements', function () {
    var elements = require('../src/js/elemente.json');

    expect(computer.shuffle(elements.length + 5).length).toBe(elements.length);
  });

  it('should not have duplicates', function () {
    var elements = computer.shuffle(100);
    elements.forEach(function (elem, idx) {
      expect(elements.filter(function(e) {
        return elem.name === e.name;
      }).length).toBe(1);
    })
  });

});
