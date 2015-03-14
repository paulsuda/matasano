'use strict';

define(['jquery', 'foundation', 'challenge/1'], function(jQuery, foundation, Set1Challenge1){

	var app = (function(document, $) {
		// TODO, weird format here. Redo?
		var docElem = document.documentElement,
		  registeredChallenges = {},
			_userAgentInit = function() {
				docElem.setAttribute('data-useragent', navigator.userAgent);
			},
			_init = function() {
				$(document).foundation();
				_userAgentInit();
			},
			_switch_challenge = function(challenge_id) {
				$('.challenge').hide();
				var challenge_instance = registeredChallenges[challenge_id];
				if(!challenge_instance){
					alert('No challenge instance found for: ' + challenge_id);
					console.log(registeredChallenges);
				}
				else{
					var challenge_elem = challenge_instance.challengeElement();
					if(!challenge_elem.length){
						alert('No challenge element found for: ' + challenge_id);
					}
					else{
						challenge_elem.show();
					}
				}
			},
			_switch_challenge_by_state = function(){
				var hash = window.location.hash;
				hash = hash.substring(1);
				if(!hash) hash = 'set1challenge1';
				app.switch_challenge(hash);
			},
			_register_challenge = function(challenge_instance) {
				var challenge_id = challenge_instance.challenge_id;
				challenge_id = challenge_id.toLowerCase();
				registeredChallenges[challenge_id] = challenge_instance;
			},
			_challenge_get = function(challenge_id){
				return registeredChallenges[challenge_id];
			};
		return {
			init: _init,
			switch_challenge: _switch_challenge,
			register_challenge: _register_challenge,
			switch_challenge_by_state: _switch_challenge_by_state,
			challenge_get: _challenge_get
		};
	})(document, jQuery);

	app.register_challenge(new Set1Challenge1());

	window.onpopstate = function (event) {
		app.switch_challenge_by_state();
	};

	return app;
});
