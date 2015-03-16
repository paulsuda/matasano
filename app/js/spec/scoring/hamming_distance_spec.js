
define(['spec/spec_helper', 'scoring/hamming_distance'],
function(jasmine, ScoreHammingDistance) {
  describe("ScoreHammingDistance", function(){

    var input_values = [
      'this is a test',
      'wokka wokka!!!'
    ];
    var subject_class = ScoreHammingDistance;

    it("Should return 37 for 'this is a test' and 'wokka wokka!!!'.", function(){
      output = new subject_class(input_values);
      expect(output).toEqual(37); 
    });

  });
});
