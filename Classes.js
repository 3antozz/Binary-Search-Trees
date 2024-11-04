const { mergeSort } = require("./MergeSort.js");
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(mergeSort(array));
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    }
    if (root.data === value) {
      return root;
    }
    if (value > root.data) {
      root.right = this.insert(value, root.right);
    }
    if (value < root.data) {
      root.left = this.insert(value, root.left);
    }
    return root;
  }

  getSuccessor(node) {
    const curr = node;
    while (curr != null && curr.left != null) {
      curr = curr.left;
    }
    return curr;
  }

  deleteItem(value, root = this.root) {
    if (root === null) {
      return root;
    }
    if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else {
      if (root.left === null) {
        return root.right;
      }

      if (root.right === null) {
        return root.left;
      }
      const successor = this.getSuccessor(root);
      root.data = successor.data;
      root.right = this.deleteItem(successor.data, root.right);
    }
    return root;
  }

  find(value, root = this.root) {
    if (root === null) {
      return "Value doesn't exist";
    }
    if (value === root.data) {
      return root;
    }

    if (value > root.data) {
      return this.find(value, root.right);
    } else if (value < root.data) {
      return this.find(value, root.left);
    }
  }

  levelOrder(callback, root = this.root) {
    if (!callback) {
      throw new Error("Please Provide a callback function!");
    }
    if (root === null) {
      return null;
    }
    let Queue = [root];
    while (Queue.length >= 1) {
      const node = Queue[0];
      callback(node);
      if (node.left != null) {
        Queue.push(node.left);
      }
      if (node.right != null) {
        Queue.push(node.right);
      }
      Queue.shift();
    }
  }

  levelOrderRecursive(callback, root = this.root, Queue = [root]) {
    if (!callback) {
      throw new Error("Please Provide a callback function!");
    }
    if (Queue.length === 0) {
      return;
    }
    callback(Queue[0]);
    if (root.left != null) {
      Queue.push(root.left);
    }
    if (root.right != null) {
      Queue.push(root.right);
    }
    Queue.shift();
    this.levelOrderRecursive(callback, Queue[0], Queue);
  }

  preOrder(callback, root = this.root) {
    if (!callback) {
      throw new Error("Please Provide a callback function!");
    }
    if (root === null) {
      return root;
    }
    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }
  inOrder(callback, root = this.root) {
    if (!callback) {
      throw new Error("Please Provide a callback function!");
    }
    if (root === null) {
      return root;
    }
    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }
  postOrder(callback, root = this.root) {
    if (!callback) {
      throw new Error("Please Provide a callback function!");
    }
    if (root === null) {
      return root;
    }
    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }
  height(node) {
    if (node === null) {
      return -1;
    }
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }
  depth(node, root = this.root) {
    if (root === null) {
      return -1;
    }
    if (root === node) {
      return 0;
    }
    if (node.data > root.data) {
      const rightDepth = this.depth(node, root.right);
      if (rightDepth !== -1) {
        return 1 + rightDepth;
      }
    } else if (node.data < root.data) {
      const leftDepth = this.depth(node, root.left);
      if (leftDepth !== -1) {
        return 1 + leftDepth;
      }
    }
    return -1;
  }

  heightDifference(node) {
    if (node === null) {
      return 0;
    }
    let leftHeight = this.heightDifference(node.left);
    if (leftHeight === -1) {
      return -1;
    }
    let rightHeight = this.heightDifference(node.right);
    if (rightHeight === -1) {
      return -1;
    }
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }
    return 1 + Math.max(leftHeight, rightHeight);
  }

  isBalanced(node = this.root) {
    return this.heightDifference(node) !== -1;
  }

  rebalance() {
    const newArray = [];
    function pushToArray(node) {
      newArray.push(node.data);
    }
    this.inOrder(pushToArray);
    this.root = this.buildTree(newArray);
  }
}

// const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const tree = new Tree(array);
// prettyPrint(tree.root);
// tree.insert(11);
// prettyPrint(tree.root);
// tree.deleteItem(5);
// prettyPrint(tree.root);
// console.log(tree.find(6345));
// tree.levelOrder(print);
// tree.levelOrderRecursive(print);
// tree.preOrder(print);
// tree.inOrder(print);
// tree.postOrder(print);
// console.log(tree.height(tree.find(8)));
// console.log(tree.depth(tree.find(67)));
// console.log(tree.isBalanced());
// tree.rebalance();
function print(node) {
  console.log(node.data);
}

module.exports = { Tree };
