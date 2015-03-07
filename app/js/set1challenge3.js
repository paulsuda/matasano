'use strict';


app.register_challenge((function(){

  function Set1Challenge3(){
    ChallengeBase.apply(this,['set1challenge3']);
    this.setInputDefaults([
      '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'
    ]);
    return this;
  }

  Set1Challenge3.prototype = Object.create(ChallengeBase.prototype);

  Set1Challenge3.prototype.compute = function(input_values){
    var input_data = input_values[0];
    var decoded_data = this.decodeAllUsing(DecodeHexString, input_data);
    /****/
    
    var encoded_data = this.decodeAllUsing(EncodeHexString, decoded_data);
    return encoded_data;
  };

  return new Set1Challenge3();
})());
