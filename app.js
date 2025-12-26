let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newgame");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");

let turnO = true;
let count = 0; // counts total moves
let winner = false; // flag to track winner

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  winner = false;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // player O
      box.innerText = "O";
      box.classList.add("O");
      box.classList.remove("X");
      turnO = false;
    } else {
      // player X
      box.innerText = "X";
      box.classList.add("X");
      box.classList.remove("O");
      turnO = true;
    }

    box.disabled = true;
    count++;

    checkWinner(); // sets winner = true if someone wins
    draw(); // if no winner and 9 moves -> draw
  });
});

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("X", "O");
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winPlayer) => {
  winner = true; // mark that someone has won
  msg.innerText = `Congratulation, Winner is ${winPlayer}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos2Val !== "" && pos3val !== "") {
      if (pos1val === pos2Val && pos2Val === pos3val) {
        showWinner(pos1val);
        return; // no need to check further
      }
    }
  }
};

const draw = () => {
  // all 9 moves done AND nobody has won
  if (count === 9 && !winner) {
    msg.innerText = `Oops! Game is "DRAW"`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
