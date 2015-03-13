'use strict';

app.register_challenge((function(){

  function Set1Challenge6(){
    ChallengeBase.apply(this,['set1challenge6']);
    this.setInputDefaults([
      'this is a test',
      'wokka wokka!!!'
    ]);
    return this;
  }

  Set1Challenge6.prototype = Object.create(ChallengeBase.prototype);

  Set1Challenge6.prototype.compute = function(input_values){
    console.log(input_values);
    var encoder_output = this.decodeAllUsing(HammingDistance, input_values);
    return encoder_output;
  };

  return new Set1Challenge6();
})());
