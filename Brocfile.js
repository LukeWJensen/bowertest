//Import some Broccoli plugins

var injectLivereload = require('broccoli-inject-livereload');
var uglifyJavaScript = require('broccoli-uglify-js');
var compileSass = require('broccoli-sass');
var filterCoffeeScript = require('broccoli-coffee');
var mergeTrees = require('broccoli-merge-trees');
var vulcanize = require('broccoli-vulcanize-html-imports');

// Specify the Sass and Coffeescript directories
var public = injectLivereload('dist');
var sassDir = 'app/scss';
var coffeeDir = 'app/coffeescript';
var templatelDir = 'app/templates';

var vulcanizeOptions = {
    extensions: ['html', 'hbs'],
    outputFile: 'index.html',
    overwrite: false,
    excludes: [/^data:/, /^http[s]?:/, /^\//],
    abspath: '/Users/lukejensen/Sites/bowertest.com/',
    stripExcludes: false,
    stripComments: true,
    inlineScripts: false,
    inlineCss: false,
    implicitStrip: false
};

var uglifyJsOptions = {
    mangle: false,
};




// Tell Broccoli how we want the assets to be compiled
var styles = compileSass([sassDir], 'app.scss', 'app.css');
var coffeeScripts = filterCoffeeScript(coffeeDir);
var scripts = uglifyJavaScript(coffeeScripts, uglifyJsOptions);
var templates = vulcanize(templatelDir, vulcanizeOptions);


// Merge the compiled styles and scripts into one output directory.
module.exports = mergeTrees([styles, scripts, templates]);