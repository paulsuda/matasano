'use strict';

define(['recode/base', 'misc/histogram'], function(RecodeBase, Histogram){
  function BytecodeHistogram(original_data = ['', '']){
    this.histogram = new Histogram(0, 255);
    return TwoBufferRecodeBase.apply(this, arguments);
  }

  BytecodeHistogram.prototype = Object.create(RecodeBase.prototype);

  BytecodeHistogram.prototype.nextByte = function(byte_count = 1){
    this.valid();
    if(this.buffer[0].length == 0) return 0;
    if(byte_count < 1) return 0;
    var byteCode = this.chompByteCode();
    this.histogram.add_value(byteCode);
    /* Recurse for more data. */
    var return_value = 1 + this.nextByte(byte_count - 1);
    return return_value;
  };  

  return BytecodeHistogram;
});
