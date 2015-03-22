'use strict';

	    console.log('spec runner load');

require([
  'jquery',
  'jasmine',
	'boot',
  'jasmine-html',
],
function($, jasmine, jasmine_boot, jasmine_html) {
	var specs_list = [
		'spec/scoring/hamming_distance_spec',
  ];

  console.log('spec runner');

  require(specs_list, function(){
		window.onload();

		// var jasmineEnv = jasmine.getEnv();
		// jasmineEnv.updateInterval = 1000;
		//
		// var htmlReporter = new jasmine.HtmlReporter();
		// jasmineEnv.addReporter(htmlReporter);
		//
		// jasmineEnv.specFilter = function(spec) {
		// 	return htmlReporter.specFilter(spec);
		// };
		//
		// $(function () {
		// 	jasmine.getEnv().execute();
		// });
	});



});
