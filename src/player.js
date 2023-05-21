import { populateOpponentGrid, populatePlayerGrid } from './dom.js';
import { gameOver, winner } from './gameLoop.js';
import {
  areAllShipsPlaced,
  areAllShipsSunk,
  makeShips,
  newGameboard,
  placeShipsRandom,
} from './gameboard.js';

import { player, opponent } from './index.js';

function createPlayer() {
  let name = 'Player';
  const gameboard = newGameboard();
  const ships = makeShips();
  let allShipsPlaced = false;

  function clearBoard() {
    for (let i = 0; i < gameboard.length; i++) {
      for (let j = 0; j < gameboard[i].length; j++) {
        gameboard[i][j].hasShip = null;
        gameboard[i][j].isHit = false;
      }
    }
  }

  function resetShips() {
    ships.forEach((ship) => {
      ship.isPlaced = false;
      ship.vertical = false;
      ship.hits = 0;
      ship.sunk = false;
    });
  }

  function placeShips() {
    placeShipsRandom(this);
  }

  function receiveAttack(x, y) {
    if (gameboard[y][x].isHit === true) {
      throw new Error('This square has already been hit!');
    }
    gameboard[y][x].isHit = true;
    if (gameboard[y][x].hasShip !== null) {
      const shipKey = gameboard[y][x].hasShip;
      ships[shipKey].hit();
    }
  }

  function validateAllShipsPlaced() {
    const placed = areAllShipsPlaced(ships);
    if (placed === true) {
      allShipsPlaced = true;
    } else {
      throw new Error('Please place all ships on the board');
    }
  }

  function takeTurn(x, y) {
    opponent.receiveAttack(x, y);
    if (areAllShipsSunk(opponent.ships)) {
      winner = `${name}`;
      gameOver = true;
    }
    populateOpponentGrid(opponent);
  }

  function resetVariables() {
    name = 'Player';
    clearBoard();
    allShipsPlaced = false;
    resetShips();
  }

  return {
    name,
    gameboard,
    ships,
    takeTurn,
    allShipsPlaced,
    placeShips,
    validateAllShipsPlaced,
    clearBoard,
    takeTurn,
    receiveAttack,
    resetVariables,
  };
}

function createComputer() {
  const isComputer = true;
  const name = 'Computer';
  const prevMoves = new Set();
  const gameboard = newGameboard();
  const ships = makeShips();
  let allShipsPlaced = false;

  function getRandomCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    if (prevMoves.has(`${x},${y}`)) {
      return getRandomCoordinates();
    }
    prevMoves.add(`${x},${y}`);
    return [x, y];
  }

  function clearBoard() {
    for (let i = 0; i < gameboard.length; i++) {
      for (let j = 0; j < gameboard[i].length; j++) {
        gameboard[i][j].hasShip = null;
        gameboard[i][j].isHit = false;
      }
    }
  }

  function resetShips() {
    ships.forEach((ship) => {
      ship.isPlaced = false;
      ship.vertical = false;
      ship.hits = 0;
      ship.sunk = false;
    });
  }

  function receiveAttack(x, y) {
    if (gameboard[y][x].isHit === true) {
      throw new Error('This square has already been hit!');
    }
    gameboard[y][x].isHit = true;
    if (gameboard[y][x].hasShip !== null) {
      const shipKey = gameboard[y][x].hasShip;
      ships[shipKey].hit();
    }
  }

  function takeTurn() {
    const [x, y] = getRandomCoordinates();
    player.receiveAttack(x, y);
    if (areAllShipsSunk(player.ships)) {
      winner = `${name}`;
      gameOver = true;
    }
    populatePlayerGrid(player);
  }

  function placeShips() {
    placeShipsRandom(this);
  }

  function resetVariables() {
    clearBoard();
    allShipsPlaced = false;
    resetShips();
  }
  return {
    name,
    gameboard,
    ships,
    takeTurn,
    isComputer,
    placeShips,
    allShipsPlaced,
    clearBoard,
    receiveAttack,
    takeTurn,
    resetVariables,
  };
}

export { createPlayer, createComputer };
