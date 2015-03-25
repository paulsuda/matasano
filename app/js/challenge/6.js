'use strict';

define(['text!/example_data/set1challenge6.txt', 'challenge/base', 'scoring/hamming_distance', 'misc/histogram'],
  function(sampleBase64File, ChallengeBase, HammingDistance, Histogram){

  function Set1Challenge6(){
    ChallengeBase.apply(this,['set1challenge6']);
    this.setInputDefaults([
      sampleBase64File,
      'n/a'
    ]);
    return this;
  }

  Set1Challenge6.prototype = Object.create(ChallengeBase.prototype);

  Set1Challenge6.prototype.compute = function(input_values){
    var key_size_min = 2;
    var key_size_max = 40;
    var key_size;
    var key_size_distances = new Histogram(key_size_min, key_size_max);
    for(key_size = key_size_min; key_size < key_size_max; key_size++){
      var inp = input_values[0];
      var first = inp.substring(0, key_size);
      var second = inp.substring(key_size, key_size * 2);
      var dist = this.decodeAllUsing(HammingDistance, [first, second]);
      var normalized_dist = dist / key_size;
      key_size_distances.set_value(key_size, normalized_dist);
    }
    console.log(key_size_distances);
    key_size_distances.render_html('set1challenge6');
    var item = key_size_distances.min_item();
    return 'Minimum distance ' + item.value + ' found for key size ' + item.index;
  };

  return Set1Challenge6;

});
