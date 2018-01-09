module.exports = {
  last7Days: function() {
    var result = [];
    for (var i = 0; i < 7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      result.push(d);
    }
    return result;
  }
};
