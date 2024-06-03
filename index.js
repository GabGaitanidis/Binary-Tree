class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
    this.arr = [];
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);
    return root;
  }

  insert(value) {
    const insertRecursively = (value, node) => {
      if (node === null) {
        return new Node(value);
      }

      if (value > node.data) {
        node.right = insertRecursively(value, node.right);
      } else if (value < node.data) {
        node.left = insertRecursively(value, node.left);
      }
      return node;
    };

    this.root = insertRecursively(value, this.root);
  }

  find(value) {
    let sum = 0;
    const iterate = (value, node) => {
      if (node.data == value) {
        console.log(true + " " + value);
      }

      if (value > node.data) {
        node.right = iterate(value, node.right);
      } else if (value < node.data) {
        node.left = iterate(value, node.left);
      }
      sum++;
      return node;
    };

    this.root = iterate(value, this.root);
    console.log(sum);
  }
  levelorder(callback) {
    let arr = [];
    if (this.root == null) {
      return arr;
    }

    let queue = [this.root];

    while (queue.length > 0) {
      let node = queue.shift();
      arr.push(node.data);

      if (node.left != null) {
        queue.push(node.left);
      }
      if (node.right != null) {
        queue.push(node.right);
      }
    }

    console.log(arr);
    if (callback) {
      return callback(arr);
    }
  }
  preorder(callback) {
    let arr = [this.root.data];
    let queue = [this.root.left];
    let queue2 = [this.root.right];

    while (queue.length > 0) {
      let node = queue.shift();
      arr.push(node.data);

      if (node.left != null) {
        queue.push(node.left);
      }
      if (node.right != null) {
        queue.push(node.right);
      }
    }
    while (queue2.length > 0) {
      let node = queue2.shift();
      arr.push(node.data);

      if (node.left != null) {
        queue2.push(node.left);
      }
      if (node.right != null) {
        queue2.push(node.right);
      }
    }
    if (callback) {
      return callback(arr);
    }
    console.log(arr);
  }

  inOrder(callback) {
    let arr = [];
    let queue = [this.root.left];
    let queue2 = [this.root.right];
    while (queue.length > 0) {
      let node = queue.shift();
      arr.push(node.data);

      if (node.left != null) {
        queue.push(node.left);
      }
      if (node.right != null) {
        queue.push(node.right);
      }
    }
    arr.push(this.root.data);

    while (queue2.length > 0) {
      let node = queue2.shift();
      arr.push(node.data);

      if (node.left != null) {
        queue2.push(node.left);
      }
      if (node.right != null) {
        queue2.push(node.right);
      }
    }
    if (callback) {
      return callback(arr);
    }
    console.log(arr);
  }
  postOrder(callback) {
    let arr = [];
    let queue = [this.root.left];
    let queue2 = [this.root.right];
    while (queue.length > 0) {
      let node = queue.shift();
      arr.push(node.data);

      if (node.left != null) {
        queue.push(node.left);
      }
      if (node.right != null) {
        queue.push(node.right);
      }
    }

    while (queue2.length > 0) {
      let node = queue2.shift();
      arr.push(node.data);

      if (node.left != null) {
        queue2.push(node.left);
      }
      if (node.right != null) {
        queue2.push(node.right);
      }
    }
    arr.push(this.root.data);

    if (callback) {
      return callback(arr);
    }

    console.log(arr);
  }
  height(node) {
    if (node == null) {
      return 0;
    }
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }
  depth(node) {
    let sum = 0;
    const iterate = (value, node) => {
      if (node.data == value) {
        console.log(true + " " + value);
      }

      if (value > node.data) {
        node.right = iterate(value, node.right);
      } else if (value < node.data) {
        node.left = iterate(value, node.left);
      }
      sum++;
      return node;
    };

    this.root = iterate(node, this.root);
    console.log(sum);
  }
  isBalanced() {
    if (this.root.left == null || this.root.right == null) {
      return 0;
    }
    let leftHeight = this.height(this.root.left);
    let rightHeight = this.height(this.root.right);
    console.log(leftHeight);
    console.log(rightHeight);
    if (Math.abs(leftHeight - rightHeight) > 1) {
      console.log("Unbalanced");
    } else {
      console.log("Balanced");
    }
  }
  delete(value) {
    const deleteRec = (value, node, parent = null) => {
      if (!node) return null;

      if (value > node.data) {
        node.right = deleteRec(value, node.right, node);
      } else if (value < node.data) {
        node.left = deleteRec(value, node.left, node);
      } else {
        if (!node.left && !node.right) {
          if (parent) {
            if (parent.left === node) {
              parent.left = null;
            } else {
              parent.right = null;
            }
          } else {
            this.root = null;
          }
          return null;
        } else if (!node.left || !node.right) {
          const child = node.left ? node.left : node.right;
          if (parent) {
            if (parent.left === node) {
              parent.left = child;
            } else {
              parent.right = child;
            }
          } else {
            this.root = child;
          }
          return child;
        } else {
          const min = findMin(node.right);
          node.data = min.data;
          node.right = deleteRec(min.data, node.right, node);
        }
      }
      return node;
    };

    this.root = deleteRec(value, this.root);
  }
  findLeafNodes() {
    const leafNodes = [];
    const findLeafNodesRec = (node) => {
      if (!node) return;
      if (!node.left && !node.right) {
        leafNodes.push(node.data);
      }
      if (node.left) findLeafNodesRec(node.left);
      if (node.right) findLeafNodesRec(node.right);
    };

    findLeafNodesRec(this.root);
    return leafNodes;
  }
  reBalance() {
    const arrOfLeafs = this.findLeafNodes();
    let meter = 0;
    if (this.root.left == null || this.root.right == null) {
      return 0;
    }
    let leftHeight = this.height(this.root.left);
    let rightHeight = this.height(this.root.right);
    while (Math.abs(leftHeight - rightHeight) > 1) {
      this.delete(arrOfLeafs[meter]);
      leftHeight = this.height(this.root.left);
      rightHeight = this.height(this.root.right);
      meter++;
    }
  }
}
function findMin(node) {
  while (node.left) return (node = node.left);
  return node;
}
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const tree = new Tree(arr);
tree.reBalance();
tree.isBalanced();
tree.inOrder();
tree.preorder();
tree.postOrder();
