import { createPlayer } from './player.js';
import { placeShipsRandom } from './gameboard.js';

function generatePlayerGrid(array) {
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

const player = createPlayer();
placeShipsRandom(player);
generatePlayerGrid(player.gameboard);
console.log(player.ships);
console.log(player.gameboard);
