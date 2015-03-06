'use strict';


app.register_challenge((function(){

  function Set1Challenge2(){
    ChallengeBase.apply(this,['set1challenge2']);
    this.setInputDefaults([
      '1c0111001f010100061a024b53535009181c',
      '686974207468652062756c6c277320657965'
    ]);
    return this;
  }

  Set1Challenge2.prototype = Object.create(ChallengeBase.prototype);

  Set1Challenge2.prototype.compute = function(input_values){
    var input_data_a = input_values[0];
    var input_data_b = input_values[1];
    var decoder_a = new DecodeHexString(input_data_a);
    var decoded_data_a = decoder_a.decodeAll();
    var decoder_b = new DecodeHexString(input_data_b);
    var decoded_data_b = decoder_b.decodeAll();
    var decoder_xor = new DecodeXorStrings([decoded_data_a, decoded_data_b]);
    var decoded_data = decoder_xor.decodeAll();
    var encoder = new EncodeHexString(decoded_data);
    var encoder_output = encoder.decodeAll();
    return encoder_output;
  };

  return new Set1Challenge2();
})());
