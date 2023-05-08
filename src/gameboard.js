import { createShip } from './ships.js';
import { createPlayer, createComputer } from './player.js';

const ROWS = 10;
const COLUMNS = 10;

export const player = createPlayer();
export const opponent = createComputer();

function newGameboard() {
  const gameboard = new Array(ROWS);
  for (let i = 0; i < gameboard.length; i++) {
    gameboard[i] = new Array(COLUMNS);
    for (let j = 0; j < gameboard[i].length; j++) {
      gameboard[i][j] = {
        isHit: false,
        hasShip: null,
      };
    }
  }
  return gameboard;
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
  return ships;
}

function areAllShipsSunk(ships) {
  return ships.every((ship) => ship.sunk);
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

function receiveAttack(gameboard, x, y) {
  let ships;
  if (gameboard === player.gameboard) {
    ships = player.ships;
  } else if (gameboard === opponent.gameboard) {
    ships = opponent.ships;
  }
  if (gameboard[y][x].isHit === true) {
    throw new Error('This square has already been hit!');
  }
  gameboard[y][x].isHit = true;
  if (gameboard[y][x].hasShip !== null) {
    const shipKey = gameboard[y][x].hasShip;
    ships[shipKey].hit();
  }
}

export { makeShips, placeShips, receiveAttack, newGameboard, areAllShipsSunk };
