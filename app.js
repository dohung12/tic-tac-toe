const Gameboard = (() => {
  let gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function updateTile(playerOrComputer, tile) {
    const icon = document.createElement("i");
    if (playerOrComputer === "player") {
      icon.setAttribute("class", "fas fa-times");
    } else {
      icon.setAttribute("class", "far fa-circle");
    }
    tile.appendChild(icon);
  }

  function add(row, col, playerOrComputer) {
    const tile = document.querySelector(`[data-id="${row}${col}"]`);
    updateTile(playerOrComputer, tile);
    gameBoard[row][col] = (() => (playerOrComputer === "player" ? "x" : "o"))();

    if (checkWin()) {
      displayWinner(playerOrComputer);
    } else if (!checkEmpty()) {
      displayMatchTie();
    }
  }

  function displayMatchTie() {
    // TODO
    console.log("Match tie");
  }

  function displayWinner(playerOrComputer) {
    //   TODO
    // disable all btns until press restart
    console.log(`Congrats! ${playerOrComputer} has  won`);
  }

  function checkEmpty() {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        if (gameBoard[i][j] === "") {
          return true;
        }
      }
    }
    return false;
  }

  function checkWin() {
    let flag = false;
    function checkRow(row) {
      return (
        gameBoard[row][0] === gameBoard[row][1] &&
        gameBoard[row][0] === gameBoard[row][2] &&
        gameBoard[row][0] !== ""
      );
    }
    function checkCol(col) {
      return (
        gameBoard[0][col] === gameBoard[1][col] &&
        gameBoard[0][col] === gameBoard[2][col] &&
        gameBoard[0][col] !== ""
      );
    }
    function checkMainDiagonal() {
      return (
        gameBoard[0][0] === gameBoard[1][1] &&
        gameBoard[0][0] === gameBoard[2][2] &&
        gameBoard[0][0] !== ""
      );
    }
    function checkAntiDiagonal() {
      return (
        gameBoard[0][2] === gameBoard[1][1] &&
        gameBoard[0][2] === gameBoard[2][0] &&
        gameBoard[0][2] !== ""
      );
    }

    for (let i = 0; i <= 2; i++) {
      flag = flag || checkRow(i) || checkCol(i);
    }

    flag = flag || checkAntiDiagonal() || checkMainDiagonal();
    return flag;
  }

  return { add, gameBoard, checkWin };
})();
