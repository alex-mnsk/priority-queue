;const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
			let nodeT = new Node(data, priority);
			this.insertNode(nodeT);
			this.shiftNodeUp(nodeT);
		}

	pop() {
		if(this.root){
			let detached = this.detachRoot();
			if(this.parentNodes) {
				this.restoreRootFromLastInsertedNode(detached);
				if(this.root) {
					this.shiftNodeDown(this.root);
				}
			}
			return detached.data;
		}
	}		

	detachRoot() {
			let rt = this.root;
			if(this.size() == 1) {
				this.root = null;			
			}else if(this.size() == 2) {
				this.parentNodes.shift();
			};
			return rt;
	}

	restoreRootFromLastInsertedNode(detached) {
 		if(this.root){
			let lastCP = null;
			let	isRight = false;
			let lastC = this.parentNodes.length-1;
			let size = this.size();
			if(this.parentNodes[lastC].parent) {
				lastCP = this.parentNodes[lastC].parent;
				if(lastCP.right == this.parentNodes[lastC]){
					isRight = true;
				}
			}
			if(size == 2 ){
				this.parentNodes[0].remove();
				this.root = this.parentNodes[0];
				this.parentNodes.unshift(this.parentNodes.pop());
			}else if(size == 3 ) {
				this.parentNodes[1].remove();
				this.parentNodes[1].left = detached.left;
				this.root = this.parentNodes[1];
				detached.left.parent = this.root;
				this.parentNodes.unshift(this.parentNodes.pop());
				return;
			}else {
				this.parentNodes[lastC].remove();
				this.parentNodes[lastC].left = detached.left;
				this.parentNodes[lastC].right = detached.right;
				this.root = this.parentNodes[lastC];	
				if(detached.left){
				detached.left.parent = this.root;
				};
				if(detached.right){
					detached.right.parent = this.root;
				}; 
				if(size > 2 && size % 2 == 0){
					this.parentNodes.pop();
				};	
			}
			if(isRight){
				this.parentNodes.unshift(lastCP);
				this.parentNodes.pop()
			}

		}
	}

	size() {
		var counter = function(node){		
			var result = 1;			
			if(node.left) {
				result += counter(node.left);
			}		
			if(node.right) {
				result += counter(node.right);
			}
			return result;
			}
			if(!this.root) {
			return 0;
		}
		return counter(this.root);	
	}

	isEmpty() {
		if(this.root){
			return false
		}else{
			return true};
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if(this.parentNodes.length == 0){
			this.parentNodes[0] = node;	
			this.root = node;
		}else{
			this.parentNodes[this.parentNodes.length] = node;	
		};
		let arrLastNum = this.parentNodes.length-1;
		if(arrLastNum > 0){	
			if(arrLastNum == 1){
				this.parentNodes[0].appendChild(this.parentNodes[1]);
			}else if(arrLastNum == 2){
				this.parentNodes[0].appendChild(this.parentNodes[2]);
				
			}else if((arrLastNum+1)%2 == 0){
				this.parentNodes[0].appendChild(this.parentNodes[arrLastNum]);
			}else {
				this.parentNodes[0].appendChild(this.parentNodes[arrLastNum]);			
			}
		}
		let nodeNumber = this.size()-1;
			if(nodeNumber == 2 ){
				this.parentNodes.shift();
			}else if(nodeNumber%2 == 0 && nodeNumber!==1 && nodeNumber!==0){
				this.parentNodes.shift();
			};
	}
	
	shiftNodeUp(node) {
		let point = 0;
		if(node.parent){
			if(node.priority > node.parent.priority){
				if(node.parent == this.root){
					this.root = node;
				}
				for(let i=0;i<this.parentNodes.length;i++){
					if(this.parentNodes[i] == node){	
						for(let j=0;j<this.parentNodes.length;j++){
							if(this.parentNodes[j] == node.parent){	
								this.parentNodes[i] = node.parent;
								this.parentNodes[j] = node;
								point = 1;
								break;
							}
						};
						if(point == 0){
							this.parentNodes[i] = node.parent;
						}
					}
				};
				node.swapWithParent();
				if(node!==null){
					this.shiftNodeUp(node);
				}
			}	
		}
	}

	shiftNodeDown(node) {
		if(node.left && node.right){
			if(node.priority > node.left.priority && node.priority > node.right.priority){
				return;
			}
			if(node.left.priority > node.right.priority){
				this.shiftNodeUp(node.left);
				this.shiftNodeDown(node);
			}else if(node.left.priority < node.right.priority){
				this.shiftNodeUp(node.right);
				this.shiftNodeDown(node);
			}
		}else if(node.left && !node.right){
			if(node.priority > node.left.priority){
				return;
			}else{
				this.shiftNodeUp(node.left);	
				this.shiftNodeDown(node);
			};
		}
	}
	
}			
module.exports = MaxHeap;
