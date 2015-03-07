'use strict';


app.register_challenge((function(){

  function Set1Challenge4(){
    ChallengeBase.apply(this,['Set1Challenge4']);
    return this;
  }

  Set1Challenge4.prototype = Object.create(ChallengeBase.prototype);

  Set1Challenge4.prototype.compute = function(input_values){
    // var input_data = input_values[0];
    // var input_key = parseInt(input_values[1]);
    // if(input_key < 0 || input_key > 255){
    //   throw "Invalid key value " + input_key;
    // }
    // var decoded_data = this.decodeAllUsing(DecodeHexString, input_data);
    // /* Repeat key to match decoded data length. */
    // var key = String.fromCharCode(input_key).repeat(decoded_data.length)
    // var decrypted_data = this.decodeAllUsing(DecodeXorStrings, [decoded_data, key]);
    // var encoded_data = this.decodeAllUsing(EncodeHexString, decrypted_data);
    // return [encoded_data, decrypted_data];
  };

  return new Set1Challenge4();
})());
