'use strict';

var app = (function(document, $) {
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
		_register_challenge = function(challenge_instance) {
			var challenge_id = challenge_instance.challenge_id;
			registeredChallenges[challenge_id] = challenge_instance;
		};
	return {
		init: _init,
		switch_challenge: _switch_challenge,
		register_challenge: _register_challenge
	};
})(document, jQuery);

(function() {
	app.init();
})();


window.onpopstate = function (event) {
	var hash = window.location.hash;
	hash = hash.substring(1);
	if(!hash) hash = 'set1challenge1';
	app.switch_challenge(hash);
};
