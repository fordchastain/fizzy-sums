/**
 *
 * Given the size of a sum, generate and return a new puzzle.
 *
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
  let operations = [];
  for (let i = 0; i < (size-1)*size*2; i++)
    operations.push(symbols[Math.floor(Math.random() * 4)]);

  let evalArr = [];
  for (let i = 0; i < (size*2)-1; i++) {
    let innerArr = [];
    for (let j = 0; j < (size*2)-1; j++) {
      if (j%2===0 && i%2===0) 
        innerArr.push(numbers.shift());
      else if ((j%2===0 && i%2!==0) || (j%2!==0 && i%2===0))
        innerArr.push(operations.shift());
      else
        innerArr.push("");
    }
    evalArr.push(innerArr);
  }
  
  let rowSums = [];
  for (let i = 0; i < (size*2)-1; i++)
    if (i%2===0) rowSums.push(eval(evalArr[i].join(" ").trim()));

  let colSums = [];
  const getCol = (arr, n) => arr.map(x => x[n]);
  for (let i = 0; i < (size*2)-1; i++)
    if (i%2===0) colSums.push(eval(getCol(evalArr, i).join(" ").trim()));

  console.log({
    arr: evalArr,
    rowSums: rowSums,
    colSums: colSums
  });
}