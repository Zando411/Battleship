import { createShip } from './ships.js';
import {
  makeShips,
  placeShip,
  receiveAttack,
  areAllShipsSunk,
  areAllShipsPlaced,
} from './gameboard.js';

import { playerTEST, opponentTEST } from './testVariables.js';

describe('createShip', () => {
  test('creates a ship object with the correct length', () => {
    const ship = createShip(1, 'Submarine', 3);
    expect(ship.length).toBe(3);
  });

  test('ship is not sunk when hits are less than length', () => {
    const ship = createShip(1, 'Submarine', 3);
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(false);
  });

  test('ship is sunk when hits are equal to length', () => {
    const ship = createShip(1, 'Submarine', 3);
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(true);
  });

  test('ship is not sunk when hits are greater than length', () => {
    const ship = createShip(1, 'Submarine', 3);
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(true);
    ship.hit();
    expect(ship.sunk).toBe(true);
  });
  test('ship name is accessible', () => {
    const ship = createShip(1, 'Submarine', 3);
    expect(ship.name).toBe('Submarine');
  });
});

describe('makeShips', () => {
  test('ships are made', () => {
    const ship = makeShips();
    expect(ship[2].name).toBe('Cruiser');
  });
  test('test array length', () => {
    const ship = makeShips();
    expect(ship.length).toBe(7);
  });
  test('ships are made', () => {
    const ship = makeShips();
    expect(ship[3].key).toBe(3);
  });
});

describe('placeShip', () => {
  beforeEach(() => {
    for (let i = 0; i < playerTEST.gameboard.length; i++) {
      for (let j = 0; j < playerTEST.gameboard[0].length; j++) {
        playerTEST.gameboard[i][j].hasShip = null;
        playerTEST.gameboard[i][j].isHit = false;
      }
    }
    for (let i = 0; i < opponentTEST.gameboard.length; i++) {
      for (let j = 0; j < opponentTEST.gameboard[0].length; j++) {
        opponentTEST.gameboard[i][j].hasShip = null;
        opponentTEST.gameboard[i][j].isHit = false;
      }
    }
  });

  test('ships can place horizontally', () => {
    const ship = makeShips();
    placeShip(playerTEST.gameboard, ship[2], 0, 0);
    expect(playerTEST.gameboard[0][0].hasShip).toBe(2);
  });
  test('isPlaced is set properly', () => {
    const ship = makeShips();
    placeShip(playerTEST.gameboard, ship[2], 0, 0);
    expect(ship[2].isPlaced).toBe(true);
  });
  test('ships can place vertically', () => {
    const ship = makeShips();
    ship[2].vertical = true;
    placeShip(playerTEST.gameboard, ship[2], 0, 0);
    expect(playerTEST.gameboard[0][0].hasShip).toBe(2);
  });

  test('ships cannot be placed out of bounds', () => {
    const ship = makeShips();
    expect(() => {
      placeShip(playerTEST.gameboard, ship[0], 8, 8);
    }).toThrow("Ship can't be placed here.");
  });
  test('ships cannot be placed out of bounds vertical', () => {
    const ship = makeShips();
    ship[0].vertical = true;
    expect(() => {
      placeShip(playerTEST.gameboard, ship[0], 8, 8);
    }).toThrow("Ship can't be placed here.");
  });

  test('ships cannot overlap', () => {
    const ship1 = makeShips()[0];
    const ship2 = makeShips()[1];
    expect(() => {
      placeShip(playerTEST.gameboard, ship1, 0, 0);
      placeShip(playerTEST.gameboard, ship2, 0, 0);
    }).toThrow("Ship can't be placed here.");
    expect(ship1.isPlaced).toBe(true);
    expect(ship2.isPlaced).toBe(false);
  });

  test('ships cannot overlap crossed', () => {
    const ship1 = makeShips()[0];
    const ship2 = makeShips()[1];
    ship2.vertical = true;
    expect(() => {
      placeShip(playerTEST.gameboard, ship1, 1, 1);
      placeShip(playerTEST.gameboard, ship2, 1, 0);
    }).toThrow("Ship can't be placed here.");
  });

  test('ships can place horizontally', () => {
    const ship = makeShips();
    placeShip(opponentTEST.gameboard, ship[2], 0, 0);
    expect(opponentTEST.gameboard[0][0].hasShip).toBe(2);
  });
  test('ships can place vertically', () => {
    const ship = makeShips();
    ship[2].vertical = true;
    placeShip(opponentTEST.gameboard, ship[2], 0, 0);
    expect(opponentTEST.gameboard[0][0].hasShip).toBe(2);
  });

  test('ships cannot be placed out of bounds', () => {
    const ship = makeShips();
    expect(() => {
      placeShip(opponentTEST.gameboard, ship[0], 8, 8);
    }).toThrow("Ship can't be placed here.");
  });
  test('ships cannot be placed out of bounds vertical', () => {
    const ship = makeShips();
    ship[0].vertical = true;
    expect(() => {
      placeShip(opponentTEST.gameboard, ship[0], 8, 8);
    }).toThrow("Ship can't be placed here.");
  });

  test('ships cannot overlap', () => {
    const ship1 = makeShips()[0];
    const ship2 = makeShips()[1];
    expect(() => {
      placeShip(opponentTEST.gameboard, ship1, 0, 0);
      placeShip(opponentTEST.gameboard, ship2, 0, 0);
    }).toThrow("Ship can't be placed here.");
  });

  test('ships cannot overlap crossed', () => {
    const ship1 = makeShips()[0];
    const ship2 = makeShips()[1];
    ship2.vertical = true;
    expect(() => {
      placeShip(playerTEST.gameboard, ship1, 1, 1);
      placeShip(playerTEST.gameboard, ship2, 1, 0);
    }).toThrow("Ship can't be placed here.");
  });
});

