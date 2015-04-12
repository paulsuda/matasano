'use strict';

define(['text!/example_data/challenge6.txt',
        'text!/example_data/english-words-by-freq.txt',
        'challenge/base', 'scoring/hamming_distance',
        'misc/histogram', 'scoring/bytecode_histogram',
        'recode/chunk_by_stride', 'decode/base64'],
  function(sampleBase64File, sampleEnglish, ChallengeBase, HammingDistance,
     Histogram, BytecodeHistogram,
     ChunkByStride, DecodeBase64){

  function Challenge6(){
    ChallengeBase.apply(this,['6']);
    this.setInputDefaults([
      sampleBase64File,
      'n/a'
    ]);
    this.key_size_min = 2;
    this.key_size_max = 40;
    return this;
  }

  Challenge6.prototype = Object.create(ChallengeBase.prototype);

  Challenge6.prototype.compute = function(input_values){
    var dec = this.decodeAllUsing;
    var cyphertext = dec
    var key_size_distances = this.get_key_size_distances(input_values[0]);
    var key_size = this.key_size_result(key_size_distances);
    var chunker = new ChunkByStride(input_values[0], key_size);
    var chopped_buffers = chunker.nextByte(input_values[0].length);
    var english_histogram = this.english_histogram();

    //TODO
    console.log(english_histogram);
    //console.log(chopped_buffers);

    return 'na';
  };

  Challenge6.prototype.english_histogram = function(){
    var hist = new BytecodeHistogram(sampleEnglish);
    return hist.nextByte(sampleEnglish.length);
  };


  Challenge6.prototype.key_size_result = function(key_size_distances){
    var min_item = key_size_distances.min_item();
    var chart_el = this.challengeElement().find('.chart');
    chart_el.html('');
    min_item.highlight = true;
    key_size_distances.render_html(chart_el[0]);
    chart_el.append('<p>Minimum distance ' + min_item.value + ' found for key size ' +
      min_item.index + '.</p>');
    return min_item.index;
  };

  Challenge6.prototype.get_key_size_distances = function(inp){
    var key_size_distances = new Histogram(this.key_size_min, this.key_size_max);
    var key_size;
    for(key_size = this.key_size_min; key_size <= this.key_size_max; key_size++){
      var first = inp.substring(0, key_size);
      var second = inp.substring(key_size, key_size * 2);
      var dist = this.decodeAllUsing(HammingDistance, [first, second]);
      var normalized_dist = dist / key_size;
      key_size_distances.set_value(key_size, normalized_dist);
    }
    return key_size_distances;
  };

  return Challenge6;

});
