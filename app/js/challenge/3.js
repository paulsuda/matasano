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

  Challenge3.prototype.autoScanGetResult = function(input_data){
    var scan_result = this.autoScanData(input_data);
    this.progressLog("RESULT: Best key " + scan_result.best_key + " scored " + scan_result.best_score);
    return scan_result.best_key;
  };

  return Challenge3;

});
