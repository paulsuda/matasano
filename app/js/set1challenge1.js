'use strict';

app.register_challenge((function(){

  function Set1Challenge1(){
    ChallengeBase.apply(this,['set1challenge1']);
    this.setInputDefaults([
      '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d'
    ]);
    return this;
  }

  Set1Challenge1.prototype = Object.create(ChallengeBase.prototype);

  /* Decode hex to a byte string, then recode as base 64 output. */
  Set1Challenge1.prototype.compute = function(input_values){
    var input_data = input_values[0];
    var decoded_data = this.decodeAllUsing(DecodeHexString, input_data);
    var encoder_output = this.decodeAllUsing(EncodeBase64String, decoded_data);
    return encoder_output;
  };

  return new Set1Challenge1();
})());
