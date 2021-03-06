'use strict'

define(['challenge/base', 'scoring/english_words', 'recode/strip_whitespace', 'decode/hex', 'encode/hex', 'recode/xor'],
  function(ChallengeBase, ScoreEnglishWords, StripWhitespace, DecodeHexString, EncodeHexString, DecodeXorStrings){

  function ChallengeXORBase(challenge_id){
    ChallengeBase.apply(this,arguments);
    this.scoreEnglish = new ScoreEnglishWords();
  }

  ChallengeXORBase.prototype = Object.create(ChallengeBase.prototype);

  ChallengeXORBase.prototype.readDataFile = function(){
  };

  ChallengeXORBase.prototype.setupInputEvent = function(){
    ChallengeBase.prototype.setupInputEvent.apply(this, arguments);
    this.setupScanButton();
  };

  ChallengeXORBase.prototype.setupScanButton = function(){
    var e = this.challengeElement();
    /* Get special form elements, assign auto button action. */
    var thisObj = this;
    e.find('.button-auto').click(function(event){
      event.preventDefault();
      thisObj.autoScan();
    });
  };

  ChallengeXORBase.prototype.compute = function(input_values){
    var input_data = this.decodeAllUsing(StripWhitespace, input_values[0]);
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

  ChallengeXORBase.prototype.autoScanData = function(input_data){
    var i, best_score = 0, best_key = null, best_output = null;
    /* Try all 8 bit keys... */
    for(i = 0; i < 256; i++){
      /* ... set inputs and run the challenge. */
      var output_values = this.compute([input_data, i]);
      /* ... score the output as english text, record results. */
      var score = this.scoreEnglish.getScore(output_values[1]);
      /* Log all scorer logs, and our test results. */
      this.log_messages = this.log_messages.concat(this.scoreEnglish.flushLog(false));
      this.progressLog("TEST: Key " + i + " scored " + score);
      if(best_score < score){
        best_output = output_values[1];
        best_score = score;
        best_key = i;
      }
    }
    return {
      best_output: best_output,
      input_data: input_data,
      best_key: best_key,
      best_score: best_score
    };
  };

  /**
   * Takes input data, returns best guess xor key.
   */
  ChallengeXORBase.prototype.autoScanGetResult = function(input_data){
    throw "Derived class should define autoScanGetResult().";
  };

  ChallengeXORBase.prototype.autoScan = function(){
    var e = this.challengeElement();
    var el = e.find('.input-field.xor-key');
    var input_data = e.find('.input-field:first').val();
    var original_bg = el.css('background-color');
    /* Get the result from the challenge class. */
    var result_value = this.autoScanGetResult(input_data);
    /* Set background to highlight, then set once handler to return it back. */
    el.
      css('background-color', 'yellow').
      val(result_value).
      one('change', function(){
        el.css('background-color', original_bg);
      });

  };

  return ChallengeXORBase;

});
