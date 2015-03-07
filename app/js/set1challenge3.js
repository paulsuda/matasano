'use strict';


app.register_challenge((function(){

  function Set1Challenge3(){
    ChallengeBase.apply(this,['set1challenge3']);
    this.setInputDefaults([
      '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736',
      '00'
    ]);
    var e = this.challengeElement();
    /* Get special form elements, assign auto button action. */
    var thisObj = this;
    this.xor_elem = e.find('.input-field.xor-key');
    e.find('.button-auto').click(function(){
      thisObj.autoScan();
    });
    this.returnAsHex = true;
    return this;
  }

  Set1Challenge3.prototype = Object.create(ChallengeBase.prototype);

  Set1Challenge3.prototype.compute = function(input_values){
    var input_data = input_values[0];
    var input_key = parseInt(input_values[1]);
    if(input_key < 0 || input_key > 255){
      throw "Invalid key value " + input_key;
    }
    var decoded_data = this.decodeAllUsing(DecodeHexString, input_data);
    /* Repeat key to match decoded data length. */
    var key = String.fromCharCode(input_key).repeat(decoded_data.length)
    var decrypted_data = this.decodeAllUsing(DecodeXorStrings, [decoded_data, key]);
    var encoded_data = this.decodeAllUsing(EncodeHexString, decrypted_data);
    return [encoded_data, decrypted_data];
  };

  /**
   * Count how many times a regex matches content.
   */
  Set1Challenge3.prototype.matchCount = function(re, content){
    var match = re.exec(content);
    return (match == null) ? 0 : match.length;
  };

  /**
   * Perform a series of tests and return a score higher the more
   * likely the content is english text.
   */
  Set1Challenge3.prototype.scoreEnglish = function(content){
    /* How many times common words appear. */
    var common_words_list = ['the', 'be', 'to', 'of', 'and'];
    var common_words_re = new RegExp('\\b(' + common_words_list.join('|') + ')\\b');
    var common_words_points = this.matchCount(common_words_re, content);
    /* How many non-printable characters appear (negative score). */
    var nonprintable_re = /[^\x20-\x7E]+/g;
    var nonprintable_points = this.matchCount(nonprintable_re, content);
    var points = common_words_points - nonprintable_points;
    this.progress_log("SCORE: Words: " + common_words_points +
      " Nonprintable: " + nonprintable_points +
      " Total: " + points);
    return points;
  };

  Set1Challenge3.prototype.autoScan = function(){
    var i, best_score = 0, best_key = null, el = this.xor_elem;
    el.prop('disabled', true);
    this.returnAsHex = false;
    var input_data = this.challengeElement().find('.input-field:first').val();
    /* Try all 8 bit keys... */
    for(i = 0; i < 99; i++){
      /* ... set inputs and run the challenge. */
      var output_values = this.compute([input_data, i]);
      /* ... score the output as english text, record results. */
      var score = this.scoreEnglish(output_values[1]);
      this.progress_log("TEST: Key " + i + " scored " + score);
      if(best_score < score){
        best_score = score;
        best_key = i;
      }
    }
    el.prop('disabled', false);
    this.returnAsHex = true;
    this.progress_log("RESULT: Best key " + best_key + " scored " + best_score);
    el.val(best_key);
  };

  Set1Challenge3.prototype.progress_log = function(message){
    console.log("progress: " + message);
  };


  return new Set1Challenge3();
})());
