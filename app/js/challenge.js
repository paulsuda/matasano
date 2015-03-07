
function ChallengeBase(challenge_id){
  this.challenge_id = challenge_id;
  this.last_defaults = [];
  this.log_messages = [];
  var thisObj = this;
  var e = this.challengeElement();
  /* Disable output display textfield by default. */
  //e.find('.output-field').prop('disabled', true);
  /* Get the form element and hook submit events. */
  e.submit(function(event){
    event.preventDefault();
    thisObj.runChallenge();
    return false;
  });
}

ChallengeBase.prototype.runChallenge = function(){
  console.log('runChallenge() for ' + this.challenge_id);
  var e = this.challengeElement();
  var input_elem = e.find('.input-field');
  var output_elem = e.find('.output-field');
  var output_values = null;
  /* Disable input while computing. */
  input_elem.prop('disabled', true);
  output_elem.prop('disabled', true);
  /* Get all of our inputs as an ordered list. */
  var input_values = input_elem.map(function (i, elem) {
    return $(elem).val();
  });
  try{
    /* Try to compute, with exception handling. */
    output_values = this.compute(input_values);
  }
  catch(err){
    console.log("Exception Caught");
    console.log(err);
    alert('Exception: ' + err);
    return '*ERROR*';
  }
  /* Some things don't return a list of output values, so we have to make it one. */
  if(!(output_values instanceof Array)){
    output_values = [output_values];
  }
  /* Set output */
  output_elem.map(function (i, elem) {
    return $(elem).val(output_values[i]);
  });
  /* Re enable input. */
  this.flush_log();
  input_elem.prop('disabled', false);
  output_elem.prop('disabled', false);
  return output_values;
};

ChallengeBase.prototype.compute = function(input_values){
  throw "ChallengeBase compute() called. Should be called by derived class.";
  // return [result_data];
};

ChallengeBase.prototype.challengeElement = function(){
  return $('#' + this.challenge_id);
};

ChallengeBase.prototype.decodeAllUsing = function(decoderClass, input_data){
  var decoder = new decoderClass(input_data);
  var decoded_data = decoder.decodeAll();
  return decoded_data;
};

ChallengeBase.prototype.setInputDefaults = function(default_values){
  this.last_defaults = default_values;
  var e = this.challengeElement();
  var input_elem = e.find('.input-field');
  return input_elem.map(function (i, elem) {
    return $(elem).val(default_values[i]);
  });
};

ChallengeBase.prototype.progress_log = function(message){
  //console.log("progress: " + message);
  this.log_messages.push(message);
};

ChallengeBase.prototype.flush_log = function(){
  if(this.log_messages.length > 0)
    console.log(this.log_messages.join("\n"));
  this.log_messages = [];
};


/* * * scoring * * */

/**
 * Count how many times a regex matches content.
 */
 ChallengeBase.prototype.matchCount = function(re, content){
  var match = null, match_count = 0;
  if(!re.global) throw "Can't matchCount() with a Regexp that doesn't use the g flag.";
  while(re.exec(content) != null){
    match_count += 1;
  }
  return match_count;
};

/**
 * Perform a series of tests and return a score higher the more
 * likely the content is english text.
 */
 ChallengeBase.prototype.scoreEnglish = function(content){
  /* How many times common words appear. */
  var common_words_list = ['the', 'be', 'to', 'of', 'and'];
  var common_words_re = new RegExp('\\b(' + common_words_list.join('|') + ')\\b', 'g');
  var common_words_points = (this.matchCount(common_words_re, content) * 40.0);
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
    printable_points += (item.length * 2.0);
  }
  longest_printable_points = longest_printable * 100.0;
  /* How many non-printable characters appear (negative score). */
  var nonprintable_re = /[^\x20-\x7E]+/g;
  var nonprintable_points = (this.matchCount(nonprintable_re, content) * 2.0);
  var points = printable_points + longest_printable_points + common_words_points - nonprintable_points;
  this.progress_log("SCORE: Words: " + common_words_points +
    " Printable: " + printable_points +
    " Nonprintable: " + nonprintable_points +
    " Longest Printable: " + longest_printable_points + ' "' + longest_printable_string + '"' +
    " Total: " + points);
  return points;
};
