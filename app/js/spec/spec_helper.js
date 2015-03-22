'use strict';

// Getting requirejs and jasmine to work together is not easy.
// http://stackoverflow.com/questions/19240302/does-jasmine-2-0-really-not-work-with-require-js

define(
['jasmine', 'jasmine-html'],
function (jasmine, jh) {
  console.log('spec helper called');
  // console.log(jasmine);
  // jasmine.getFixtures().fixturesPath = 'spec/fixtures';
  // return jasmine;
});
