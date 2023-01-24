/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

// TODO: set "board" to empty HEIGHT x WIDTH matrix array
const makeBoard = () => {
  // [...Array(height)] creates an array with 6 undefined items
  //// ... the spread operator makes 6 seperate items
  //// Array is called putting those 6 items in an array
  // map is called on those 6 undefined items
  //// creating 6 arrays of 7 undefined items
  //// fill is used to change the items from undefined to null
  return (board = [...Array(HEIGHT)].map(() => [...Array(WIDTH)].fill(null)));
};

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById("board");

  // TODO: add comment for this code
  // top is a variable creating a table row element
  // then the id="column-top" is given to the table row
  // finally we add a click event listener to that table row
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // we iterate through the width
  // this dynamically adds an id from 0-5
  // to each headCell/td element
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //We iterate trough the height (0-5) and width (0-6)
  // creat a table row and cell(tabledata)
  // we dynamically set the ids for each cell
  // starting from 0-0 to 5-6 through the grid
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
};

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
  // TODO: write the real version of this, rather than always returning 0
  // define y coordinence to = the height of 5
  // we decrement from 5 to 0
  // through each iteration we check
  // if the boards current position is empty
  // y (the first empty cell in the column) is returned
  // no empty cell returns null
  let y = HEIGHT - 1;
  for (y; y >= 0; y--) {
    if (board[y][x] === null) {
      return y;
    }
  }
  return null;
};

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
  // TODO: make a div and insert into correct table cell
  // makes a div and assigns className of piece and player 1 or 2
  let position = document.getElementById(`${y}-${x}`);
  let piece = document.createElement("div");
  piece.className += `piece p${currPlayer}`;
  position.append(piece);
};

/** endGame: announce game end */

const endGame = (msg) => {
  // TODO: pop up alert message
  alert(msg);
};

/** handleClick: handle click of column top to play piece */

const handleClick = (evt) => {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!!!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  board[0].every(function (cell) {
    if (cell !== null) {
      return endGame("Draw");
    }
  });

  // switch playerss
  // TODO: switch currPlayer 1 <-> 2
  currPlayer++;
  currPlayer > 2 ? (currPlayer = 1) : (currPlayer = 2);
};

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  //iterate through height (0-5)
  // iterates through width (0-6)
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // checks for win of horizontal combination
      // x reps width while y reps height
      // we add to x to check different winning combos
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      // checks for win of vertical combination
      // we add to y to check different winning combos
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      // checks for win of diagonally to the right combination
      // we add to y and x to check different winning combos
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      // checks for win of diagonally to the left combination
      // we add to y and subtract from x to check different winning combos
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];
      // if any win occurs we return true
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
