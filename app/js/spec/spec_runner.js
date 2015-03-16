'use strict';

require([
  'jquery',
  'jasmine',
  'jasmine-html',
  'jasmine-jquery',

  'spec/scoring/hamming_distance_spec',
],
function($, jasmine) {

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  $(function () {
    jasmine.getEnv().execute();
  });

});
