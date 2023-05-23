import { opponent, startGame, appLoad } from './index.js';
import {
  placeShip,
  placeShipsRandom,
  resetBoard,
  turnShip,
} from './gameboard.js';
import { player } from './index.js';
import { gameLoop } from './gameLoop.js';

function clearContainer(containerID) {
  const div = document.getElementById(containerID);
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

function populateGrids(player1, player2) {
  initalizePlayerGrid(player1);
  populateOpponentGrid(player2);
}

function initalizePlayerGrid(user) {
  populatePlayerGrid(user);
  addGameboardEventListeners(user);
}

function populatePlayerGrid(user) {
  clearContainer('playerGameboard');
  const grid = document.getElementById('playerGameboard');
  let j = 0;
  user.gameboard.forEach((row) => {
    let i = 0;

    row.forEach((cell) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('gridPart');
      cellElement.dataset.contains = cell.hasShip;
      cellElement.dataset.cellHit = cell.isHit;
      cellElement.dataset.y = j;
      cellElement.dataset.x = i;

      if (cell.hasShip !== null) {
        cellElement.style.backgroundColor = '#B0BEC5';
      }
      if (cell.isHit === true) {
        cellElement.style.backgroundColor = '#FFD97D';
      }
      if (cell.hasShip !== null && cell.isHit === true) {
        cellElement.style.backgroundColor = '#EE6055';
      }
      grid.appendChild(cellElement);
      i++;
    });
    j++;
  });
}
function populateOpponentGrid(user) {
  clearContainer('opponentGameboard');
  const grid2 = document.getElementById('opponentGameboard');
  let j = 0;
  user.gameboard.forEach((row) => {
    let i = 0;

    row.forEach((cell) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('gridPart');
      cellElement.dataset.contains = cell.hasShip;
      cellElement.dataset.cellHit = cell.isHit;
      cellElement.dataset.y = j;
      cellElement.dataset.x = i;
      cellElement.addEventListener('click', (e) => {
        const x = e.target.dataset.x;
        const y = e.target.dataset.y;
        gameLoop(x, y);
      });
      if (cell.isHit === true) {
        cellElement.style.backgroundColor = '#FFD97D';
      }
      if (cell.hasShip !== null && cell.isHit === true) {
        cellElement.style.backgroundColor = '#EE6055';
      }
      grid2.appendChild(cellElement);
      i++;
    });
    j++;
  });
}

let selectedPart;
let shipKey;

function addGameboardEventListeners(user) {
  const gameboard = document.getElementById('playerGameboard');

  gameboard.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  gameboard.addEventListener('dragenter', (event) => {
    event.preventDefault();
  });

  gameboard.addEventListener('drop', (event) => {
    event.preventDefault();
    const cell = event.target;
    const isVertical = user.ships[shipKey].vertical;
    console.log(isVertical);
    console.log(selectedPart);
    const x = Number(cell.dataset.x - (isVertical ? 0 : selectedPart));
    const y = Number(cell.dataset.y - (isVertical ? selectedPart : 0));
    console.log(x, y);
    placeShip(user.gameboard, user.ships[shipKey], x, y);
    populatePlayerGrid(user);
    displayShips(user.ships);
  });
}

function addDragability(ships) {
  const draggables = document.querySelectorAll('.draggable');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', (event) => {
      shipKey = event.target.dataset.shipKey;
      draggable.classList.add('dragging');
    });
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });
    draggable.addEventListener('mousedown', (event) => {
      selectedPart = Number(event.target.dataset.partIndex);
    });

    // need to pass ships through properly to the event listener?
    //target parent of clicked
    draggable.addEventListener('click', (event) => {
      console.log(event.currentTarget);
      const shipKey = event.currentTarget.dataset.shipKey;
      const ship = ships[shipKey];
      console.log(ship);
      console.log(ship.vertical);
      ship.vertical = !ship.vertical;
      displayShips(ships);
    });
  });
}

function displayShips(ships) {
  clearContainer('playerShips');
  const playerShips = document.getElementById('playerShips');
  ships.forEach((ship) => {
    const newShip = document.createElement('div');
    newShip.classList.add('ship');

    newShip.dataset.shipKey = ship.key;
    newShip.dataset.isPlaced = ship.isPlaced;
    newShip.dataset.isVertical = ship.vertical;

    if (ship.isPlaced === true) {
      newShip.setAttribute('draggable', false);
      newShip.classList.add('placed');
    } else {
      newShip.setAttribute('draggable', true);
      newShip.classList.add('draggable');
    }
    for (let i = 0; i < ship.length; i++) {
      const shipPart = document.createElement('div');
      shipPart.classList.add('shipPart');
      shipPart.dataset.partIndex = i;
      newShip.appendChild(shipPart);
    }
    playerShips.appendChild(newShip);
  });
  addDragability(ships);
}

function addButtonEventListeners() {
  const clearBtn = document.getElementById('clearBoard');
  const startBtn = document.getElementById('startGame');
  const randomBtn = document.getElementById('randomBoard');
  const replayBtn = document.getElementById('playAgain');

  clearBtn.addEventListener('click', () => {
    resetBoard(player);
  });

  randomBtn.addEventListener('click', () => {
    placeShipsRandom(player);
    populatePlayerGrid(player);
    displayShips(player.ships);
  });

  startBtn.addEventListener('click', () => {
    const playerName = document.getElementById('nameInput');
    if (playerName.value === '') {
      return;
    }
    player.name = playerName.value;
    playerName.value = '';
    startGame();
  });

  replayBtn.addEventListener('click', () => {
    player.resetVariables();
    opponent.resetVariables();
    setElementDisplay('winner-popup', 'none');
    appLoad();
  });
}

function setElementDisplay(elementId, displayValue) {
  const element = document.getElementById(elementId);
  element.style.display = displayValue;
}

function setPlayerTitleName() {
  const playerName = document.getElementById('playerName');
  playerName.textContent = player.name;
}

export {
  populateGrids,
  displayShips,
  addDragability,
  addButtonEventListeners,
  populatePlayerGrid,
  populateOpponentGrid,
  initalizePlayerGrid,
  setElementDisplay,
  setPlayerTitleName,
};
