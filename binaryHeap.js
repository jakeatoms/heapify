module.exports = function(){
    return {
        collection: [],
        parentIndex: function(n){
            return Math.floor((n + 1) / 2) - 1;
        },
        childIndex: function(n){
            return {
                left: (n + 1) * 2 - 1,
                right: (n + 1) * 2
            };
        },
        push: function(item){
            this.collection.push(item);
            var index = this.collection.length - 1;

            if(index === 0){
                return;
            }

            this.bubbleUp(index);
        },
        bubbleUp: function(index){

        }
    }
};