import { createShip } from './ships';

const ROWS = 10;
const COLUMNS = 10;

function newGameboard() {
  return (board = new Array(ROWS).fill(new Array(COLUMNS).fill(null)));
}

function makeShips() {
  let names = [
    'Aircraft Carrier',
    'Battleship',
    'Cruiser',
    'Destroyer',
    'Destroyer',
    'Submarine',
    'Submarine',
  ];
  let size = [5, 4, 3, 2, 2, 1, 1];
  let key = [0, 1, 2, 3, 4, 5, 6];
  let ships = [];
  for (let i = 0; i < 7; i++) {
    let ship = createShip(key[i], names[i], size[i]);
    ships.push(ship);
  }
  console.log(ships);
  return ships;
}

export { makeShips };
