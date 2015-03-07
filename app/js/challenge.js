
function ChallengeBase(challenge_id){
  this.challenge_id = challenge_id;
  this.last_defaults = [];
  var thisObj = this;
  var e = this.challengeElement();
  /* Disable output display textfield by default. */
  e.find('.output-field').prop('disabled', true);
  /* Get the form element and hook submit events. */
  e.submit(function(event){
    event.preventDefault();
    thisObj.runChallenge();
    return false;
  });
}

ChallengeBase.prototype.runChallenge = function(){
  console.log('runChallenge() for ' + this.challenge_id);
  var e = this.challengeElement();
  var input_elem = e.find('.input-field');
  var output_elem = e.find('.output-field');
  var output_values = null;
  /* Disable input while computing. */
  input_elem.prop('disabled', true);
  /* Get all of our inputs as an ordered list. */
  var input_values = input_elem.map(function (i, elem) {
    return $(elem).val();
  });
  try{
    /* Try to compute, with exception handling. */
    output_values = this.compute(input_values);
  }
  catch(err){
    console.log("Exception Caught");
    console.log(err);
    alert('Exception: ' + err);
    return '*ERROR*';
  }
  /* Some things don't return a list of output values, so we have to make it one. */
  if(!(output_values instanceof Array)){
    output_values = [output_values];
  }
  /* Set output */
  output_elem.map(function (i, elem) {
    return $(elem).val(output_values[i]);
  });
  /* Re enable input. */
  input_elem.prop('disabled', false);
  return output_values;
};

ChallengeBase.prototype.challengeElement = function(){
  return $('#' + this.challenge_id);
};

ChallengeBase.prototype.decodeAllUsing = function(decoderClass, input_data){
  var decoder = new decoderClass(input_data);
  var decoded_data = decoder.decodeAll();
  return decoded_data;
};

ChallengeBase.prototype.setInputDefaults = function(default_values){
  this.last_defaults = default_values;
  var e = this.challengeElement();
  var input_elem = e.find('.input-field');
  return input_elem.map(function (i, elem) {
    return $(elem).val(default_values[i]);
  });
};
