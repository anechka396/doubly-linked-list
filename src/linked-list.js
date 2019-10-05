const Node = require('./node');

class LinkedList {
    constructor() {
		this._head = null;
        this._tail = null;
        this.length = 0;
	}

    append(data) {
		const newNode = new Node(data);
		if(this.length === 0) {
			this._head = newNode;
			this._tail = newNode;
		} else {
			newNode.prev = this._tail; 
			this._tail.next = newNode;
			this._tail = newNode;
		}
		
		this.length++;
		return this;
	}
	
	push(data) {
		const newNode = new Node(data);
		if(this.length === 0) {
			this._head = newNode;
			this._tail = newNode;
		} else {
			this._head.prev = newNode;
			newNode.next = this._head;
			this._head = newNode;
		}		
		this.length++;
		return this;
	}

    head() {
		return !this.isEmpty() ? this._head.data : null;
	}

    tail() {
		return !this.isEmpty() ? this._tail.data : null;
	}

    at(index) {
		return this.get(index).data;
	}
	
	get(index) {
		if(index === 0) return this._head;
		if(index === this.length - 1) return this._tail;
		
		var item = this._head;
		for(var i = 0; i < index; i++) {
			item = item.next;
		}
		return item;
	}

    insertAt(index, data) {
		var newNode = new Node(data);
		if(index === 0) {
			this.push(data);
		} else if(index == this.length) {
			this.append(data);
		} else {
			var newPrev = this.get(index - 1);
			var newNext = newPrev.next;
			if(newPrev != null) newPrev.next = newNode;
			if(newNext != null) newNext.prev = newNode;
			newNode.prev = newPrev;
			newNode.next = newNext;
			this.length++;
		}
		return this;
	}

    isEmpty() {
		return this.length === 0;
	}

    clear() {
		this._head = null;
		this._tail = null;
		this.length = 0;
		return this;
	}

    deleteAt(index) {
		var deleteItem = this.get(index);
		var prevItem = deleteItem.prev;
		var nextItem = deleteItem.next;
		if(prevItem != null) prevItem.next = nextItem;
		if(nextItem != null) nextItem.prev = prevItem;
		return this;
	}

    reverse() {
		var tempNode = null;
		var currentNode = this._head;
		this._tail = this._head;
		
		while(currentNode != null) {
			tempNode = currentNode.prev;
			currentNode.prev = currentNode.next;
			currentNode.next = tempNode;
			currentNode = currentNode.prev;
		}
		
		if(tempNode != null) {
			this._head = tempNode.prev;
		}
		return this;
	}

    indexOf(data) {
		if(this.head() === data) return 0;
		if(this.tail() === data) return this.length - 1;
		
		var tempNode = this._head;
		var index = 0;
		while(tempNode.next != null) {
			index++;
			if(tempNode.data === data) {
				return index;
			}
		}
		return -1;
	}
}

module.exports = LinkedList;
