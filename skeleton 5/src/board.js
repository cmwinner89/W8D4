// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let grid = [];
  for (let i = 0; i < 8; i++) {
    grid.push([]);
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
       if ((i === 3 && j === 3) || (i === 4 && j === 4)){
         grid[i][j] = new Piece('white');
       }
      else if ((i === 3 && j === 4) || (i === 4 && j === 3)) {
        grid[i][j] = new Piece('black');
      }
      else {
        grid[i][j] = undefined;
      }
    }
  }
  return grid; 
};

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  if (pos[0] < 0 || pos[1] < 0) {
    return false;
  }
  else if (pos[0] > 7 || pos[1] > 7) {
    return false;
  }
  else {
    return true; 
  }
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  let i = pos[0];
  let j = pos[1];
  if (this.isValidPos(pos)) {
    return this.grid[i][j]; 
  }
  else {
    throw new Error('Not valid pos!');
  }
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  let i = pos[0];
  let j = pos[1];
  if (this.isValidPos(pos)){
    let pieceOnBoard = this.grid[i][j];

    if (pieceOnBoard === undefined){
      return undefined;
    }
    else if (pieceOnBoard.color === color){ 
      return true;
    }
    else if (pieceOnBoard.color != color){
      return false;
    }
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  let i = pos[0];
  let j = pos[1];
  // debugger
  if (this.isValidPos(pos)){
    let pieceOnBoard = this.grid[i][j];
    if (pieceOnBoard === undefined){
      return false;
    }
    else{
      return true;
    }
  }
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip){

  if (piecesToFlip) {
    // debugger
    piecesToFlip.push(pos);
  } else {
    // debugger
    piecesToFlip = [];
  }

  let [i, j] = pos
  let newPos = [i + dir[0], j+ dir[1]];
  // i = pos[0], j = pos[1];

  // when it hits the end of the board return arr
  if (!this.isValidPos(newPos)){
    // debugger
    return [];
  }
  
  //when it hits a undefind piece return arr
  if (!this.isOccupied(newPos)){
    // debugger
    return [];
  }

  // when hits another piece of the same color retrun arr
  if (this.isMine(newPos, color)){
    // debugger
    return piecesToFlip;
  }
  

  //Recursive Steps
  //move grid of pos to pos + dir 
  // debugger
  // piecesToFlip.push(newPos);
  
  // pos[0] += dir[0];
  // pos[1] += dir[1];
  // debugger
  return this._positionsToFlip(newPos, color, dir, piecesToFlip);


  // let newPos = pos;
  // pos = newPos
  

};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if ((this.isOccupied(pos)) && (this.isMine(pos, color))) {
    return false;
  } else {
    return true; 
  }
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};



/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};




/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};


// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE