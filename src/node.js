class Node {

	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {

		if(!this.left) { 
			node.parent = this; 									
			this.left = node; 
		} else if(this.left && !this.right) { 
			this.right = node, node.parent = this;	
		}
	}

	removeChild(node) {
		let counter = 0;
		if(node == this.left) {
			node.parent = null;
			this.left = null; 
			counter++;
		} else if(node == this.right && counter == 0) {
			this.right = null;
			node.parent = null;
		} else if(node != this.left && node != this.right) {
			alert("Passed node is not a child of this node !");
		}
	}

	remove() {
		if(this.parent) {
			this.parent.removeChild(this);
		};
	}

	swapWithParent() {
		if(!this.parent) {
			return
		};
		let TParent = this.parent;
		let TTParent = this.parent.parent;
		let	TLeft = this.left;
		let	TTleft = this.parent.left;
		let	TRight = this.right;
		let	TTRight = this.parent.right;
		
		if(this.parent.left === this){
			if(this.parent.right){
				this.parent.right.parent = this;
			};	
		} else if(this.parent.right === this) {
			if(this.parent.left){
				this.parent.left.parent = this;
			};
		};
		if(this.parent.parent === null){
		} else if(this.parent.parent.left === this.parent) {
			if(this.parent.parent){
				this.parent.parent.left = this;
			}
		} else if(this.parent.parent.right === this.parent) {
			if(this.parent.parent){
				this.parent.parent.right = this;
			}
		};
		if(this.left) {
			this.left.parent = this.parent;	
		}
		if(this.right) {
			this.right.parent = this.parent;	
		}
		if(this.parent.left === this) {
			this.left = TParent;
			this.right = TTRight;
		} else if(this.parent.right === this) {
			this.right = TParent;
			this.left = TTleft;
		}
		this.parent.parent = this;
		this.parent.left = TLeft;
		this.parent.right = TRight;
		this.parent = TTParent;	
	}
}
module.exports = Node;