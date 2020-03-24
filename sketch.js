const sizes = 50;
const shift = 50;
const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const SUDOKUSIZE = 9;
var sudoku;

var found = 0


function createSudoku() {
  // sudoku = [
  //   ["", "4", "9", "", "", "", "", "", ""],
  //   ["", "", "", "", "", "", "8", "9", "4"],
  //   ["", "3", "1", "6", "", "9", "", "", ""],
  //   ["4", "", "", "", "", "2", "7", "3", ""],
  //   ["7", "6", "3", "", "", "5", "2", "", ""],
  //   ["", "", "", "3", "", "", "", "", "1"],
  //   ["1", "", "7", "", "9", "6", "", "8", "2"],
  //   ["", "", "", "2", "1", "", "", "", ""],
  //   ["", "8", "", "", "", "3", "", "", ""],
  // ]
  // sudoku = [
  //   ["3", "", "", "9", "", "", "", "", "6"],
  //   ["", "", "", "", "", "", "", "9", "1"],
  //   ["", "", "", "4", "8", "1", "", "", ""],
  //   ["", "8", "", "", "9", "", "", "7", ""],
  //   ["", "9", "", "", "", "", "", "8", "3"],
  //   ["5", "3", "2", "", "", "", "", "", ""],
  //   ["7", "2", "4", "", "", "", "", "", ""],
  //   ["", "", "", "6", "", "3", "5", "", ""],
  //   ["", "", "", "", "4", "8", "1", "2", ""],
  // ]
  sudoku = [
    ["3", "", "", "9", "", "", "", "", "6"],
    ["", "", "", "", "", "", "", "9", "1"],
    ["", "", "", "4", "8", "1", "", "", ""],
    ["", "8", "", "", "9", "", "", "7", ""],
    ["", "9", "", "", "", "", "", "8", "3"],
    ["5", "3", "2", "", "", "", "", "1", ""],
    ["7", "2", "4", "", "", "", "", "", ""],
    ["", "1", "", "6", "2", "3", "5", "4", "7"],
    ["", "", "", "", "4", "8", "1", "2", ""],
  ]
}

function drawSudokuSquare(i, j, c) {
  var bothPair = (i + j) % 2 == 0
  if ( bothPair ) {
    fill(color(140, 140, 140));
  } else {
    noFill();
  }
  square(shift + i*sizes, shift + j*sizes, sizes);

  push();
    fill(color(255, 204, 0));
    noStroke();
    textSize(16);
    textAlign(CENTER);
    text(c, shift + 25 + i*sizes, shift + 30 + j*sizes);
  pop();
}


function drawSudoku() {
  for (let i = 0; i < SUDOKUSIZE; i++) {
    for (let j = 0; j < SUDOKUSIZE; j++) {
      const el = sudoku[i][j];
      drawSudokuSquare(j, i, el);
    }
  }
}


function getSquare(i, j) {
  var i0 = floor(i/3)*3
  var j0 = floor(j/3)*3


  return [
    sudoku[i0][j0], sudoku[i0][j0 + 1], sudoku[i0][j0 + 2],
    sudoku[i0 + 1][j0], sudoku[i0 + 1][j0 + 1], sudoku[i0 + 1][j0 + 2],
    sudoku[i0 + 2][j0], sudoku[i0 + 2][j0 + 1], sudoku[i0 + 2][j0 + 2],
  ];
}

function solvePosition(i, j) {
  var missingNumbers = [...NUMBERS]

  for (let i = 0; i < SUDOKUSIZE; i++) {
    const el = sudoku[i][j]
    missingNumbers = missingNumbers.filter(mn => mn != el)
  }
  for (let j = 0; j < SUDOKUSIZE; j++) {
    const el = sudoku[i][j];
    missingNumbers = missingNumbers.filter(mn => mn != el)
  }
  const square = getSquare(i, j)

  for (let j = 0; j < square.length; j++) {
    const el = square[j];
    missingNumbers = missingNumbers.filter(mn => mn != el)
  }

  if(missingNumbers.length == 1) {
    // console.log("FOUND ONE!!", i, j)
    sudoku[i][j] = missingNumbers[0];
  }
}

function checkSudoku() {

}


function solveSudoku() {
  found = 0;
  for (let i = 0; i < SUDOKUSIZE; i++) {
    for (let j = 0; j < SUDOKUSIZE; j++) {
      const el = sudoku[i][j];
      if(el === "")
        solvePosition(i, j);
      else {
        found++;
      }
    }
  }

  // console.log("solveSudoku", found)
  // if(found == SUDOKUSIZE*SUDOKUSIZE) {
  //   checkSudoku()
  // }
}

function setup() {
  createSudoku();

  createCanvas(1000, 1000);
}

function mousePressed() {
  solveSudoku();
}

// function doubleClicked() {
//   createSudoku();
// }

function draw() {
  // background(220);

  let c = color(255, 204, 0); // Define color 'c'
  strokeWeight(4);
  noFill(c); // Use color variable 'c' as fill color
  stroke(c); // Don't draw a stroke around shapes
  drawSudoku();

  push()
    square(700, 50, sizes)
    textSize(16);
    textAlign(CENTER);
    text(found, 725, 80);
  pop()
  // solveSudoku();

}