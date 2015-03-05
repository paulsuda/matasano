'use strict';

function DecodeHexString(original_data = ''){
  this.buffer = original_data;
}

DecodeHexString.prototype.decodeAll = function(){
  var max_count = 99999;
  var all_data = this.nextByte(max_count);
  return all_data;
}

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

function EncodeBase64String(original_data = ''){
  this.buffer = original_data;
  this.base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
}

EncodeBase64String.prototype.decodeAll = function(){
  var max_count = 99999;
  var all_data = this.nextByte(max_count);
  return all_data;
};

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
  console.log('b64 data_values ');
  console.log(data_values);
  this.buffer = this.buffer.slice(3);
  var return_values = [
    (data_values[0] & 0xfc) >> 2,   /* 6 bits */
    ((data_values[0] & 0x03) << 4) +  /* next 2 bits... */
      ((data_values[1] & 0xf0) >> 4), /* ...next 4 bits */
    ((data_values[1] & 0x0f) << 2) +  /* next 4 bits... */
      ((data_values[2] & 0xc0) >> 6),      /* ... next 2 bits */
    (data_values[2] & 0x3f)         /* next 6 bits */
  ];
  console.log('b64 return values ');
  console.log(return_values);
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
}
String.fromCharCode

EncodeBase64String.prototype.valid = function(){
  var l = this.buffer.length
  if((l % 3) != 0){
    throw "Invalid base 64 string length " + l + "."
  }
  return true;
};

var set1challenge1 = (function($){
  var _compute = function(input_data){
    try{
      var decoder = new DecodeHexString(input_data);
      var decoded_data = decoder.decodeAll();
      var encoder = new EncodeBase64String(decoded_data);
      var encoder_output = encoder.decodeAll();
      return encoder_output;
    }
    catch(err){
      alert('Exception: ' + err);
      return '*ERROR*';
    }
  };

  var challengeID = '#part-1';
  var defaultInput = 'ffffff';
  var _challengeElement = function(){
    return $(challengeID);
  };
  var _run = function(){
    console.log('set1challenge1 run...');
    var e = _challengeElement();
    var inp = e.find('.input-field');
    var out = e.find('.output-field');
    out.val('working...');
    inp.prop('disabled', true);
    var i = inp.val();
    var o = _compute(i);
    console.log(o);
    inp.prop('disabled', false);
    out.val(o);
    return o;
  };
  var _init = function(){
    console.log('set1challenge1 init...');
    var e = _challengeElement();
    console.log(e)
    e.submit(function(event){
      event.preventDefault();
      console.log('submit')
      _run();
      return false;
    });
    e.find('.output-field').prop('disabled', true);
    return e.find('.input-field').val(defaultInput);
  };
  console.log('starting s1c1');
  $(_init);
})(jQuery);
