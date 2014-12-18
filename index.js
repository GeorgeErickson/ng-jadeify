var js_escape = require('js-string-escape');
var jade = require('jade');
var bt = require('browserify-through');

module.exports = bt({
  filter: function(fp) {
    return /\.jade$/.test(fp);
  },
  map: function(fp, data, done) {
    return jade.render(data, {
      filename: fp
    }, function(err, html) {
      return done(err, "module.exports = '" + (js_escape(html)) + "';\n");
    });
  }
});
