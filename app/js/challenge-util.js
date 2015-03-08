
function ChallengeXORBase(challenge_id){
  ChallengeBase.apply(this,arguments);
  this.setupScanButton();
  this.scoreEnglish = new ScoreEnglish();
}

ChallengeXORBase.prototype = Object.create(ChallengeBase.prototype);

ChallengeXORBase.prototype.readDataFile = function(){

};

ChallengeXORBase.prototype.setupScanButton = function(){
  var e = this.challengeElement();
  /* Get special form elements, assign auto button action. */
  var thisObj = this;
  e.find('.button-auto').click(function(){
    thisObj.autoScan();
  });
};

ChallengeXORBase.prototype.compute = function(input_values){
  var input_data = input_values[0];
  var input_key = parseInt(input_values[1]);
  if(input_key < 0 || input_key > 255){
    throw "Invalid key value " + input_key;
  }
  var decoded_data = this.decodeAllUsing(DecodeHexString, input_data);
  /* Repeat key to match decoded data length. */
  var key = String.fromCharCode(input_key).repeat(decoded_data.length)
  var decrypted_data = this.decodeAllUsing(DecodeXorStrings, [decoded_data, key]);
  var encoded_data = this.decodeAllUsing(EncodeHexString, decrypted_data);
  return [encoded_data, decrypted_data];
};

ChallengeXORBase.prototype.autoScan = function(){
  var e = this.challengeElement();
  var i, best_score = 0, best_key = null, el = e.find('.input-field.xor-key');
  //el.prop('disabled', true);
  var input_data = this.challengeElement().find('.input-field:first').val();
  /* Try all 8 bit keys... */
  for(i = 0; i < 256; i++){
    /* ... set inputs and run the challenge. */
    var output_values = this.compute([input_data, i]);
    /* ... score the output as english text, record results. */
    var score = this.scoreEnglish.getScore(output_values[1]);
    /* Log all scorer logs, and our test results. */
    this.log_messages = this.log_messages.concat(this.scoreEnglish.flushLog());
    this.progressLog("TEST: Key " + i + " scored " + score);
    if(best_score < score){
      best_score = score;
      best_key = i;
    }
  }
  //el.prop('disabled', false);
  this.progressLog("RESULT: Best key " + best_key + " scored " + best_score);
  el.val(best_key);
};
