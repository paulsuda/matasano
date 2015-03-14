'use strict';

define([], function(){

  function RecodeBase(original_data = ''){
    this.buffer = original_data;
  }

  /**
   * Decode the whole buffer into a return string.
   */
  RecodeBase.prototype.decodeAll = function(){
    /* Set a big number for max to recurse by.  */
    var max_count = 999999;
    /* Call nextByte which will recursively bulid a string */
    var all_data = this.nextByte(max_count);
    return all_data;
  };

  /**
   * Decode the next chunk of output, usually a byte, of output.
   */
  RecodeBase.prototype.nextByte = function(){
    throw "Function nextByte() needs to be defined by some derived class.";
  };

  /**
   * Test validity of buffer. Should always return true or throw an exception
   * if the data doesn't fit a valid format.
   */
  RecodeBase.prototype.valid = function(){
    throw "Function valid() needs to be defined by some derived class.";
  };

  RecodeBase.prototype.chompByte = function(){
    var byte_value = this.buffer[0];
    this.buffer = this.buffer.slice(1);
    return byte_value;
  };

  RecodeBase.prototype.chompByteCode = function(){
    var byte_code = this.chompByte().charCodeAt(0);
    return byte_code;
  };

  return RecodeBase;
});
