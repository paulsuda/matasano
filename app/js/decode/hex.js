'use strict';

define(['recode/base'], function(RecodeBase){

  function DecodeHexString(original_data = ''){
    RecodeBase.apply(this,arguments);
  }

  DecodeHexString.prototype = Object.create(RecodeBase.prototype);

  DecodeHexString.prototype.nextByte = function(byte_count = 1){
    this.valid();
    /* base cases... */
    if(this.buffer.length == 0) return "";
    if(byte_count < 1) return "";
    /* this byte... */
    var byte_value = parseInt(this.chompByte(), 16) * 16 + parseInt(this.chompByte(), 16);
    byte_value = String.fromCharCode(byte_value)
    /* recurse for the rest of the string... */
    var return_value = byte_value + this.nextByte(byte_count - 1)
    return return_value;
  };

  DecodeHexString.prototype.valid = function(){
    var l = this.buffer.length
    if((l % 2) != 0){
      throw "Invalid base hex string length " + l + "."
    }
    return true;
  };

  return DecodeHexString;

});
