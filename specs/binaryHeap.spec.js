var binaryHeap = require('../src/binaryHeap'),
  sinon = require('sinon'),
  chai = require('chai'),
  assert = chai.assert,
  spy = sinon.spy;

describe('binaryHeap', function () {

  beforeEach(function setup() {
    this.heap = binaryHeap();
  });

  afterEach(function tearDown() {
    this.heap.bubbleUp.restore && this.heap.bubbleUp.restore();
    this.heap.trickleDown.restore && this.heap.trickleDown.restore();
  });

  it('size returns length of underlying array', function () {
    this.heap.collection.push(1);
    this.heap.collection.push(2);

    assert.equal(this.heap.size(), 2);
  });

  it('adding first item puts item in first position', function () {
    var test = 1;
    this.heap.push(test);

    assert.equal(this.heap.collection[0], test);
  });

  it('adding first item does not call bubbleUp', function () {
    sinon.spy(this.heap, 'bubbleUp');

    var test = 1;
    this.heap.push(test);

    assert.isTrue(this.heap.bubbleUp.notCalled);
  });

  it('adding item calls bubbleUp function', function () {
    sinon.spy(this.heap, 'bubbleUp');
    this.heap.collection.push(1);
    var test = 6;
    this.heap.push(test);

    assert.isTrue(this.heap.bubbleUp.calledOnce);
  });

  it('adding item calls bubbleUp function with new item index', function () {
    sinon.spy(this.heap, 'bubbleUp');
    this.heap.collection.push(1);
    var test = 6;
    this.heap.push(test);

    assert.isTrue(this.heap.bubbleUp.calledWith(1));
  });

  describe('parentIndex calculation', function () {
    it('returns 0 when n is 2', function parentNode() {
      var result = this.heap.parentIndex(2);

      assert.equal(result, 0);
    });

    it('returns 1 when n is 3', function parentNode() {
      var result = this.heap.parentIndex(3);

      assert.equal(result, 1);
    });

    it('returns 1 when n is 4', function parentNode() {
      var result = this.heap.parentIndex(4);

      assert.equal(result, 1);
    });

    it('returns 2 when n is 5', function parentNode() {
      var result = this.heap.parentIndex(5);

      assert.equal(result, 2);
    });

    it('returns 3 when n is 8', function parentNode() {
      var result = this.heap.parentIndex(8);

      assert.equal(result, 3);
    });
  });

  describe('childIndex calculation', function () {
    it('returns 1 and 2 when n is 0', function parentNode() {
      var result = this.heap.childIndex(0);

      assert.equal(result.left, 1);
      assert.equal(result.right, 2);
    });

    it('returns 4 & 5 when n is 2', function parentNode() {
      var result = this.heap.childIndex(2);

      assert.equal(result.left, 5);
      assert.equal(result.right, 6);
    });

    it('returns 9 & 10 when n is 4', function parentNode() {
      var result = this.heap.childIndex(4);

      assert.equal(result.left, 9);
      assert.equal(result.right, 10);
    });
  });

  describe('bubbleUp', function () {
    it('does nothing when parent value is less', function () {
      this.heap.collection.push(3);
      this.heap.collection.push(4);

      this.heap.collection.push(8);

      this.heap.bubbleUp(2);

      assert.equal(this.heap.collection[0], 3);
      assert.equal(this.heap.collection[1], 4);
      assert.equal(this.heap.collection[2], 8);
    });

    it('swaps with parent when parent is greater', function () {
      this.heap.collection.push(3);
      this.heap.collection.push(5);

      this.heap.collection.push(1);

      this.heap.bubbleUp(2);

      assert.equal(this.heap.collection[0], 1, 'child was not swapped with parent');
      assert.equal(this.heap.collection[1], 5, 'wrong index was calculated somewhere');
      assert.equal(this.heap.collection[2], 3, 'parent was not swapped with child');
    });

    it('swaps new negative value with parents until it reaches top', function () {
      this.heap.collection.push(1);
      //children of index 0
      this.heap.collection.push(5);
      this.heap.collection.push(4);

      //children of index 1
      this.heap.collection.push(6);
      this.heap.collection.push(7);

      //children of index 2
      this.heap.collection.push(8);
      this.heap.collection.push(9);

      //child of index 3
      this.heap.collection.push(-3);

      this.heap.bubbleUp(this.heap.collection.length - 1);

      assert.equal(this.heap.collection[0], -3);
      assert.equal(this.heap.collection[1], 1);
    });

    it('swaps with parents until parent is smaller', function () {
      this.heap.collection.push(1);
      //children of index 0
      this.heap.collection.push(5);
      this.heap.collection.push(4);

      //children of index 1
      this.heap.collection.push(6);
      this.heap.collection.push(7);

      //children of index 2
      this.heap.collection.push(8);
      this.heap.collection.push(9);

      //child of index 3
      this.heap.collection.push(3);

      this.heap.bubbleUp(this.heap.collection.length - 1);

      assert.equal(this.heap.collection[0], 1);
      assert.equal(this.heap.collection[1], 3);
      assert.equal(this.heap.collection[2], 4);
      assert.equal(this.heap.collection[3], 5);
      assert.equal(this.heap.collection[4], 7);
      assert.equal(this.heap.collection[5], 8);
      assert.equal(this.heap.collection[6], 9);
      assert.equal(this.heap.collection[7], 6);
    });
  });

  describe('shift', function () {

    beforeEach(function () {
      this.heap.push(1);
      this.heap.push(2);
      this.heap.push(3);
    });

    it('returns the first value in the heap', function () {
      var result = this.heap.shift();

      assert.equal(result, 1);
    });

    it('removes the first value from the heap', function () {
      var result = this.heap.shift();

      for (var i = 0, l = this.heap.size(); i < l; i++) {
        assert.notEqual(this.heap.collection[i], result);
      }
    });

    it('move last item to first position', function () {
      this.heap.shift();

      assert.equal(this.heap.collection[0], 3);
    });

    it('calls trickleDown with index 0', function () {
      spy(this.heap, 'trickleDown');
      this.heap.shift();

      assert.isTrue(this.heap.trickleDown.calledOnce);
      assert.isTrue(this.heap.trickleDown.calledWith(0), 'not called with 0 index');
    });
  });

  describe('trickleDown', function () {
    beforeEach(function () {
      this.heap.collection.push(1);
    });

    afterEach(function () {
      this.heap.childIndex.restore && this.heap.childIndex.restore();
    });

    it('calls childIndex', function () {
      spy(this.heap, 'childIndex');
      this.heap.trickleDown(0);

      assert.isTrue(this.heap.childIndex.calledOnce, 'childIndex was not called');
    });

    it('calls childIndex with given index', function () {
      spy(this.heap, 'childIndex');
      this.heap.trickleDown(0);

      assert.isTrue(this.heap.childIndex.calledWith(0), 'childIndex was not called with given index');
    });
  });
  
  describe('getIndexOfSmallest', function () {
    
    it('returns subjectIndex when other indexes are out of bounds', function () {
      this.heap.collection.push(1);
      this.heap.collection.push(2);

      var result = this.heap.getIndexOfSmallest(1, 2, 3);

      assert.equal(result, 1, 'did not return subjectIndex');
    });

    it('returns subjectIndex when leftValue is larger and rightIndex is out of bounds', function () {
      this.heap.collection.push(1);
      this.heap.collection.push(2);

      var result = this.heap.getIndexOfSmallest(0, 1, 2);

      assert.equal(result, 0, 'did not return subjectIndex');
    });

    it('returns subjectIndex when the value is the smallest', function () {
      this.heap.collection.push(1);
      this.heap.collection.push(2);

      var result = this.heap.getIndexOfSmallest(0, 1, 2);

      assert.equal(result, 0, 'did not return subjectIndex');
    });

    it('returns leftIndex when the value is the smallest', function () {
      this.heap.collection.push(2);
      this.heap.collection.push(1);
      this.heap.collection.push(3);

      var result = this.heap.getIndexOfSmallest(0, 1, 2);

      assert.equal(result, 1, 'did not return leftIndex');
    });

    it('returns rightIndex when the value is the smallest', function () {
      this.heap.collection.push(2);
      this.heap.collection.push(3);
      this.heap.collection.push(1);

      var result = this.heap.getIndexOfSmallest(0, 1, 2);

      assert.equal(result, 2, 'did not return rightIndex');
    });

    it('returns leftIndex when the value is the smallest and rightIndex is out of bounds', function () {
      this.heap.collection.push(2);
      this.heap.collection.push(1);

      var result = this.heap.getIndexOfSmallest(0, 1, 2);

      assert.equal(result, 1, 'did not return leftIndex');
    });
  })
});