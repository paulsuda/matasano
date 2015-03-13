'use strict';

console.log('main.js');

requirejs.config({

    //By default load any module IDs from js/lib
    baseUrl: 'js',

    paths: {
			'underscore': '../bower_components/underscore/underscore',
      'jquery': '../bower_components/jquery/dist/jquery',
			'jquery.cookie': '../bower_components/jquery.cookie/jquery.cookie',
			'fastclick': '../bower_components/fastclick/lib/fastclick',
			/* Foundation stuff, from http://foundation.zurb.com/forum/posts/18248-requirejs-with-foundation-5 */
			"foundation": '../bower_components/foundation/js/foundation',
	    "foundation.abide": '../bower_components/foundation/js/foundation/foundation.abide',
	    "foundation.accordion": '../bower_components/foundation/js/foundation/foundation.accordion',
	    "foundation.alert": '../bower_components/foundation/js/foundation/foundation.alert',
	    "foundation.clearing": '../bower_components/foundation/js/foundation/foundation.clearing',
	    "foundation.dropdown": '../bower_components/foundation/js/foundation/foundation.dropdown',
	    "foundation.equalizer": '../bower_components/foundation/js/foundation/foundation.equalizer',
	    "foundation.interchange": '../bower_components/foundation/js/foundation/foundation.interchange',
	    "foundation.joyride": '../bower_components/foundation/js/foundation/foundation.joyride',
	    "foundation.magellan": '../bower_components/foundation/js/foundation/foundation.magellan',
	    "foundation.offcanvas": '../bower_components/foundation/js/foundation/foundation.offcanvas',
	    "foundation.orbit": '../bower_components/foundation/js/foundation/foundation.orbit',
	    "foundation.reveal": '../bower_components/foundation/js/foundation/foundation.reveal',
	    "foundation.slider": '../bower_components/foundation/js/foundation/foundation.slider',
	    "foundation.tab": '../bower_components/foundation/js/foundation/foundation.tab',
	    "foundation.toolbar": '../bower_components/foundation/js/foundation/foundation.toolbar',
	    "foundation.topbar": '../bower_components/foundation/js/foundation/foundation.topbar'
    },
		shim: {
			"jquery.cookie": ['jquery'],
			"foundation": ['jquery', 'fastclick'],
			/* Foundation stuff, from http://foundation.zurb.com/forum/posts/18248-requirejs-with-foundation-5 */
			"foundation.abide": ['foundation'],
			"foundation.accordion": ['foundation'],
			"foundation.alert": ['foundation'],
			"foundation.clearing": ['foundation'],
			"foundation.dropdown": ['foundation'],
			"foundation.equalizer": ['foundation'],
			"foundation.interchange": ['foundation'],
			"foundation.joyride": ['foundation', 'jquery.cookie'],
			"foundation.magellan": ['foundation'],
			"foundation.offcanvas": ['foundation'],
			"foundation.orbit": ['foundation'],
			"foundation.reveal": ['foundation'],
			"foundation.slider": ['foundation'],
			"foundation.tab": ['foundation'],
			"foundation.toolbar": ['foundation'],
			"foundation.topbar": ['foundation']
		}
});

// Start the main app logic.
requirejs(['jquery', 'app'], function($, app) {

	$(function() {
		console.log('jq init');
		app.init();
		app.switch_challenge_by_state();
	});

});
