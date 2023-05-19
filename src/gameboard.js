import { createShip } from './ships.js';
import { displayShips, populatePlayerGrid } from './dom.js';

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

function areAllShipsPlaced(ships) {
  return ships.every((ship) => ship.isPlaced);
}

function hasAdjacentShip(x, y, gameboard) {
  // Check the square above
  if (y > 0 && gameboard[y - 1][x].hasShip !== null) {
    return true;
  }

  // Check the square below
  if (y < ROWS - 1 && gameboard[y + 1][x].hasShip !== null) {
    return true;
  }

  // Check the square to the left
  if (x > 0 && gameboard[y][x - 1].hasShip !== null) {
    return true;
  }

  // Check the square to the right
  if (x < COLUMNS - 1 && gameboard[y][x + 1].hasShip !== null) {
    return true;
  }

  // Check the top-left corner
  if (y > 0 && x > 0 && gameboard[y - 1][x - 1].hasShip !== null) {
    return true;
  }

  // Check the top-right corner
  if (y > 0 && x < COLUMNS - 1 && gameboard[y - 1][x + 1].hasShip !== null) {
    return true;
  }

  // Check the bottom-left corner
  if (y < ROWS - 1 && x > 0 && gameboard[y + 1][x - 1].hasShip !== null) {
    return true;
  }

  // Check the bottom-right corner
  if (
    y < ROWS - 1 &&
    x < COLUMNS - 1 &&
    gameboard[y + 1][x + 1].hasShip !== null
  ) {
    return true;
  }

  return false;
}

function isValidPosition(ship, x, y, isVertical, gameboard) {
  const length = ship.length;

  if (isVertical) {
    if (y + length > ROWS) {
      return false;
    }

    for (let i = 0; i < length; i++) {
      // check the square above, below, and around the ship
      if (hasAdjacentShip(x, y + i, gameboard)) {
        return false;
      }
    }
  } else {
    if (x + length > COLUMNS) {
      return false;
    }

    for (let i = 0; i < length; i++) {
      // check the square to the left, right, and around the ship
      if (hasAdjacentShip(x + i, y, gameboard)) {
        return false;
      }
    }
  }

  return true;
}

function placeShip(gameboard, currentShip, x, y) {
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
    currentShip.isPlaced = true;
    return true;
  } else {
    return false;
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
  user.clearGameboard();

  shipList.forEach((ship) => {
    ship.isPlaced = false;
    ship.vertical = false;
  });

  shipList.forEach((ship) => {
    function placeRandom(ship) {
      const vertical = Math.random() >= 0.5;
      ship = turnShip(vertical, ship);
      const { x, y } = randomCoords();
      const placed = placeShip(gameboard, ship, x, y);
      if (!placed) placeRandom(ship);
    }
    placeRandom(ship);
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

function resetBoard(user) {
  user.gameboard = newGameboard();
  user.allShipsPlaced = false;
  user.ships.forEach((ship) => {
    ship.isPlaced = false;
    ship.vertical = false;
  });
  populatePlayerGrid(user);
  if (user.isComputer === true) {
    return;
  }
  displayShips(user.ships);
}

export {
  makeShips,
  placeShip,
  receiveAttack,
  newGameboard,
  areAllShipsSunk,
  placeShipsRandom,
  areAllShipsPlaced,
  resetBoard,
};
