'use strict';

function RecodeBase(original_data = ''){
  this.buffer = original_data;
}

RecodeBase.prototype.decodeAll = function(){
  var max_count = 999999;
  var all_data = this.nextByte(max_count);
  return all_data;
};

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
  var byte_value = this.buffer.charCodeAt(0);
  var hex_values = [
    this.lookup_hex_char(byte_value >> 4),
    this.lookup_hex_char(byte_value & 0x0f)
    ];
  this.buffer = this.buffer.slice(1)
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
  var byte_value = parseInt(this.buffer[0], 16) * 16 + parseInt(this.buffer[1], 16);
  byte_value = String.fromCharCode(byte_value)
  this.buffer = this.buffer.slice(2)
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
    this.buffer.charCodeAt(0),
    this.buffer.charCodeAt(1),
    this.buffer.charCodeAt(2),
    ];
  this.buffer = this.buffer.slice(3);
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

function DecodeXorStrings(original_data = ['', '']){
  RecodeBase.apply(this, arguments);
}

DecodeXorStrings.prototype = Object.create(RecodeBase.prototype);

DecodeXorStrings.prototype.nextByte = function(byte_count = 1){
  this.valid();
  /* base cases... */
  if(this.buffer[0].length == 0) return "";
  if(byte_count < 1) return "";
  /* Trim one byte off each buffer */
  var data_values = [
    this.buffer[0].charCodeAt(0),
    this.buffer[1].charCodeAt(0)
    ];
  this.buffer[0] = this.buffer[0].slice(1);
  this.buffer[1] = this.buffer[1].slice(1);
  /* Perform XOR. */
  var byte_value = (data_values[0] ^ data_values[1]);
  byte_value = String.fromCharCode(byte_value);
  /* Recurse for more data. */
  var return_value = byte_value + this.nextByte(byte_count - 1);
  return return_value;
};

DecodeXorStrings.prototype.valid = function(){
  if(this.buffer[0].length != this.buffer[1].length){
    throw "Invalid string lengths " + this.buffer[0].length +
      " and " + this.buffer[1].length + ".";
  }
  return true;
};
