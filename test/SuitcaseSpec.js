describe('The suitcase', function () {
  var Suitcase = require('../src/js/suitcase.js');
  var a = {name : 'car'};
  var b = {name : 'dog'};

  it('should be empty initially', function () {
    var sc = new Suitcase();
    expect(sc.isEmpty()).toBe(true);
  });

  it('shouldn\'t be empty when initialized', function () {
    var sc = new Suitcase();
    sc.set([a, b]);
    expect(sc.isEmpty()).toBe(false);
  });

  it('should be able to remember elements put into it', function () {
    var sc = new Suitcase();
    sc.set([a, b]);

    expect(sc.put(a)).toBe(true);
    expect(sc.put(b)).toBe(true);
    expect(sc.isDone()).toBe(true);
  });

  it('should tell incorrect values', function () {
    var sc = new Suitcase();
    sc.set([a, b]);

    expect(sc.put(b)).toBe(false);
  });

  it('should expect the same value', function () {
    var sc = new Suitcase();
    sc.set([a, b]);

    expect(sc.put(b)).toBe(false);
    expect(sc.put(b)).toBe(false);
    expect(sc.put(b)).toBe(false);
  });

  it('should be able to recover', function () {
    var sc = new Suitcase();
    sc.set([a, b]);

    expect(sc.put(b)).toBe(false);
    expect(sc.put(a)).toBe(true);
    expect(sc.put(b)).toBe(true);
    expect(sc.isDone()).toBe(true);
  });

  it('should only be done if all expected values were put', function () {
    var sc = new Suitcase();
    sc.set([a, b]);

    expect(sc.put(a)).toBe(true);
    expect(sc.isDone()).toBe(false);
    expect(sc.put(b)).toBe(true);
    expect(sc.isDone()).toBe(true);
  });

  it('should only be done if all expected values were put', function () {
    var sc = new Suitcase();
    sc.set([a, b]);

    expect(sc.put(b)).toBe(false);
    expect(sc.isDone()).toBe(false);
    expect(sc.put(a)).toBe(true);
    expect(sc.isDone()).toBe(false);
    expect(sc.put(a)).toBe(false);
    expect(sc.isDone()).toBe(false);
    expect(sc.put(b)).toBe(true);
    expect(sc.isDone()).toBe(true);
  });

  it('should yield false when hinting when done', function () {
    var sc = new Suitcase();
    sc.set([a, b]);

    expect(sc.put(a)).toBe(true);
    expect(sc.put(b)).toBe(true);
    expect(sc.isDone()).toBe(true);
    expect(sc.hint()).toBe(false);
  });

  it('should yield the correct values when hinting', function () {
    var sc = new Suitcase();
    var hint;

    hint = sc.hint();
    expect(hint).toBe(false);

    sc.set([a, b]);

    hint = sc.hint();
    expect(hint.name).toBe(a.name);

    expect(sc.put(a)).toBe(true);
    hint = sc.hint();
    expect(hint.name).toBe(b.name);

    expect(sc.put(b)).toBe(true);
    hint = sc.hint();
    expect(hint).toBe(false);
    expect(sc.isDone()).toBe(true);
  });

  it('should yield the correct values when hinting with numbers', function () {
    var sc = new Suitcase();
    var hint;

    hint = sc.hint(0);
    expect(hint).toBe(false);

    sc.set([a, b]);

    hint = sc.hint(0);
    expect(hint.name).toBe(a.name);
    hint = sc.hint(1);
    expect(hint.name).toBe(b.name);
    hint = sc.hint(2);
    expect(hint).toBe(false);
    expect(sc.isDone()).toBe(false);
  });

});
