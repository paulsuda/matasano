'use strict';

define(['underscore', 'd3'], function(_){

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

  Histogram.prototype.max_item = function(){
    return _.max(this.data, 'value');
  };

  // Originally based on example at http://bl.ocks.org/mbostock/3048450
  Histogram.prototype.render_html = function(container_id){
    // Generate a Bates distribution of 10 random variables.
    var values = d3.range(200).map(d3.random.bates(10));
    var ticks = values.length;
    var width = 700;
    var height = 400;
    console.log('values'); console.log(values);
    // A formatter for counts.
    var formatCount = d3.format(",.0f");
    var margin = {top: 10, right: 30, bottom: 30, left: 30};
    var d3histogram = d3.layout.histogram();


    var x = d3.scale.linear()
      .domain([0, 1])
      .range([0, width]);

    // Generate a histogram using twenty uniformly-spaced bins.
    var xticks = x.ticks(ticks);
    var bins = d3histogram.bins(xticks);
    var data = bins(values);

    var y = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.y; })])
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var svg = d3.select("#" + container_id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = svg.selectAll(".bar")
        .data(data)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", x(data[0].dx) - 1)
        .attr("height", function(d) { return height - y(d.y); });

    bar.append("text")
        .attr("dy", ".75em")
        .attr("y", 6)
        .attr("x", x(data[0].dx) / 2)
        .attr("text-anchor", "middle")
        .text(function(d) { return formatCount(d.y); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    return;
  }

  return Histogram;
});