describe('receiveAttack', () => {
  beforeEach(() => {
    playerTEST.ships.forEach((ship) => {
      ship.hits = 0;
    });
    for (let i = 0; i < playerTEST.gameboard.length; i++) {
      for (let j = 0; j < playerTEST.gameboard[0].length; j++) {
        playerTEST.gameboard[i][j].hasShip = null;
        playerTEST.gameboard[i][j].isHit = false;
      }
    }
  });

  test('it should mark the square as hit', () => {
    receiveAttack(playerTEST, 3, 4);
    expect(playerTEST.gameboard[4][3].isHit).toBe(true);
  });

  test('it should throw an error if the square has already been hit', () => {
    playerTEST.gameboard[4][3].isHit = true;
    expect(() => receiveAttack(playerTEST, 3, 4)).toThrow(
      'This square has already been hit!'
    );
  });

  test('it should call the hit method on the ship if there is one', () => {
    placeShip(playerTEST.gameboard, playerTEST.ships[0], 3, 4);
    receiveAttack(playerTEST, 3, 4);
    expect(playerTEST.ships[0].hits).toBe(1);
  });

  test('it should not call the hit method on the ship if there is not one', () => {
    receiveAttack(playerTEST, 3, 4);
    expect(playerTEST.ships[0].hits).toBe(0);
  });

  test('it should mark the ship as sunk if all of its squares have been hit', () => {
    placeShip(playerTEST.gameboard, playerTEST.ships[0], 3, 4);
    receiveAttack(playerTEST, 3, 4);
    receiveAttack(playerTEST, 4, 4);
    receiveAttack(playerTEST, 5, 4);
    receiveAttack(playerTEST, 6, 4);
    receiveAttack(playerTEST, 7, 4);
    expect(playerTEST.ships[0].sunk).toBe(true);
  });

  test('it should mark the ship as not sunk if not all of its squares have been hit', () => {
    placeShip(playerTEST.gameboard, playerTEST.ships[0], 3, 4);
    receiveAttack(playerTEST, 3, 4);
    receiveAttack(playerTEST, 4, 4);
    receiveAttack(playerTEST, 5, 4);
    receiveAttack(playerTEST, 6, 4);
    expect(playerTEST.ships[0].sunk).toBe(false);
  });

  describe('areAllShipsSunk', () => {
    test('returns true if all ships are sunk', () => {
      const ships = makeShips();
      ships.forEach((ship) => {
        for (let i = 0; i < ship.length; i++) {
          ship.hit();
        }
      });
      expect(areAllShipsSunk(ships)).toBe(true);
    });

    test('returns false if not all ships are sunk', () => {
      const ships = makeShips();
      ships.forEach((ship) => {
        if (ship.key !== 0) {
          for (let i = 0; i < ship.length; i++) {
            ship.hit();
          }
        }
      });
      expect(areAllShipsSunk(ships)).toBe(false);
    });
  });

  describe('areAllShipsPlaced', () => {
    test('returns true if all ships are placed', () => {
      const ships = makeShips();
      ships.forEach((ship) => {
        for (let i = 0; i < ship.length; i++) {
          ship.isPlaced = true;
        }
      });
      expect(areAllShipsPlaced(ships)).toBe(true);
    });

    test('returns false if not all ships are placed', () => {
      const ships = makeShips();
      ships.forEach((ship) => {
        if (ship.key !== 0) {
          for (let i = 0; i < ship.length; i++) {
            ship.isPlaced = false;
          }
        }
      });
      expect(areAllShipsPlaced(ships)).toBe(false);
    });
  });
});
