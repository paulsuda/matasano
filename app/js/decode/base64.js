'use strict';

define(['recode/base'], function(RecodeBase){

  function DecodeBase64String(original_data = ''){
    RecodeBase.apply(this,arguments);
    this.base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  }

  DecodeBase64String.prototype = Object.create(RecodeBase.prototype);

  DecodeBase64String.prototype.map_base64_char = function(value){
    return this.base64map[value];
  };

  DecodeBase64String.prototype.nextByte = function(byte_count = 1){
    this.valid();
    /* base cases... */
    if((this.buffer.length == 0) || (byte_count < 1))
      return {data: '', remainder: 0};
    // var data_values = [
    //   this.chompByteCode(),
    //   this.chompByteCode(),
    //   this.chompByteCode(),
    //   ];
    // var return_values = [
    //   (data_values[0] & 0xfc) >> 2,   /* 6 bits */
    //   ((data_values[0] & 0x03) << 4) +  /* next 2 bits... */
    //     ((data_values[1] & 0xf0) >> 4), /* ...next 4 bits */
    //   ((data_values[1] & 0x0f) << 2) +  /* next 4 bits... */
    //     ((data_values[2] & 0xc0) >> 6),      /* ... next 2 bits */
    //   (data_values[2] & 0x3f)         /* next 6 bits */
    // ];
    // var return_value = this.integer_array_to_byte_string(return_values);
    // return_value = return_value + this.nextByte(byte_count - 1);
    next_value = this.nextByte(byte_count - 1)
    return_value = {data: next_value + };
    return return_value;
  };

  DecodeBase64String.prototype.integer_array_to_byte_string = function(integer_array){
    var thisObj = this;
    var char_array = _.map(integer_array, function(value, key){
      return thisObj.map_base64_char(value);
    });
    var char_string = char_array.join('');
    return char_string;
  };

  DecodeBase64String.prototype.valid = function(){
    var l = this.buffer.length
    if((l % 3) != 0){
      throw "Invalid base 64 string length " + l + "."
    }
    return true;
  };

  return DecodeBase64String;

});
