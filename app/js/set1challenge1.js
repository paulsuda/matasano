'use strict';


app.register_challenge((function($){

  function Set1Challenge1(){
    ChallengeBase.apply(this,['set1challenge1']);
    this.setInputDefaults([
      '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d'
    ]);
    return this;
  }

  Set1Challenge1.prototype = Object.create(ChallengeBase.prototype);

  Set1Challenge1.prototype.compute = function(input_values){
    var input_data = input_values[0];
    try{
      var decoder = new DecodeHexString(input_data);
      var decoded_data = decoder.decodeAll();
      var encoder = new EncodeBase64String(decoded_data);
      var encoder_output = encoder.decodeAll();
      return encoder_output;
    }
    catch(err){
      alert('Exception: ' + err);
      return '*ERROR*';
    }
  };

  return new Set1Challenge1();
})(jQuery));
