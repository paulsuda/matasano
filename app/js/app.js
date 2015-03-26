'use strict';

define(['text', 'jquery', 'foundation', 'challenge/1', 'challenge/2', 'challenge/3', 'challenge/4', 'challenge/5', 'challenge/6'],
  function(text, jQuery, foundation, Set1Challenge1, Set1Challenge2, Set1Challenge3, Set1Challenge4, Set1Challenge5, Set1Challenge6){

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
				var challenge_instance = registeredChallenges[challenge_id];
        var challenge_container = $('#challenge-content');
				if(!challenge_instance){
					alert('No challenge instance found for: ' + challenge_id);
				}
				else{
          challenge_container.html('<h1>loading...</h1>');
          var successCallback = function(partial_html){
            challenge_container.html(partial_html);
            challenge_instance.setupInputEvent();
          };
          var failCallback = function(err){
            console.log(err);
            alert('No content partial found for: ' + challenge_id);
            challenge_container.html('<h1 class="error">failed loading</h1>');
          };
          require(['text!/partials/' + challenge_id + '.html'],
            successCallback, failCallback);
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
	app.register_challenge(new Set1Challenge2());
	app.register_challenge(new Set1Challenge3());
	app.register_challenge(new Set1Challenge4());
	app.register_challenge(new Set1Challenge5());
	app.register_challenge(new Set1Challenge6());

	window.onpopstate = function (event) {
		app.switch_challenge_by_state();
	};

	return app;
});
