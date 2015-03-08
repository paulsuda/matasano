'use strict';

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
  // return true;
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


///////////////

function TwoBufferRecodeBase(original_data = ['', '']){
  if((original_data instanceof Array) && original_data.length == 2)
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


///////////////

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

///////////////

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

///////////////


function EncodeBase64String(original_data = ''){
  RecodeBase.apply(this,arguments);
  this.base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
}

EncodeBase64String.prototype = Object.create(RecodeBase.prototype);


EncodeBase64String.prototype.map_base64_char = function(value){
  return this.base64map[value];
};

EncodeBase64String.prototype.nextByte = function(byte_count = 1){
  this.valid();
  /* base cases... */
  if(this.buffer.length == 0) return "";
  if(byte_count < 1) return "";
  var data_values = [
    this.chompByteCode(),
    this.chompByteCode(),
    this.chompByteCode(),
    ];
  var return_values = [
    (data_values[0] & 0xfc) >> 2,   /* 6 bits */
    ((data_values[0] & 0x03) << 4) +  /* next 2 bits... */
      ((data_values[1] & 0xf0) >> 4), /* ...next 4 bits */
    ((data_values[1] & 0x0f) << 2) +  /* next 4 bits... */
      ((data_values[2] & 0xc0) >> 6),      /* ... next 2 bits */
    (data_values[2] & 0x3f)         /* next 6 bits */
  ];
  var return_value = this.integer_array_to_byte_string(return_values);
  return_value = return_value + this.nextByte(byte_count - 1);
  return return_value;
};

EncodeBase64String.prototype.integer_array_to_byte_string = function(integer_array){
  var thisObj = this;
  var char_array = _.map(integer_array, function(value, key){
    return thisObj.map_base64_char(value);
  });
  var char_string = char_array.join('');
  return char_string;
};

EncodeBase64String.prototype.valid = function(){
  var l = this.buffer.length
  if((l % 3) != 0){
    throw "Invalid base 64 string length " + l + "."
  }
  return true;
};


///////////////

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

///////////////

function HammingDistance(original_data = ['', '']){
  return TwoBufferRecodeBase.apply(this, arguments);
}

HammingDistance.prototype = Object.create(TwoBufferRecodeBase.prototype);

/**
 * Returns an integer hamming distance.
 * 'this is a test' and 'wokka wokka!!!' return 37
 */
HammingDistance.prototype.nextByte = function(byte_count = 1){
  this.valid();
  /* base cases... */
  if(this.buffer[0].length == 0) return 0;
  if(byte_count < 1) return 0;
  /* Trim one byte off each buffer */
  var data_values = this.chompByteCode();
  /* Perform XOR. */
  var xor_value = (data_values[0] ^ data_values[1]);
  var hamming_distance = 0;
  var i;
  for(i = 0; i < 8; i++){
    hamming_distance += (xor_value >> i) & 1
  }
  /* Recurse for more data. */
  var return_value = hamming_distance + this.nextByte(byte_count - 1);
  return return_value;
};

HammingDistance.prototype.valid = function(){
  return this.validateEqualBufferLength();
};

///////////////

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
