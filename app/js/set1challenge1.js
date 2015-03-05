'use strict';


var set1challenge1 = (function($){



  function Set1Challenge1(){
    var defaultInput = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';
    var thisObj = this;
    ChallengeBase.apply(this,['set1challenge1']);
    console.log('set1challenge1 init...');
    /* Get the form element and hook submit events. */
    var e = this.challengeElement();
    console.log(e)
    e.submit(function(event){
      event.preventDefault();
      console.log('submit')
      thisObj.run();
      return false;
    });
    /* Disable output display textfield by default. */
    e.find('.output-field').prop('disabled', true);
    return e.find('.input-field').val(defaultInput);
  }

  Set1Challenge1.prototype = Object.create(ChallengeBase.prototype);

  Set1Challenge1.prototype.compute = function(input_values){
    var input_data = input_values[0];
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

  var c = new Set1Challenge1();
  console.log('starting s1c1');
  console.log(c);
  $(_init);
})(jQuery);
