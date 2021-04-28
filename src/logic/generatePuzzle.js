import * as calc from './calculate.js'

/**
 * Given the size of a sum, generate and return a new puzzle.
 */
export default function generatePuzzle(size) {
  let numbers = [];
  for (let i = 0; i < size*size; i++) 
    numbers.push(i+1);

  // shuffle array
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  let symbols = ['+', '-', '*', '/'];
  let evalArr = [];
  for (let i = 0; i < (size*2)-1; i++) {
    let innerArr = [];
    for (let j = 0; j < (size*2)-1; j++) {
      if (j%2===0 && i%2===0) 
        innerArr.push(numbers.shift());
      else if ((j%2===0 && i%2!==0) || (j%2!==0 && i%2===0))
        innerArr.push(symbols[Math.floor(Math.random() * 3)]);
      else
        innerArr.push("");
    }
    evalArr.push(innerArr);
  }
  
  let rowSums = calc.calculateRowSums(evalArr, size);
  let colSums = calc.calculateColSums(evalArr, size);

  return ({
    arr: evalArr,
    rowSums: rowSums,
    colSums: colSums
  });
}