'use strict';

// Getting requirejs and jasmine to work together is not easy.
// http://stackoverflow.com/questions/19240302/does-jasmine-2-0-really-not-work-with-require-js

require([
  'jquery',
  'jasmine',
	'boot',
  'jasmine-html',
],
function($, jasmine, jasmine_boot, jasmine_html) {
	var specs_list = [
		'spec/scoring/hamming_distance_spec',
    'spec/scoring/english_words_spec',
    'spec/recode/chunk_by_stride_spec',
    'spec/misc/histogram_spec',
  ];

  require(specs_list, function(){
		window.onload();
	});

});
