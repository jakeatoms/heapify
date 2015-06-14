module.exports = function (/*option comparator will be passed here*/) {
  'use strict';

  return {
    __collection: [],

    size: function size() {
      return this.__collection.length;
    },

    getItem: function getItem(index) {
      if (index > this.size() - 1) {
        return;
      }

      return this.__collection[index];
    },

    push: function push(item) {
      this.__collection.push(item);
      var index = this.size() - 1;

      if (index === 0) {
        return;
      }

      this.__heapify(index);
    },

    shift: function shift() {
      var firstItem = this.__collection[0];

      var lastItem = this.__collection.pop();

      if (this.size() === 0){
        return firstItem;
      }

      this.__collection[0] = lastItem;

      this.__siftDown(0);

      return firstItem;
    },

    remove: function remove(item) {
      var matchedIndex = this.__collection.indexOf(item);

      if(matchedIndex == -1){
        return;
      }

      var lastItem = this.__collection.pop();

      if(lastItem === item){
        return;
      }

      this.__collection[matchedIndex] = lastItem;
      this.__heapify(matchedIndex);
      this.__siftDown(matchedIndex);
    },

    __heapify: function __heapify(index) {
      var me = this.__collection[index],
        parentIndex = this.__parentIndex(index),
        parent = this.__collection[parentIndex];

      if (me > parent) {
        return;
      }

      this.__collection[parentIndex] = me;
      this.__collection[index] = parent;

      if (parentIndex > 0) {
        this.__heapify(parentIndex);
      }
    },

    __siftDown: function __siftDown(index) {
      // get children indexes
      var children = this.__childIndexes(index);

      var childIndex = this.__getIndexOfSmallest(index, children.left, children.right);

      if (index === childIndex) {
        return;
      }

      var child = this.__collection[childIndex];
      var me = this.__collection[index];

      this.__collection[childIndex] = me;
      this.__collection[index] = child;

      if(this.__hasChildren(childIndex)){
        this.__siftDown(childIndex);
      }

      return;
    },

    __parentIndex: function __parentIndex(index) {
      return Math.floor((index + 1) / 2) - 1;
    },

    __childIndexes: function __childIndexes(index) {
      return {
        left: (index + 1) * 2 - 1,
        right: (index + 1) * 2
      };
    },

    __hasChildren: function __hasChildren(index){
      var children = this.__childIndexes(index);
      return this.getItem(children.left) != undefined || this.getItem(children.right) != undefined;
    },

    __getIndexOfSmallest: function __getIndexOfSmallest(subjectIndex, leftIndex, rightIndex) {
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
  }
};