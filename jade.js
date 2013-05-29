/**
 * Module deps
 */
var jade = require("jade")
  , path = require("path");

module.exports = function(builder) {
  builder.hook('before scripts', function(pkg){
    var templates = (pkg.config||pkg.conf).templates;
    if (!templates) return;

    templates.forEach(function(file){
      var ext = path.extname(file);
      if ("jade" != ext) return;

      var relativePath = path.relative(
        pkg.path(options.webroot),
        pkg.path(file)
      );

      var js = compile(
        read(pkg.path(file), 'utf8'),
        relativePath,
        options.module,
        nextLineEscape
      );
      var newFile = path.dirname(file)+"/"+path.basename(file, options.extension) + '.js';
      pkg.addFile('scripts', newFile, js);
    });
  });
};
