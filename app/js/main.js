'use strict';

// Start the main app logic.
requirejs(['jquery', 'app'], function($, app) {

	$(function() {
		app.init();
		app.switch_challenge_by_state();
	});

});
