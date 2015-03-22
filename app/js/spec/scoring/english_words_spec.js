
define(['scoring/english_words'],
function(ScoreEnglishWords) {
  describe("ScoreEnglishWords", function(){

    var english_content ='this is a test';
    var junk_content = 'adsfqwerioqweurpo23cxucu';
    var subject_class = ScoreEnglishWords;

    it("Should return an integer that is greater for english text than random text.", function(){
      pending("Words list loading is messing this up.");
      subject = new subject_class();
      english_score = subject.getScore(english_content);
      junk_score = subject.getScore(junk_content);
      expect(english_score).toBeGreaterThan(junk_score);
    });

  });
});
