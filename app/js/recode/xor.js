'use strict';

define(['recode/two_buffer_base'], function(TwoBufferRecodeBase){

  function DecodeXorStrings(original_data = ['', '']){
    return TwoBufferRecodeBase.apply(this, arguments);
  }

  DecodeXorStrings.prototype = Object.create(TwoBufferRecodeBase.prototype);

  DecodeXorStrings.prototype.nextByte = function(byte_count = 1){
    this.valid();
    /* base cases... */
    if(this.buffer[0].length == 0) return "";
    if(byte_count < 1) return "";
    /* Trim one byte off each buffer */
    var data_values = this.chompByteCode();
    /* Perform XOR. */
    var byte_value = (data_values[0] ^ data_values[1]);
    byte_value = String.fromCharCode(byte_value);
    /* Recurse for more data. */
    var return_value = byte_value + this.nextByte(byte_count - 1);
    return return_value;
  };

  DecodeXorStrings.prototype.valid = function(){
    return this.validateEqualBufferLength();
  };

  return DecodeXorStrings;

});
