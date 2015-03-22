'use strict';

define(['underscore', 'recode/base'], function(_, RecodeBase){

  function TwoBufferRecodeBase(original_data = ['', '']){
    if(original_data.length == 2)
      return RecodeBase.apply(this,arguments);
    else
      throw "Original data must be 2 element array for TwoBufferRecodeBase.";
  }

  TwoBufferRecodeBase.prototype = Object.create(RecodeBase.prototype);

  TwoBufferRecodeBase.prototype.chompByte = function(){
    var byte_values = [this.buffer[0][0], this.buffer[1][0]];
    this.buffer[0] = this.buffer[0].slice(1);
    this.buffer[1] = this.buffer[1].slice(1);
    return byte_values;
  };

  TwoBufferRecodeBase.prototype.chompByteCode = function(){
    var bytes = this.chompByte();
    var byte_codes = _.map(bytes, function(item) {
      return item.charCodeAt(0);
    });
    return byte_codes;
  };

  TwoBufferRecodeBase.prototype.validateEqualBufferLength = function(){
    if(this.buffer[0].length != this.buffer[1].length){
      throw "Invalid string lengths " + this.buffer[0].length +
        " and " + this.buffer[1].length + ".";
    }
    return;
  }

    return TwoBufferRecodeBase;
});
