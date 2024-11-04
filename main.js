const { Tree } = require("./Classes.js");

function randomNumber() {
  return Math.floor(Math.random() * 100);
}

function createArray(array = [], i = 1) {
  if (i === 20) {
    return array;
  }
  array.push(randomNumber());
  return createArray(array, i + 1);
}

function printOrder(treee, order) {
  const values = [];
  const callback = (node) => {
    values.push(node.data);
  };

  switch (order) {
    case "preOrder":
      treee.preOrder(callback);
      break;
    case "postOrder":
      treee.postOrder(callback);
      break;
    case "inOrder":
    default:
      treee.inOrder(callback);
      break;
  }

  console.log(order + ": " + values.join(" "));
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const array = createArray();
const tree = new Tree(array);
// prettyPrint(tree.root);
console.log(tree.isBalanced());
printOrder(tree, "preOrder");
printOrder(tree, "inOrder");
printOrder(tree, "postOrder");
tree.insert(101);
tree.insert(120);
tree.insert(155);
tree.insert(103);
// prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.rebalance();
// prettyPrint(tree.root);
console.log(tree.isBalanced());
printOrder(tree, "preOrder");
printOrder(tree, "inOrder");
printOrder(tree, "postOrder");
