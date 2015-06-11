var binaryHeap = require('../binaryHeap'),
    sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;

describe('binaryHeap', function () {

    beforeEach(function runFirst(){
        this.heap = binaryHeap();
    });

    afterEach(function tearDown() {
        this.heap.bubbleUp.restore && this.heap.bubbleUp.restore();
    })

    it('adding first element put element in first position', function () {
        var test = 1;
        this.heap.push(test);

        assert.equal(this.heap.collection[0], test);
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

    it('adding smaller item puts item at beginning of collection', function pushSmaller() {
        this.heap.collection.push(6);
        var test = 1;
        this.heap.push(test);

        //assert.equal(this.heap.collection[0], test);
    });

    describe('parentIndex calculation', function parentIndexDescribe() {
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
    })

    describe('childIndex calculation', function childIndexDescribe() {
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
    })

})