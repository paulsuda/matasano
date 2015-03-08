'use strict';

app.register_challenge((function(){

  function Set1Challenge6(){
    ChallengeBase.apply(this,['set1challenge6']);
    var defaultStartKey = 'ICE';
    var thisObj = this;
    this.setInputDefaults([
      'loading...',
      defaultStartKey
    ]);
    $.get('/example_data/set1challenge6.txt', function(input_data){
      /* Set defaults from file input. */
      thisObj.setInputDefaults([
        input_data,
        defaultStartKey
      ]);
    });
    return this;
  }

  Set1Challenge6.prototype = Object.create(ChallengeBase.prototype);

  Set1Challenge6.prototype.compute = function(input_values){
    input_values = [
      'this is a test',
      'wokka wokka!!!'
    ];
    var encoder_output = this.decodeAllUsing(HammingDistance, input_values);
    return encoder_output;
  };

  return new Set1Challenge6();
})());
