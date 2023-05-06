import { createShip } from './ships';

const ROWS = 10;
const COLUMNS = 10;

const playerGameboard = newGameboard();
const opponentGameboard = newGameboard();

function newGameboard() {
  return new Array(ROWS).fill(
    new Array(COLUMNS).fill({
      isHit: false,
      hasShip: null,
    })
  );
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

function placeShips(gameboard, currentShip, x, y) {
  const key = currentShip.key;
  const length = currentShip.length;
  const isVertical = currentShip.vertical;

  if (isVertical) {
    if (y + length > ROWS) {
      throw new Error("Ship can't be placed here.");
    }
    for (let i = 0; i < length; i++) {
      if (gameboard[y + i][x].hasShip !== null) {
        throw new Error("Ship can't be placed here.");
      }
    }
  } else {
    if (x + length > COLUMNS) {
      throw new Error("Ship can't be placed here.");
    }
    for (let i = 0; i < length; i++) {
      if (gameboard[y][x + i].hasShip !== null) {
        throw new Error("Ship can't be placed here.");
      }
    }
  }

  if (isVertical) {
    for (let i = 0; i < length; i++) {
      gameboard[y + i][x].hasShip = key;
    }
  } else {
    for (let i = 0; i < length; i++) {
      gameboard[y][x + i].hasShip = key;
    }
  }
}

export { makeShips, playerGameboard, placeShips, opponentGameboard };
