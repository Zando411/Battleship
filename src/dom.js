function populateGrids(player1, player2) {
  populatePlayerGrid(player1.gameboard);
  populateOpponentGrid(player2.gameboard);
}

function populatePlayerGrid(array) {
  const grid = document.getElementById('playerGameboard');
  let j = 0;
  array.forEach((row) => {
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
function populateOpponentGrid(array) {
  const grid2 = document.getElementById('opponentGameboard');
  let j = 0;
  array.forEach((row) => {
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

function addDragability() {
  const draggables = document.querySelectorAll('.draggable');
  const containers = document.querySelectorAll('.container');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
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
    newShip.setAttribute('draggable', true);
    for (let i = 0; i < ship.length; i++) {
      const gridPart = document.createElement('div');
      gridPart.classList.add('gridPart');
      newShip.appendChild(gridPart);
    }
    playerShips.appendChild(newShip);
  });
  addDragability();
}

export { populateGrids, displayShips, addDragability };
