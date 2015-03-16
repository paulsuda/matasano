'use strict';

define(
['jasmine', 'jasmine-html', 'jasmine-jquery'],
function (jasmine) {
  jasmine.getFixtures().fixturesPath = 'spec/fixtures';
  return jasmine;
});
