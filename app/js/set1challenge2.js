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
    /* Alias func. */
    var dec = this.decodeAllUsing;
    /* Two hex inputs. */
    var input_data_a = input_values[0];
    var input_data_b = input_values[1];
    /* Decode hex to strings. */
    var decoded_data_a = dec(DecodeHexString, input_data_a);
    var decoded_data_b = dec(DecodeHexString, input_data_b);
    /* XOR */
    var decoded_data = dec(DecodeXorStrings, [decoded_data_a, decoded_data_b]);
    /* Encode as hex for output. */
    var encoder_output = dec(EncodeHexString, decoded_data);
    return encoder_output;
  };

  return new Set1Challenge2();
})());
