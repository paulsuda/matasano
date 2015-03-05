'use strict';

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

  var challengeID = '#set1challenge1';
  var defaultInput = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';
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
