'use strict';

define(['challenge/base', 'recode/xor', 'encode/hex'], function(ChallengeBase, DecodeXorStrings, EncodeHexString){

  function Set1Challenge5(){
    ChallengeBase.apply(this,['set1challenge5']);
    this.setInputDefaults([
      "Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal",
      'ICE'
    ]);
    return this;
  }

  Set1Challenge5.prototype = Object.create(ChallengeBase.prototype);

  Set1Challenge5.prototype.compute = function(input_values){
    /* Alias func. */
    var dec = this.decodeAllUsing;
    /* Two string inputs. */
    var input_data_a = input_values[0];
    var input_data_b = input_values[1];
    /* If b is too short, repeat and trim to length. */
    var repeat_times = Math.ceil(input_data_a.length / input_data_b.length);
    input_data_b = input_data_b.repeat(repeat_times);
    input_data_b = input_data_b.slice(0, input_data_a.length);
    /* XOR */
    var decoded_data = dec(DecodeXorStrings, [input_data_a, input_data_b]);
    /* Encode as hex for output. */
    var encoder_output = dec(EncodeHexString, decoded_data);
    return encoder_output;
  };

  return Set1Challenge5;

});
