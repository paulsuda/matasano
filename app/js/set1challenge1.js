'use strict';

var set1challenge1 = (function($){
  var _compute = function(i){
    return i + 'test';
  };

  var challengeID = '#part-1';
  var defaultInput = 'def';
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
