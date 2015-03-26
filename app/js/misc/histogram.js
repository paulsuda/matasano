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

  Histogram.prototype.values_array = function(){
    var a = [];
    _.each(this.data, function(item){
      a[item.index] = item.value;
    });
    return a;
  };

  // Originally based on example at http://bl.ocks.org/mbostock/3048450
  Histogram.prototype.render_html = function(container_id){
    var values = this.data;
    var ticks = values.length;
    var width = 700;
    var height = 400;

    var formatValue = d3.format(",.2f");
    var margin = {top: 10, right: 30, bottom: 30, left: 30};

    var x = d3.scale.linear()
      .domain([this.min_index, this.max_index])
      .range([0, width]);

    var y = d3.scale.linear()
      .domain([0, this.max_item().value])
      .range([height, 0]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left");

    var bar_width = x(this.min_index + 1) - x(this.min_index); //DEBUG hard coded.

    var svg = d3.select("#" + container_id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = svg.selectAll(".bar")
        .data(values)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) {
          console.log('transf d'); console.log(d);
          return "translate(" + x(d.index) + "," + y(d.value) + ")";
        });

    bar.append("rect")
        .attr("width", bar_width)
        .attr("height", function(d) { return height - y(d.value); });

    bar.append("text")
        .attr("y", -6)
        .attr("x", -1)
        .text(function(d) { return formatValue(d.value); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    return;
  }

  return Histogram;
});
