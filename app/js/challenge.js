
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
  try{
    var o = this.compute(input_values);
  }
  catch(err){
    console.log("Exception Caught");
    console.log(err);
    alert('Exception: ' + err);
    return '*ERROR*';
  }
  input_elem.prop('disabled', false);
  output_elem.val(o);
  return o;
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
