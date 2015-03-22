'use strict';

define([], function(){

  function ScoreEnglishWords(){
    this.log_messages = [];
    this.common_words_list = null;
    this.weights = {
      common_words: 100.0,
      non_printable: -2.0,
      longest_printable: 2.0,
      printable: 2.0,
    };
    this.commonWordsInit();
  }

  ScoreEnglishWords.long_word_list = null;

  /**
   * Cache this instance's word list.
   */
  ScoreEnglishWords.prototype.cacheLongWordList = function(common_words_list){
    ScoreEnglishWords.long_word_list = {
      list: common_words_list,
      regex: new RegExp('\\b(' + common_words_list.join('|') + ')\\b', 'ig')
    };
  };

  /**
   * Load up a list of frequently used english language words from a text file.
   */
  ScoreEnglishWords.prototype.commonWordsInit = function(){
  //  this.common_words_list =  ['the', 'be', 'to', 'of', 'and']; return;
    if(ScoreEnglishWords.long_word_list != null) return ScoreEnglishWords.long_word_list;
    var comment_re = /^#+.*/;
    var thisObj = this;
    var word_list_limit = 1000;
    ScoreEnglishWords.long_word_list = {};
    console.log('Getting score words list');
    $.get('/example_data/english-words-by-freq.txt', function(word_list){
      console.log('Got list');
      word_list = word_list.split("\n");
      /* Reject comment lines starting w # */
      word_list = _.reject(word_list, function(line){
        var is_comment = (comment_re.exec(line) != null);
        var is_too_short = line.length < 2;
        return is_comment || is_too_short;
      });
      word_list = word_list.slice(0, word_list_limit);
      //thisObj.progressLog
      console.log('ScoreEnglishWords imported ' + word_list.length + ' words.');
      thisObj.cacheLongWordList(word_list);
    });
  };

  /**
   * Count how many times a regex matches content.
   */
  ScoreEnglishWords.prototype.matchCount = function(re, content){
    var match = null, match_count = 0;
    if(!re.global) throw "Can't matchCount() with a Regexp that doesn't use the g flag.";
    while(re.exec(content) != null){
      match_count += 1;
    }
    return match_count;
  };

  ScoreEnglishWords.prototype.getCommonWordsRE = function(){
    if(ScoreEnglishWords.long_word_list.regex instanceof RegExp)
      return ScoreEnglishWords.long_word_list.regex;
    throw "ScoreEnglishWords.long_word_list not initialized yet.";
  };

  /**
   * Perform a series of tests and return a score higher the more
   * likely the content is english text.
   */
  ScoreEnglishWords.prototype.getScore = function(content){
    var scores = {};
    /* How many times common words appear. */
    var common_words_re = this.getCommonWordsRE();
    scores['common_words'] = (this.matchCount(common_words_re, content) * this.weights.common_words);
    /* Consecutive printable characters. */
    var printable_re = /([\x20-\x7E]{10}[\x20-\x7E]+)/g;
    var match = null;
    var printable_points = 0;
    var longest_printable = 0;
    var longest_printable_string = '';
    while(match = printable_re.exec(content)){
      var item = match[0];
      if(longest_printable < item.length){
        longest_printable_string = item;
        longest_printable = item.length;
      }
      printable_points += (item.length * this.weights.printable);
    }
    scores['longest_printable'] = longest_printable * this.weights.longest_printable;
    /* How many non-printable characters appear (negative score). */
    var nonprintable_re = /[^\x20-\x7E]+/g;
    var nonprintable_points = (this.matchCount(nonprintable_re, content) * this.weights.non_printable);
    var points = printable_points + scores['longest_printable'] + scores.common_words + nonprintable_points;
    this.progressLog("SCORE: Words: " + scores.common_words +
      " Printable: " + printable_points +
      " Nonprintable: " + nonprintable_points +
      " Longest Printable: " + scores['longest_printable'] + ' "' + longest_printable_string + '"' +
      " Total: " + points);
    return points;
  };

  // TODO repeated from challenge.

  /**
   * Log scoring messages.
   */
  ScoreEnglishWords.prototype.progressLog = function(message){
    //console.log("progress: " + message);
    this.log_messages.push(message);
  };

  ScoreEnglishWords.prototype.flushLog = function(show = true){
    var messages = this.log_messages;
    if(show && (messages.length > 0))
      console.log(messages.join("\n"));
    this.log_messages = [];
    return messages;
  };

  return ScoreEnglishWords;
});
