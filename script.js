/* - state erstellen mit x & o ✅
- math random zum auswählen des ersten Spielers ✅
- zeige spieler mit inner HTML & inlinestyle outline an ✅
- clickevent auf spieler
- funkion1 = 
    - spieler zwischenspeichern ✅
    - clickevent auf grid ✅
    - über event div erkennen ✅
- funktion2 =
    - state checken ob div bereits unter x oder o steht ✅
    - "if" frei speicher in state under x oder o ✅
- funktion3 =
    - checke (for schleife) am Ende ob x oder o 3xa || 3xb || 3xc || 3x1 || 3x2 || 3x3
         - if (a1,b1,c1 || b1,b2,b3)
    - checke am Ende ob je 1x abc und 123 vorhanden ist
    - if true = "you win!!"
    - else select player x/o
- funktion4 =
    - resume game x: [], o: [] ✅
- function XX =
    Pro Runde darf nur 1 zug gemacht werden ✅
*/

viewPlayer = document.getElementById("view-player");
btnX = document.getElementById("player-x");
btnO = document.getElementById("player-o");
btnRestart = document.getElementById("restart");
board = document.getElementById("board");

const state = {
  x: [],
  o: [],
  activePlayer: firstPlayer(),
};
let activePlayer = state.activePlayer;
console.log(state);
renderActivePlayer();

function firstPlayer() {
  /* Math random auslagern damit function für jeden Zug verwendet werden kann. Ggf bdr & state edit auslagern zum recyclen. */
  let player = Math.floor(Math.random() * 2);
  if (player === 1) {
    return "O";
  } else {
    return "X";
  }
}

function renderActivePlayer() {
  if (state.activePlayer === "X") {
    btnX.style.border = "0.15rem solid var(--clr-blue-01t)";
    viewPlayer.innerText = "X";
    btnO.style.border = "";
  } else {
    btnO.style.border = "0.15rem solid var(--clr-blue-01t)";
    viewPlayer.innerText = "O";
    btnX.style.border = "";
  }
}

function toggleActivePlayer() {
  if (state.activePlayer === "X") {
    state.activePlayer = "O";
  } else {
    state.activePlayer = "X";
  }
}

function checkFreeSquare(target) {
  if (target.innerText === "") {
    return true;
  }
  return false;
}

function checkWin() {
  const win = [
    ["a1", "b2", "c3"],
    ["a3", "b2", "c1"],
    ["a1", "a2", "a3"],
    ["b1", "b2", "b3"],
    ["c1", "c2", "c3"],
    ["a1", "b1", "c1"],
    ["a2", "b2", "c2"],
    ["a3", "b3", "c3"],
  ];
  let activeScoreList;
  if (state.activePlayer === "X") {
    activeScoreList = state.x;
  } else {
    activeScoreList = state.o;
  }

  console.log(win.includes(activeScoreList));
  for (let i = 0; i < activeScoreList.length; i++) {
    //console.log(activeScoreList.includes(win[i]));
  }
  //alert("You win!");
}

function addSign(e) {
  let target = e.target;
  let squareId;
  if (target.tagName === "DIV") {
    squareId = target.id;
  }
  checkFreeSquare(target);
  if (checkFreeSquare(target) === true) {
    target.innerText = state.activePlayer;
    if (state.activePlayer === "X") {
      state.x.push(squareId);
    } else {
      state.o.push(squareId);
    }
  }
  state.x.sort();
  state.o.sort();
  checkWin();
  toggleActivePlayer();
  renderActivePlayer();
  console.log(state);
}

function emptyState() {
  board.innerHTML = `<div id="a1" class="a1"></div>  <div id="a2" class="a2"></div>
  <div id="a3" class="a3"></div>
  <div id="b1" class="b1"></div>
  <div id="b2" class="b2"></div>
  <div id="b3" class="b3"></div>
  <div id="c1" class="c1"></div>
  <div id="c2" class="c2"></div>
  <div id="c3" class="c3"></div>`;
  state.x = [];
  state.o = [];
}

board.addEventListener("click", addSign);
btnRestart.addEventListener("click", emptyState);
