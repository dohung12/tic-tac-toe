const Players = (playerName) => {
  this.name = playerName;

  const displayWon = () => {
    return `${playerName} has won!`;
  };

  return { name: this.name, displayWon };
};

const Gameboard = (() => {
  let gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  function add(row, col, playerOrComputer) {
    if (gameBoard[row][col] === "") {
      DisplayControl.updateTile(row, col, playerOrComputer);
      updateGameBoard(row, col, playerOrComputer);

      checkGameStatus(playerOrComputer);
    }
  }
  function checkGameStatus(playerOrComputer) {
    if (checkWin()) {
      displayWinner(playerOrComputer);
    } else if (!checkEmpty()) {
      displayMatchTie();
    } else if (checkEmpty() && playerOrComputer === "player") {
      computerTurn();
    }
  }
  function updateGameBoard(row, col, playerOrComputer) {
    if (playerOrComputer === "player") {
      gameBoard[row][col] = "X";
    } else {
      gameBoard[row][col] = "O";
    }
  }
  function computerTurn() {
    function getEmptyTile() {
      let localArr = [];
      for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
          if (gameBoard[i][j] === "") {
            localArr.push([i, j]);
          }
        }
      }
      return localArr[Math.floor(Math.random() * localArr.length)];
    }

    const index = getEmptyTile();
    add(index[0], index[1], "computer");
  }
  function displayMatchTie() {
    DisplayControl.disable();
    DisplayControl.displayGameStatus("Match tie");
  }
  function displayWinner(playerOrComputer) {
    // disable all btns until press restart
    DisplayControl.disable();
    if (playerOrComputer === "player") {
      DisplayControl.displayPlayerWon();
    } else {
      DisplayControl.displayGameStatus("Computer has won!");
    }
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
  function resetBoard() {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        gameBoard[i][j] = "";
      }
    }
  }
  return { add, resetBoard };
})();

const DisplayControl = (() => {
  const tileBtns = document.querySelectorAll(".board-tile");
  const restartBtn = document.querySelector(".restart-btn");
  const matchResult = document.querySelector(".match-result");
  let player;
  // EVENT HANDLER
  tileBtns.forEach((btn) => {
    btn.addEventListener("click", tileClickHandler);
  });

  restartBtn.addEventListener("click", restart);

  // FUNCTIONS

  function tileClickHandler(e) {
    const tileIndex = e.currentTarget.dataset.id;
    Gameboard.add(tileIndex[0], tileIndex[1], "player");
  }

  function updateTile(row, col, playerOrComputer) {
    const tile = document.querySelector(`[data-id="${row}${col}"]`);
    const icon = document.createElement("i");
    if (playerOrComputer === "player") {
      icon.setAttribute("class", "fas fa-times");
    } else {
      icon.setAttribute("class", "far fa-circle");
    }
    tile.appendChild(icon);
  }

  function displayGameStatus(str) {
    matchResult.innerText = str;
  }

  function displayPlayerWon() {
    displayGameStatus(userInput.displayWon());
  }

  function disable() {
    tileBtns.forEach((btn) => btn.setAttribute("disabled", true));
  }

  function restart() {
    matchResult.textContent = "Have a nice game";
    restartBtn.innerText = "Restart ";
    tileBtns.forEach((btn) => {
      btn.innerHTML = "";
      btn.removeAttribute("disabled");
    });

    Gameboard.resetBoard();
  }

  return { updateTile, restart, disable, displayGameStatus, displayPlayerWon };
})();

const userInput = (() => {
  const form = document.querySelector("form");
  let playerName = "player";

  form.addEventListener("submit", formSubmitHandler);

  function formSubmitHandler(e) {
    e.preventDefault();
    const input = document.querySelector("#name");
    playerName = input.value;
    input.value = "";
  }

  function displayWon() {
    return playerName + " has won";
  }

  return { displayWon };
})();
