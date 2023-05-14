import { placeShip } from './gameboard.js';

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
  console.log(user.gameboard);
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

let selectedPart;

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
    const shipKey = Number(event.dataTransfer.getData('shipKey'));
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
    draggable.addEventListener('mousedown', (e) => {
      selectedPart = Number(e.target.dataset.partIndex);
      console.log(selectedPart);
    });
  });

  // document.addEventListener('keydown', (event) => {
  //   const draggingElement = document.querySelector('.dragging');
  //   if (event.key === 'r' && draggingElement) {
  //     const shipKey = draggingElement.dataset.shipKey;
  //     console.log(shipKey);
  //     // do something with the shipKey data...
  //   }
  // });
}

function displayShips(ships) {
  clearContainer('playerShips');
  const playerShips = document.getElementById('playerShips');
  ships.forEach((ship) => {
    const newShip = document.createElement('div');
    newShip.classList.add('ship');

    newShip.dataset.shipKey = ship.key;
    newShip.dataset.isPlaced = ship.isPlaced;

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
  addDragability();
}

export { populateGrids, displayShips, addDragability };
