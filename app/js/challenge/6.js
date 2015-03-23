'use strict';

define(['text!/example_data/set1challenge6.txt', 'challenge/base', 'scoring/hamming_distance'],
  function(sampleBase64File, ChallengeBase, HammingDistance){

  function Histogram(min, max, init_value = 0.0){
    var i;
    this.data = [];
    this.max_index = max;
    this.min_index = min;
    for(i = min; i < max; i++){
      this.data.push({
        index: i,
        value: init_value,
      });
    }
  }

  Histogram.prototype.set_value = function(index, value){
    //this.data[index] = value;

    var found_item = _.where(this.data, {'index' : index}).pop();
    if(found_item == undefined){
      throw("Unable to find histogram index " + index);
    }
    found_item.value = value;
    return found_item;
  };

  Histogram.prototype.sorted = function(field = 'value'){
    _.sortBy(this.data, field);
  };

  Histogram.prototype.min_item = function(){
    return _.min(this.data, 'value');
  };


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
    var item = key_size_distances.min_item();
    return 'Minimum distance ' + item.value + ' found for key size ' + item.index;
  };

  return Set1Challenge6;

});
