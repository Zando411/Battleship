import { createShip } from './ships.js';

const ROWS = 10;
const COLUMNS = 10;

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

function placeShipsRandom(user) {
  const shipList = user.ships;
  const gameboard = user.gameboard;
  const placedCoordinates = new Set();
  shipList.forEach((ship) => {
    const vertical = Math.random() >= 0.5;
    ship = turnShip(vertical, ship);

    function randomizer() {
      const { x, y } = randomCoords();
      const isValid = isValidPosition(ship, x, y, ship.vertical, gameboard);

      if (isValid === true) {
        if (placedCoordinates.has(`${x},${y}`)) {
          return randomizer();
        }
        placedCoordinates.add(`${x},${y}`);
        return { x, y };
      } else {
        return randomizer();
      }
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

function receiveAttack(user, x, y) {
  const ships = user.ships;
  const gameboard = user.gameboard;
  if (gameboard[y][x].isHit === true) {
    throw new Error('This square has already been hit!');
  }
  gameboard[y][x].isHit = true;
  if (gameboard[y][x].hasShip !== null) {
    const shipKey = gameboard[y][x].hasShip;
    ships[shipKey].hit();
  }
}

export {
  makeShips,
  placeShips,
  receiveAttack,
  newGameboard,
  areAllShipsSunk,
  placeShipsRandom,
};
