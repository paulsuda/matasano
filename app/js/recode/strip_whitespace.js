'use strict';

define(['recode/base'], function(RecodeBase){

  function StripWhitespace(original_data = ''){
    this.space_re = new RegExp('\\s');
    RecodeBase.apply(this,arguments);
  }

  StripWhitespace.prototype = Object.create(RecodeBase.prototype);

  StripWhitespace.prototype.valid = function(){
    return true;
  };

  StripWhitespace.prototype.nextByte = function(byte_count = 1){
    //TODO: probably much more efficient ways to do this.
    this.valid();
    /* base cases... */
    if(this.buffer.length == 0) return "";
    if(byte_count < 1) return "";
    /* Get this byte */
    var byte_value = this.chompByte();
    if(this.space_re.exec(byte_value)){
      byte_value = '';
    }
    /* recurse for the rest of the string... */
    var return_value = byte_value + this.nextByte(byte_count - 1);
    return return_value;
  };

  return StripWhitespace;
});
