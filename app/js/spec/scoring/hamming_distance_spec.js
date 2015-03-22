
define(['scoring/hamming_distance'],
function(ScoreHammingDistance) {
  describe("ScoreHammingDistance", function(){

    var input_values = [
      'this is a test',
      'wokka wokka!!!'
    ];
    var subject_class = ScoreHammingDistance;

    it("Should return 37 for 'this is a test' and 'wokka wokka!!!'.", function(){
      subject = new subject_class(input_values);
      output = subject.decodeAll();
      expect(output).toEqual(37);
    });

  });
});
