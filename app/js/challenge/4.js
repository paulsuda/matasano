'use strict';

define(['challenge/xor_base'], function(ChallengeXORBase){

  function Challenge4(){
    ChallengeXORBase.apply(this,['4']);
    var thisObj = this;
    var defaultStartKey = '53';
    this.hex_list = null;
    thisObj.setInputDefaults([
      'loading...',
      defaultStartKey
    ]);
    $.get('/example_data/challenge4.txt', function(hex_list_data){
      /* Get data newline separated. */
      this.hex_list = hex_list_data.split("\n");
      /* Set defaults from file input. */
      thisObj.setInputDefaults([
        hex_list_data,
        defaultStartKey
      ]);
    });
    return this;
  }

  Challenge4.prototype = Object.create(ChallengeXORBase.prototype);

  Challenge4.prototype.autoScanGetResult = function(input_data){
    /* For each hex encoded item to try... */
    var hex_list = input_data.split("\n");
    var thisObj = this;
    var key_results = {};
    /* Scan each input and find best key along with score. Limit long input. */
    hex_list = hex_list.slice(0, 500);
    _.each(hex_list, function(hex_item, index){
      /* Get score for this snippet, don't do extensive logging..  */
      var save_log = thisObj.log_messages;
      var scan_result = thisObj.autoScanData(hex_item.trim());
      thisObj.log_messages = save_log;
      /* Get score */
      key_results[hex_item] = scan_result;
      thisObj.progressLog("HEX ITEM: " + hex_item + "best key: " +
        scan_result.best_key + " score: " + scan_result.best_score);
    });
    /* Pick out best result from all inputs. */
    var final_result = {};
    var final_best_score = 0;
    _.each(key_results, function(scan_result, key){
      if(scan_result.best_score > final_best_score){
        final_best_score = scan_result.best_score;
        final_result = scan_result;
      }
    });
    this.progressLog("FINAL RESULT: Best key " + final_result.best_key +
      " scored " + final_result.best_score +
      " for data " + final_result.input_data +
      " with output " + final_result.best_output);
    return final_result.best_key;
  };

  return Challenge4;

});
