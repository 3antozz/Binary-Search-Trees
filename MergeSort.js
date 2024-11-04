function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  let left = array.slice(0, array.length / 2);
  let right = array.slice(array.length / 2, array.length);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let newArray = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      newArray.push(left[i]);
      i++;
    } else if (left[i] === right[j]) {
      i++;
    } else {
      newArray.push(right[j]);
      j++;
    }
  }
  return newArray.concat(left.slice(i).concat(right.slice(j)));
}

module.exports = { mergeSort };
