'use strict';

define(['recode/two_buffer_base'], function(TwoBufferRecodeBase){

  function ScoreHammingDistance(original_data = ['', '']){
    return TwoBufferRecodeBase.apply(this, arguments);
  }

  ScoreHammingDistance.prototype = Object.create(TwoBufferRecodeBase.prototype);

  /**
   * Returns an integer hamming distance.
   * 'this is a test' and 'wokka wokka!!!' return 37
   */
  ScoreHammingDistance.prototype.nextByte = function(byte_count = 1){
    this.valid();
    /* base cases... */
    if(this.buffer[0].length == 0) return 0;
    if(byte_count < 1) return 0;
    /* Trim one byte off each buffer */
    var data_values = this.chompByteCode();
    /* Perform XOR. */
    var xor_value = (data_values[0] ^ data_values[1]);
    var hamming_distance = 0;
    var i;
    for(i = 0; i < 8; i++){
      hamming_distance += (xor_value >> i) & 1
    }
    /* Recurse for more data. */
    var return_value = hamming_distance + this.nextByte(byte_count - 1);
    return return_value;
  };

  ScoreHammingDistance.prototype.valid = function(){
    return this.validateEqualBufferLength();
  };

  return ScoreHammingDistance;

});
