//Import some Broccoli plugins

var injectLivereload = require('broccoli-inject-livereload');
var concat = require('broccoli-concat');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var uglifyJs = require('broccoli-uglify-js');
var compileSass = require('broccoli-sass');
var filterCoffeeScript = require('broccoli-coffee');

// Specify the Sass and Coffeescript directories
var projectFiles = 'app';
var public = injectLivereload('dist');
var sassFiles = new Funnel(projectFiles, {srcDir:'scss'});
var coffeeFiles = new Funnel(projectFiles, {srcDir:'coffeescript'});
var templateFiles = new Funnel( projectFiles, {srcDir:'templates'});



//js
var appJS = concat(projectFiles, {
  inputFiles : ['coffeeScript/**/*.coffee'],
  outputFile : '/app.coffee',
  //header     : '/** Concatenated coffeescript to be compiled to javascript **/'
  }
);
var appJS = filterCoffeeScript(appJS);
var uglifyJsOptions = {
  mangle: false,
};
var appJS = uglifyJs(appJS, uglifyJsOptions);




// Sass
var styles = compileSass([sassFiles], 'app.scss', 'app.css');


//html


// Merge the compiled styles and scripts into one output directory.
module.exports = mergeTrees([styles, appJS, templateFiles]);
