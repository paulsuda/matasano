
function ChallengeBase(challenge_id){
  this.challenge_id = challenge_id;
}

ChallengeBase.prototype.run = function(){
  console.log('run() for ' + this.challenge_id);
  var e = this.challengeElement();
  var input_elem = e.find('.input-field');
  var output_elem = e.find('.output-field');
  input_elem.prop('disabled', true);
  var input_values = input_elem.map(function (i, elem) {
    console.log('elem');
    console.log(elem);
    console.log($(elem).val());
    return $(elem).val();
  });
  console.log('values');console.log(input_values);
  var o = this.compute(input_values);
  input_elem.prop('disabled', false);
  output_elem.val(o);
  return o;
};

ChallengeBase.prototype.challengeElement = function(){
  return $('#' + this.challenge_id);
};
