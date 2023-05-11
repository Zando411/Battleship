function populateGrids(player1, player2) {
  populatePlayerGrid(player1.gameboard);
  populateOpponentGrid(player2.gameboard);
}

function populatePlayerGrid(array) {
  const grid = document.getElementById('playerGameboard');
  array.forEach((row) => {
    row.forEach((cell) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('gridPart');
      cellElement.dataset.contains = cell.hasShip;
      cellElement.dataset.cellHit = cell.isHit;
      //   cellElement.addEventListener('click', () => {
      //      handle click event
      //   });
      grid.appendChild(cellElement);
    });
  });
}
function populateOpponentGrid(array) {
  const grid2 = document.getElementById('opponentGameboard');
  array.forEach((row) => {
    row.forEach((cell) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('gridPart');
      cellElement.dataset.contains = cell.hasShip;
      cellElement.dataset.cellHit = cell.isHit;
      if (cell.hasShip !== null) {
        cellElement.style.backgroundColor = '#d9d9d9';
      }
      cellElement.addEventListener('click', (e) => {
        console.log(e.target.dataset.contains);
      });
      grid2.appendChild(cellElement);
    });
  });
}

function displayShips(ships) {
  const playerShips = document.getElementById('playerShips');
  ships.forEach((ship) => {
    const newShip = document.createElement('div');
    newShip.classList.add('ship');
    for (let i = 0; i < ship.length; i++) {
      const gridPart = document.createElement('div');
      gridPart.classList.add('gridPart');
      newShip.appendChild(gridPart);
    }
    playerShips.appendChild(newShip);
  });
}

export { populateGrids, displayShips };
