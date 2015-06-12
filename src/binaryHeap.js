module.exports = function (/*option comparator will be passed here*/) {
  'use strict';

  return {
    collection: [],
    parentIndex: function (n) {
      return Math.floor((n + 1) / 2) - 1;
    },
    childIndex: function (n) {
      return {
        left: (n + 1) * 2 - 1,
        right: (n + 1) * 2
      };
    },
    push: function (item) {
      this.collection.push(item);
      var index = this.collection.length - 1;

      if (index === 0) {
        return;
      }

      this.bubbleUp(index);
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
    }
  }
};