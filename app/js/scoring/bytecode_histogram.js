'use strict';

define(['recode/base', 'misc/histogram'], function(RecodeBase, Histogram){
  function BytecodeHistogram(original_data = ''){
    RecodeBase.apply(this, arguments);
    this.histogram = new Histogram(0, 255);
  }

  BytecodeHistogram.prototype = Object.create(RecodeBase.prototype);

  BytecodeHistogram.prototype.valid = function(){
    return true;
  };

  BytecodeHistogram.prototype.nextByte = function(byte_count = 1){
    this.valid();
    /* Base case */
    if(this.buffer.length == 0) return this.histogram;
    if(byte_count < 1) return this.histogram;
    /* Add this byte to the histogram. */
    var byteCode = this.chompByteCode();
    this.histogram.add_value(byteCode);
    /* Recurse for more data. */
    return this.nextByte(byte_count - 1);
  };

  return BytecodeHistogram;
});
