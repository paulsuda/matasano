'use strict';

define(['recode/base'], function(RecodeBase){

  function EncodeHexString(original_data = ''){
    RecodeBase.apply(this,arguments);
  }

  EncodeHexString.prototype = Object.create(RecodeBase.prototype);

  EncodeHexString.prototype.lookup_hex_char = function(value){
    var char_list = '0123456789abcdef';
    return char_list[value];
  };

  EncodeHexString.prototype.nextByte = function(byte_count = 1){
    this.valid();
    /* base cases... */
    if(this.buffer.length == 0) return "";
    if(byte_count < 1) return "";
    /* Get this byte */
    var byte_value = this.chompByteCode();
    var hex_values = [
      this.lookup_hex_char(byte_value >> 4),
      this.lookup_hex_char(byte_value & 0x0f)
      ];
    /* recurse for the rest of the string... */
    var return_value = hex_values.join('') + this.nextByte(byte_count - 1)
    return return_value;
  };

  EncodeHexString.prototype.valid = function(){
    return true;
  };

  return EncodeHexString;

});
