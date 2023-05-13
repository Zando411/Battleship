import { placeShip } from './gameboard.js';

function clearPlayerGrid(user) {
  const div = document.getElementById(`playerGameboard`);
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

function clearOpponentGrid(user) {
  const div = document.getElementById(`opponentGameboard`);
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

function populateGrids(player1, player2) {
  populatePlayerGrid(player1);
  populateOpponentGrid(player2);
}

function populatePlayerGrid(user) {
  clearPlayerGrid(user);
  addGameboardEventListeners(user);
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
      cellElement.addEventListener('click', (e) => {
        console.log(e.target.dataset.x, e.target.dataset.y);
      });
      grid.appendChild(cellElement);
      i++;
    });
    j++;
  });
}
function populateOpponentGrid(user) {
  clearOpponentGrid(user);
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
      if (cell.hasShip !== null) {
        cellElement.style.backgroundColor = '#B0BEC5';
      }
      cellElement.addEventListener('click', (e) => {
        console.log(e.target.dataset.x, e.target.dataset.y);
      });
      grid2.appendChild(cellElement);
      i++;
    });
    j++;
  });
}

export function addGameboardEventListeners(user) {
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
    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    const shipKey = Number(event.dataTransfer.getData('shipKey'));

    console.log(typeof x);
    console.log(typeof y);
    console.log(typeof shipKey);
    console.log(user.gameboard, user.ships[shipKey], x, y);
    placeShip(user.gameboard, user.ships[shipKey], x, y);
    populatePlayerGrid(user);
  });
}

function addDragability() {
  const draggables = document.querySelectorAll('.draggable');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('shipKey', event.target.dataset.shipKey);
      draggable.classList.add('dragging');
    });
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });
  });
}

function displayShips(ships) {
  const playerShips = document.getElementById('playerShips');
  ships.forEach((ship) => {
    const newShip = document.createElement('div');
    newShip.classList.add('ship');
    newShip.classList.add('draggable');
    newShip.dataset.shipKey = ship.key;
    newShip.dataset.isPlaced = ship.isPlaced;
    newShip.setAttribute('draggable', true);
    for (let i = 0; i < ship.length; i++) {
      const shipPart = document.createElement('div');
      shipPart.classList.add('shipPart');
      newShip.appendChild(shipPart);
    }
    playerShips.appendChild(newShip);
  });
  addDragability();
}

export { populateGrids, displayShips, addDragability };
