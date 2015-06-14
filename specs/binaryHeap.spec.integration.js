var binaryHeap = require('../src/binaryHeap'),
  chai = require('chai'),
  assert = chai.assert;

describe('binaryHeap', function(){
  'use strict';

  beforeEach(function () {
    var heap = binaryHeap();

    for(var i = 100; i > 0; --i){
      heap.push(i);
    }

    this.heap = heap;
  });

  it('produces an ordered array', function () {
    var arrayToTest = [];
    for(var j = 0, l = this.heap.size(); j < l; j++){
      arrayToTest.push(this.heap.shift());
    }

    arrayToTest.forEach(function (item, index) {
      assert.equal(item, index + 1);
    });
  });

  it('is emptied when shift is run on it', function () {
    for(var j = 0, l = this.heap.size(); j < l; j++){
      this.heap.shift();
    }

    assert.equal(this.heap.size(), 0, '');
  });

  it('removes the given value', function () {
    var removeMe = 50;
    var expectedSize = this.heap.size() - 1;

    this.heap.remove(removeMe);

    assert.equal(this.heap.size(), expectedSize);
    assert.equal(this.heap.__collection.indexOf(removeMe), -1);
  });
});