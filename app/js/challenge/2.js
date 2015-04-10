'use strict';

define(['challenge/base', 'decode/hex', 'recode/xor', 'encode/hex'],
  function(ChallengeBase, DecodeHexString, DecodeXorStrings, EncodeHexString){

  function Challenge2(){
    ChallengeBase.apply(this,['2']);
    this.setInputDefaults([
      '1c0111001f010100061a024b53535009181c',
      '686974207468652062756c6c277320657965'
    ]);
    return this;
  }

  Challenge2.prototype = Object.create(ChallengeBase.prototype);

  Challenge2.prototype.compute = function(input_values){
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

  return Challenge2;

});
