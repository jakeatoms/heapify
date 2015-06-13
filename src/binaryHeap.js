module.exports = function (/*option comparator will be passed here*/) {
  'use strict';

  return {
    collection: [],
    size: function size() {
      return this.collection.length;
    },
    parentIndex: function (n) {
      return Math.floor((n + 1) / 2) - 1;
    },
    childIndex: function (n) {
      return {
        left: (n + 1) * 2 - 1,
        right: (n + 1) * 2
      };
    },
    getItem: function (index) {
      if (index > this.size() - 1) {
        return;
      }

      return this.collection[index];
    },
    getIndexOfSmallest: function getIndexOfSmallest(subjectIndex, leftIndex, rightIndex) {
      var subjectValue = this.getItem(subjectIndex),
        leftValue = this.getItem(leftIndex),
        rightValue = this.getItem(rightIndex);

      if (leftValue == undefined && rightValue == undefined) {
        return subjectIndex;
      }

      var smallestChild = rightValue == undefined || rightValue > leftValue ? leftValue : rightValue;

      if (subjectValue < smallestChild){
        return subjectIndex;
      }

      return smallestChild === leftValue ? leftIndex : rightIndex;
    },
    push: function push(item) {
      this.collection.push(item);
      var index = this.size() - 1;

      if (index === 0) {
        return;
      }

      this.bubbleUp(index);
    },
    shift: function shift() {
      var firstItem = this.collection[0];

      var lastItem = this.collection.pop();

      this.collection[0] = lastItem;

      this.trickleDown(0);

      return firstItem;
    },
    bubbleUp: function (index) {
      var me = this.collection[index],
        parentIndex = this.parentIndex(index),
        parent = this.collection[parentIndex];

      if (me > parent) {
        return;
      }

      this.collection[parentIndex] = me;
      this.collection[index] = parent;

      if (parentIndex > 0) {
        this.bubbleUp(parentIndex);
      }
    },
    trickleDown: function (index) {
      // get children indexes
      var children = this.childIndex(index);

      //if they don't exist in array, exit

      //
    }
  }
};