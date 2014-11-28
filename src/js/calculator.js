
// code...

function sumFn(a, b) {
  return a + b;
}

module.exports = {
  sum : sumFn,
  mult : function(a, b) {
    return a * b;
  },
  div : function(a, b) {
    return a / b;
  }
};
