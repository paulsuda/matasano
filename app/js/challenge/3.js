'use strict';

define(['challenge/xor_base'], function(ChallengeXORBase){

  function Challenge3(){
    ChallengeXORBase.apply(this,['3']);
    this.setInputDefaults([
      '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736',
      '00'
    ]);
    return this;
  }

  Challenge3.prototype = Object.create(ChallengeXORBase.prototype);

  return Challenge3;

});
