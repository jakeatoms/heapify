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
    this.heap.__heapify.restore && this.heap.__heapify.restore();
    this.heap.__siftDown.restore && this.heap.__siftDown.restore();
  });

  it('size returns length of underlying array', function () {
    this.heap.__collection.push(1);
    this.heap.__collection.push(2);

    assert.equal(this.heap.size(), 2);
  });

  it('adding first item puts item in first position', function () {
    var test = 1;
    this.heap.push(test);

    assert.equal(this.heap.__collection[0], test);
  });

  it('adding first item does not call __heapify', function () {
    sinon.spy(this.heap, '__heapify');

    var test = 1;
    this.heap.push(test);

    assert.isTrue(this.heap.__heapify.notCalled);
  });

  it('adding item calls __heapify function', function () {
    sinon.spy(this.heap, '__heapify');
    this.heap.__collection.push(1);
    var test = 6;
    this.heap.push(test);

    assert.isTrue(this.heap.__heapify.calledOnce);
  });

  it('adding item calls __heapify function with new item index', function () {
    sinon.spy(this.heap, '__heapify');
    this.heap.__collection.push(1);
    var test = 6;
    this.heap.push(test);

    assert.isTrue(this.heap.__heapify.calledWith(1));
  });

  describe('__parentIndex calculation', function () {
    it('returns 0 when n is 2', function parentNode() {
      var result = this.heap.__parentIndex(2);

      assert.equal(result, 0);
    });

    it('returns 1 when n is 3', function parentNode() {
      var result = this.heap.__parentIndex(3);

      assert.equal(result, 1);
    });

    it('returns 1 when n is 4', function parentNode() {
      var result = this.heap.__parentIndex(4);

      assert.equal(result, 1);
    });

    it('returns 2 when n is 5', function parentNode() {
      var result = this.heap.__parentIndex(5);

      assert.equal(result, 2);
    });

    it('returns 3 when n is 8', function parentNode() {
      var result = this.heap.__parentIndex(8);

      assert.equal(result, 3);
    });
  });

  describe('__childIndex calculation', function () {
    it('returns 1 and 2 when n is 0', function parentNode() {
      var result = this.heap.__childIndex(0);

      assert.equal(result.left, 1);
      assert.equal(result.right, 2);
    });

    it('returns 4 & 5 when n is 2', function parentNode() {
      var result = this.heap.__childIndex(2);

      assert.equal(result.left, 5);
      assert.equal(result.right, 6);
    });

    it('returns 9 & 10 when n is 4', function parentNode() {
      var result = this.heap.__childIndex(4);

      assert.equal(result.left, 9);
      assert.equal(result.right, 10);
    });
  });

  describe('__heapify', function () {
    it('does nothing when parent value is less', function () {
      this.heap.__collection.push(3);
      this.heap.__collection.push(4);

      this.heap.__collection.push(8);

      this.heap.__heapify(2);

      assert.equal(this.heap.__collection[0], 3);
      assert.equal(this.heap.__collection[1], 4);
      assert.equal(this.heap.__collection[2], 8);
    });

    it('swaps with parent when parent is greater', function () {
      this.heap.__collection.push(3);
      this.heap.__collection.push(5);

      this.heap.__collection.push(1);

      this.heap.__heapify(2);

      assert.equal(this.heap.__collection[0], 1, 'child was not swapped with parent');
      assert.equal(this.heap.__collection[1], 5, 'wrong index was calculated somewhere');
      assert.equal(this.heap.__collection[2], 3, 'parent was not swapped with child');
    });

    it('swaps new negative value with parents until it reaches top', function () {
      this.heap.__collection.push(1);
      //children of index 0
      this.heap.__collection.push(5);
      this.heap.__collection.push(4);

      //children of index 1
      this.heap.__collection.push(6);
      this.heap.__collection.push(7);

      //children of index 2
      this.heap.__collection.push(8);
      this.heap.__collection.push(9);

      //child of index 3
      this.heap.__collection.push(-3);

      this.heap.__heapify(this.heap.__collection.length - 1);

      assert.equal(this.heap.__collection[0], -3);
      assert.equal(this.heap.__collection[1], 1);
    });

    it('swaps with parents until parent is smaller', function () {
      this.heap.__collection.push(1);
      //children of index 0
      this.heap.__collection.push(5);
      this.heap.__collection.push(4);

      //children of index 1
      this.heap.__collection.push(6);
      this.heap.__collection.push(7);

      //children of index 2
      this.heap.__collection.push(8);
      this.heap.__collection.push(9);

      //child of index 3
      this.heap.__collection.push(3);

      this.heap.__heapify(this.heap.__collection.length - 1);

      assert.equal(this.heap.__collection[0], 1);
      assert.equal(this.heap.__collection[1], 3);
      assert.equal(this.heap.__collection[2], 4);
      assert.equal(this.heap.__collection[3], 5);
      assert.equal(this.heap.__collection[4], 7);
      assert.equal(this.heap.__collection[5], 8);
      assert.equal(this.heap.__collection[6], 9);
      assert.equal(this.heap.__collection[7], 6);
    });
  });

  describe('shift', function () {

    beforeEach(function () {
      this.heap.push(1);
      this.heap.push(2);
      this.heap.push(3);
    });

    afterEach(function () {
      this.heap.__siftDown.restore && this.heap.__siftDown.restore();
    });

    it('returns the first value in the heap', function () {
      var result = this.heap.shift();

      assert.equal(result, 1);
    });

    it('removes the first value from the heap', function () {
      var result = this.heap.shift();

      for (var i = 0, l = this.heap.size(); i < l; i++) {
        assert.notEqual(this.heap.__collection[i], result);
      }
    });

    it('calls __siftDown with index 0', function () {
      spy(this.heap, '__siftDown');
      this.heap.shift();

      assert.isTrue(this.heap.__siftDown.calledOnce, '__siftDown not called once');
      assert.isTrue(this.heap.__siftDown.calledWith(0), 'not called with 0 index');
    });

    it('does not call __siftDown when only 2 items in heap', function(){
        spy(this.heap, '__siftDown');
        this.heap.__collection = [1, 2];
        this.heap.shift();

        assert.equal(this.heap.__siftDown.callCount, 0);
    });

    it('does not call __siftDown when only 2 item in heap', function(){
      spy(this.heap, '__siftDown');
      this.heap.__collection = [1];
      this.heap.shift();

      assert.equal(this.heap.__siftDown.callCount, 0);
    });
  });

  describe('__siftDown', function () {
    beforeEach(function () {
      this.heap.__collection.push(1);
    });

    afterEach(function () {
      this.heap.__childIndex.restore && this.heap.__childIndex.restore();
      this.heap.__getIndexOfSmallest.restore && this.heap.__getIndexOfSmallest.restore();
      this.heap.__siftDown.restore && this.heap.__siftDown.restore();
    });

    it('calls __childIndex', function () {
      spy(this.heap, '__childIndex');
      this.heap.__siftDown(0);

      assert.isTrue(this.heap.__childIndex.calledOnce, '__childIndex was not called');
    });

    it('calls __childIndex with given index', function () {
      spy(this.heap, '__childIndex');
      this.heap.__siftDown(0);

      assert.isTrue(this.heap.__childIndex.calledWith(0), '__childIndex was not called with given index');
    });

    it('calls __getIndexOfSmallest', function () {
      spy(this.heap, '__getIndexOfSmallest');

      this.heap.__siftDown(0);

      assert.isTrue(this.heap.__getIndexOfSmallest.calledOnce, '__getIndexOfSmallest was not called');
    });

    it('calls __getIndexOfSmallest with given index and child indexes', function () {
      spy(this.heap, '__getIndexOfSmallest');

      this.heap.__siftDown(0);

      assert.isTrue(this.heap.__getIndexOfSmallest.calledWith(0, 1, 2), '__getIndexOfSmallest was not called');
    });

    it('swaps subject item with smaller value', function () {
      this.heap.__collection = [];
      this.heap.__collection.push(3);
      this.heap.__collection.push(1);
      this.heap.__collection.push(2);

      //spy(this.heap.__getIndexOfSmallest).returns(1);

      this.heap.__siftDown(0);

      assert.equal(this.heap.__collection[0], 1, 'smaller value was not moved up');
      assert.equal(this.heap.__collection[1], 3, 'larger value was not moved down');
    });

    it('swaps subject item with smaller value until no children remain', function () {
      this.heap.__collection = [];
      this.heap.__collection.push(8);
      this.heap.__collection.push(1);
      this.heap.__collection.push(2);
      this.heap.__collection.push(3);
      this.heap.__collection.push(4);
      this.heap.__collection.push(5);
      this.heap.__collection.push(6);
      this.heap.__collection.push(7);

      spy(this.heap, '__siftDown');

      this.heap.__siftDown(0);

      assert.equal(this.heap.__siftDown.callCount, 3);
      assert.equal(this.heap.__collection[7], 8, 'largest value was not moved down');
    });

    it('swaps subject item with smaller value until children are larger', function () {
      this.heap.__collection = [];
      this.heap.__collection.push(7);
      this.heap.__collection.push(1);
      this.heap.__collection.push(2);
      this.heap.__collection.push(3);
      this.heap.__collection.push(4);
      this.heap.__collection.push(5);
      this.heap.__collection.push(6);
      this.heap.__collection.push(8);

      spy(this.heap, '__siftDown');

      this.heap.__siftDown(0);

      assert.equal(this.heap.__siftDown.callCount, 3);
      assert.equal(this.heap.__collection[3], 7, 'largest value was not moved down');
    });
  });

  describe('__getIndexOfSmallest', function () {

    it('returns subjectIndex when other indexes are out of bounds', function () {
      this.heap.__collection.push(1);
      this.heap.__collection.push(2);

      var result = this.heap.__getIndexOfSmallest(1, 2, 3);

      assert.equal(result, 1, 'did not return subjectIndex');
    });

    it('returns subjectIndex when leftValue is larger and rightIndex is out of bounds', function () {
      this.heap.__collection.push(1);
      this.heap.__collection.push(2);

      var result = this.heap.__getIndexOfSmallest(0, 1, 2);

      assert.equal(result, 0, 'did not return subjectIndex');
    });

    it('returns subjectIndex when the value is the smallest', function () {
      this.heap.__collection.push(1);
      this.heap.__collection.push(2);

      var result = this.heap.__getIndexOfSmallest(0, 1, 2);

      assert.equal(result, 0, 'did not return subjectIndex');
    });

    it('returns leftIndex when the value is the smallest', function () {
      this.heap.__collection.push(2);
      this.heap.__collection.push(1);
      this.heap.__collection.push(3);

      var result = this.heap.__getIndexOfSmallest(0, 1, 2);

      assert.equal(result, 1, 'did not return leftIndex');
    });

    it('returns rightIndex when the value is the smallest', function () {
      this.heap.__collection.push(2);
      this.heap.__collection.push(3);
      this.heap.__collection.push(1);

      var result = this.heap.__getIndexOfSmallest(0, 1, 2);

      assert.equal(result, 2, 'did not return rightIndex');
    });

    it('returns leftIndex when the value is the smallest and rightIndex is out of bounds', function () {
      this.heap.__collection.push(2);
      this.heap.__collection.push(1);

      var result = this.heap.__getIndexOfSmallest(0, 1, 2);

      assert.equal(result, 1, 'did not return leftIndex');
    });
  })

  describe('remove', function () {
    beforeEach(function () {
      spy(this.heap, '__siftDown');
      spy(this.heap, '__heapify');

      this.heap.__collection = [1,2,3,4,5];
    });

    afterEach(function () {
      this.heap.__siftDown.restore && this.heap.__siftDown.restore();
      this.heap.__heapify.restore && this.heap.__heapify.restore();
    });

    it('does not call dependent functions when given item not in heap', function () {
      this.heap.remove(10);

      assert.equal(this.heap.__siftDown.callCount, 0);
      assert.equal(this.heap.__heapify.callCount, 0);
    });

    it('does not call dependent functions when given item is last in heap', function () {
      this.heap.remove(5);

      assert.equal(this.heap.__siftDown.callCount, 0);
      assert.equal(this.heap.__heapify.callCount, 0);
    });

    it('removes the given item from the heap', function () {
      this.heap.remove(5);

      assert.notEqual(this.heap.__collection[this.heap.__collection.length - 1], 5)
    });

    it('calls dependent functions when given item is found and not the last item in heap', function () {
      this.heap.remove(2);

      assert.isTrue(this.heap.__siftDown.calledOnce);
      assert.isTrue(this.heap.__heapify.calledOnce);
    });

    it('calls dependent functions with index of heap item', function () {
      this.heap.remove(2);

      assert.isTrue(this.heap.__siftDown.calledWith(1));
      assert.isTrue(this.heap.__heapify.calledWith(1));
    });
  });
});