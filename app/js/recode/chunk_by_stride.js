'use strict';

define(['recode/base'], function(RecodeBase){

  function ChunkByStride(original_data = '', stride_length = 2){
    this.stride_length = stride_length;
    RecodeBase.apply(this,arguments);
  }

  ChunkByStride.prototype = Object.create(RecodeBase.prototype);

  ChunkByStride.prototype.valid = function(){
    return (this.buffer.length % this.stride_length) == 0;
  };

  ChunkByStride.prototype.nextByte = function(byte_count = 1){
    var i;
    var chunks = [];
    this.valid();
    /* base cases... */
    if((this.buffer.length == 0) || (byte_count < 1)){
      return this.baseCase()
    }
    /* Get this set of bytes */
    for(i = 0; i < this.stride_length; i++){
      chunks[i] = this.chompByte();
    }
    /* recurse for the rest of the string... */
    var nextChunks = this.nextByte(byte_count - this.stride_length);
    return this.concatChunks(chunks, nextChunks);
  };

  ChunkByStride.prototype.baseCase = function(){
    var a = [this.stride_length];
    var i;
    for(i = 0; i < this.stride_length; i++){
      a[i] = "";
    }
    return a;
  };

  ChunkByStride.prototype.concatChunks = function(chunk_set_a, chunk_set_b){
    var i;
    var length = chunk_set_a.length;
    for(i = 0; i < length; i++){
      chunk_set_a[i] += chunk_set_b[i];
    }
    return chunk_set_a;
  };

  return ChunkByStride;
});
