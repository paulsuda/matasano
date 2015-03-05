'use strict';

var app = (function(document, $) {
	var docElem = document.documentElement,
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {
			$(document).foundation();
			_userAgentInit();
		},
		_switch_challenge = function(challenge_id) {
			$('.challenge').hide();
			var challenge_elem = $('#' + challenge_id);
			if(challenge_elem.length){
				challenge_elem.show();
			}
			else{
				alert('No challenge found for: ' + challenge_id);
			}
		};
	return {
		init: _init,
		switch_challenge: _switch_challenge
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
