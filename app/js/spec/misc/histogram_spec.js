
define(['misc/histogram'],
function(Histogram) {
  describe("Histogram", function(){

    var subject_class = Histogram;

    describe("populated with test data", function(){

      var test_data = [
        {index: 1, value: 50},
        {index: 0, value: 40},
        {index: 2, value: 30},
        {index: 3, value: 20},
        {index: 4, value: 10},
      ];
      var subject = new subject_class(0, 4, test_data);

      it("sum of test values is correct", function(){
        expect(subject.sum_values()).toEqual(150);
      });

      it("returns expected item for max value search", function(){
        var item = subject.max_item();
        expect(item.index).toEqual(1);
      });

      it("returns expected item for min value search", function(){
        var item = subject.min_item();
        expect(item.index).toEqual(4);
      });

    });


    describe("class function chiSquaredDist", function(){
      it("returns expected value for known degrees of freedom and certainties", function(){
        chisq = subject_class.chiSquaredDist;
        expect(chisq(2, 0.01)).toBeCloseTo(9.21034);
      });

    });

    /* Based on example on p 917 statistics for business economics 7th ed */
    describe("class function compareChiSquared", function(){
      /* Null hypothesis, expected distribution */
      var null_hyp = new subject_class(0, 2, [
        {index: 0, value: .1},
        {index: 1, value: .65},
        {index: 2, value: .25},
      ]);
      /* Alternate hypothesis, test sample */
      var alt_hyp = new subject_class(0, 2, [
        {index: 0, value: 42},
        {index: 1, value: 365},
        {index: 2, value: 193},
      ]);
      it("computes expected chi^2 value", function(){
        var result = subject_class.compareChiSquared(null_hyp, alt_hyp);
        expect(result).toBeCloseTo(19.33);
      });
      it("computes expected result", function(){
        var result = subject_class.compareChiSquared(null_hyp, alt_hyp);
        var df = (null_hyp.max_index - null_hyp.min_index) - 1;
        var dist_value = subject_class.chiSquaredDist(df, 0.01);
        console.log(result);
        console.log(dist_value);
        var final_result = (result < dist_value);
        expect(final_result).toBe(false);
      });

    });

  });
});
