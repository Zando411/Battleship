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

function isValidPosition(ship, x, y, isVertical, gameboard) {
  const length = ship.length;

  if (isVertical) {
    if (y + length > ROWS) {
      return false;
    }
    for (let i = 0; i < length; i++) {
      if (gameboard[y + i][x].hasShip !== null) {
        return false;
      }
    }
  } else {
    if (x + length > COLUMNS) {
      return false;
    }
    for (let i = 0; i < length; i++) {
      if (gameboard[y][x + i].hasShip !== null) {
        return false;
      }
    }
  }
  return true;
}

function placeShips(gameboard, currentShip, x, y) {
  const key = currentShip.key;
  const length = currentShip.length;
  const isVertical = currentShip.vertical;

  const positionCheck = isValidPosition(
    currentShip,
    x,
    y,
    isVertical,
    gameboard
  );

  if (positionCheck) {
    if (isVertical) {
      for (let i = 0; i < length; i++) {
        gameboard[y + i][x].hasShip = key;
      }
    } else {
      for (let i = 0; i < length; i++) {
        gameboard[y][x + i].hasShip = key;
      }
    }
  } else {
    throw new Error("Ship can't be placed here.");
  }
}

function turnShip(vertical, ship) {
  if (vertical) {
    ship.vertical = true;
  } else {
    ship.vertical = false;
  }
  return ship;
}

function randomCoords() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  return { x, y };
}

function placeShipsRandom(placer) {
  const shipList = placer.ships;
  const gameboard = placer.gameboard;
  const placedCoordinates = new Set();
  shipList.forEach((ship) => {
    const vertical = Math.random() >= 0.5;
    ship = turnShip(vertical, ship);

    function randomizer() {
      const { x, y } = randomCoords();
      if (placedCoordinates.has(`${x},${y}`)) {
        return randomizer();
      }
      placedCoordinates.add(`${x},${y}`);
      return { x, y };
    }

    const { x, y } = randomizer();

    if (vertical) {
      for (let i = 0; i < ship.length; i++) {
        placedCoordinates.add(`${x},${y + i}`);
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        placedCoordinates.add(`${x + i},${y}`);
      }
    }
    placeShips(gameboard, ship, x, y);
  });
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

// console.log(player.gameboard);
// placeShipsRandom(player);
// console.log(player.gameboard);

export {
  makeShips,
  placeShips,
  receiveAttack,
  newGameboard,
  areAllShipsSunk,
  placeShipsRandom,
};
