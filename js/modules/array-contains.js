module.exports = function(a, obj){
  for (var i = 0; i < a.length; i++) {
    if (a[i] === obj) {
        return true;
    }
  }
  return false;
};