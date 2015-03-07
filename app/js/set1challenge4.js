'use strict';

app.register_challenge((function(){

  function Set1Challenge4(){
    ChallengeXORBase.apply(this,['set1challenge4']);
    var thisObj = this;
    var defaultStartKey = '53';
    thisObj.setInputDefaults([
      'loading...',
      defaultStartKey
    ]);
    $.get('/example_data/set1challenge4.txt', function(hex_list_data){
      /* Remove newlines and jumble all together. */
      hex_list_data = hex_list_data.split("\n").join('');
      /* Set defaults from file input. */
      thisObj.setInputDefaults([
        hex_list_data,
        defaultStartKey
      ]);
    });
    return this;
  }

  Set1Challenge4.prototype = Object.create(ChallengeXORBase.prototype);

  return new Set1Challenge4();
})());
