let ChanceForPlayer1: boolean = true;
let state: string = "None";

const chns = document.querySelector(".Chance");
function updateChanceDisplay() {
  if (!chns) return;
  chns.innerHTML = "";
  const playerName = document.createElement("h2");
  playerName.innerHTML = ChanceForPlayer1
    ? `<span style = "color: rgb(240, 146, 232)">Chance: Player X</span>`
    : ` <span style = "color: rgb(240, 146, 232)">Chance: Player O</span>`;
  playerName.classList.add("highlight");
  chns.append(playerName);
}
updateChanceDisplay();

const arr: string[] = [
  "#t0",
  "#t1",
  "#t2",
  "#t3",
  "#t4",
  "#t5",
  "#t6",
  "#t7",
  "#t8",
];

const winningPatterns: string[][] = [
  ["#t0", "#t1", "#t2"],
  ["#t3", "#t4", "#t5"],
  ["#t6", "#t7", "#t8"],
  ["#t0", "#t3", "#t6"],
  ["#t1", "#t4", "#t7"],
  ["#t2", "#t5", "#t8"],
  ["#t0", "#t4", "#t8"],
  ["#t6", "#t4", "#t2"],
];

let arrForX: string[] = [];
let arrForO: string[] = [];
let gameActive: boolean = true;

const checkForWinner = (playerArr: string[]): boolean => {
  return winningPatterns.some((pattern) =>
    pattern.every((cell) => playerArr.includes(cell))
  );
};

function isDraw() {
  return arr.every(
    (cellId) =>
      (document.querySelector(cellId) as HTMLTableCellElement).textContent ===
        "X" ||
      (document.querySelector(cellId) as HTMLTableCellElement).textContent ===
        "O"
  );
}

const resetBoard = () => {
  for (let val of arr) {
    const t = document.querySelector(val);
    if (t) (t as HTMLElement).textContent = "";
  }
  arrForX = [];
  arrForO = [];
  state = "None";
  ChanceForPlayer1 = true;
  gameActive = true;
  updateChanceDisplay();
};

const resetButton = document.querySelector(".button");
if (resetButton) {
  resetButton.addEventListener("click", resetBoard);
}

function displayWinner(message: string) {
  const popup = document.getElementById("popup");
  const popupMsg = document.getElementById("popup-message");
  if (popup && popupMsg) {
    popupMsg.textContent = message;
    popup.classList.remove("hidden");
  }
}

const popupCloseBtn = document.getElementById("popup-close");
if (popupCloseBtn) {
  popupCloseBtn.addEventListener("click", () => {
    const popup = document.getElementById("popup");
    if (popup) popup.classList.add("hidden");
  });
}

// Add event listeners for all cells:
for (let cellId of arr) {
  const cell = document.querySelector(cellId);
  if (cell) {
    cell.addEventListener("click", function () {
      if (!gameActive) return;
      if (cell.textContent) return;
      if (ChanceForPlayer1) {
        cell.textContent = "X";
        arrForX.push(cellId);
        if (checkForWinner(arrForX)) {
          state = "Player X is Winner";
          displayWinner(state);
          gameActive = false;
          resetBoard();
          return;
        }
      } else {
        cell.textContent = "O";
        arrForO.push(cellId);
        if (checkForWinner(arrForO)) {
          state = "Player O is Winner";
          displayWinner(state);
          gameActive = false;
          resetBoard();
          return;
        }
      }
      if (isDraw()) {
        state = "Draw";
        displayWinner(state);
        gameActive = false;
        resetBoard();
        return;
      }

      ChanceForPlayer1 = !ChanceForPlayer1;
      updateChanceDisplay();
    });
  }
}
