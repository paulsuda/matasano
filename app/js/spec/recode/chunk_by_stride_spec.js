
define(['recode/chunk_by_stride'],
function(ChunkByStride) {
  describe("ChunkByStride", function(){
    var test = '1234123412341234';
    var subject_class = ChunkByStride;

    it("Should return a string split by a given stride. In this case 4 bytes.", function(){
      subject = new subject_class(test, 4);
      chunks = subject.nextByte(test.length);
      expect(chunks[0]).toEqual("1111");
      expect(chunks[3]).toEqual("4444");
    });

  });
});
