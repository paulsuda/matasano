
function ChallengeBase(challenge_id){
  this.challenge_id = challenge_id;
  var thisObj = this;
  var e = this.challengeElement();
  /* Disable output display textfield by default. */
  e.find('.output-field').prop('disabled', true);
  /* Get the form element and hook submit events. */
  e.submit(function(event){
    event.preventDefault();
    thisObj.run();
    return false;
  });
}

ChallengeBase.prototype.run = function(){
  console.log('run() for ' + this.challenge_id);
  var e = this.challengeElement();
  var input_elem = e.find('.input-field');
  var output_elem = e.find('.output-field');
  input_elem.prop('disabled', true);
  var input_values = input_elem.map(function (i, elem) {
    return $(elem).val();
  });
  var o = this.compute(input_values);
  input_elem.prop('disabled', false);
  output_elem.val(o);
  return o;
};

ChallengeBase.prototype.challengeElement = function(){
  return $('#' + this.challenge_id);
};

ChallengeBase.prototype.setInputDefaults = function(default_values){
  var e = this.challengeElement();
  var input_elem = e.find('.input-field');
  return input_elem.map(function (i, elem) {
    return $(elem).val(default_values[i]);
  });
};
