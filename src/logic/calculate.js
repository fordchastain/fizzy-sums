/**
 * Calculates the sum of a row in the puzzle array
 */
export function calculateRow(arr, i) {
  if (i >= arr.length)
    return 0;

  return eval(arr[i].join(" ").trim());
}

/**
 *  Get a column from the puzzle array
 */
export function getCol(arr, i) {
  if (i >= arr.length)
    return null;

  return arr.map(x => x[i]);
}

/**
 *  Calculates the sum of a column in the puzzle array
 */
export function calculateCol(arr, i) {
  if (i >= arr.length)
    return 0;
  
  return eval(getCol(arr, i).join(" ").trim());
}

/**
 *  Calculates all row sums and populates an array with the results
 */
export function calculateRowSums(arr, size) {
  let rowSums = [];
  for (let i = 0; i < (size*2)-1; i++) {
    if (i%2===0) {
      // Try replacing operations with division
      for (let j = 1; j < arr.length; j+=2) {
        if (arr[i][j] === '+' || arr[i][j] === '-' || arr[i][j] === '*') {
          let original = arr[i][j];
          arr[i][j] = '/';
          let sum = calculateRow(arr, i); 
          if (sum - Math.floor(sum) !== 0) // Revert operation if sum wasn't an integer
            arr[i][j] = original;
        }
      }
      rowSums.push(calculateRow(arr, i));
    }
  }
  return rowSums;
}

/**
 *  Calculates all column sums and populates an array with the results
 */
export function calculateColSums(arr, size) {
  let colSums = [];
  for (let i = 0; i < (size*2)-1; i++) {
    if (i%2===0) {
      let col = getCol(arr, i);
      for (let j = 1; j < col.length; j+=2) {
        if (col[j] === '+' || col[j] === '-' || col[j] === '*') {
          let original = col[j];
          arr[j][i] = '/';
          let sum = calculateCol(arr, i);
          if (sum - Math.floor(sum) !== 0)
            arr[j][i] = original;
        }
      }
      colSums.push(calculateCol(arr, i));
    }
  }
  return colSums;
}