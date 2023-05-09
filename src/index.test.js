import { createShip } from './ships';
import {
  makeShips,
  placeShips,
  receiveAttack,
  areAllShipsSunk,
  areAllShipsPlaced,
} from './gameboard';

import { player, opponent } from './testVariables.js';

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

describe('placeShips', () => {
  beforeEach(() => {
    for (let i = 0; i < player.gameboard.length; i++) {
      for (let j = 0; j < player.gameboard[0].length; j++) {
        player.gameboard[i][j].hasShip = null;
        player.gameboard[i][j].isHit = false;
      }
    }
    for (let i = 0; i < opponent.gameboard.length; i++) {
      for (let j = 0; j < opponent.gameboard[0].length; j++) {
        opponent.gameboard[i][j].hasShip = null;
        opponent.gameboard[i][j].isHit = false;
      }
    }
  });

  test('ships can place horizontally', () => {
    const ship = makeShips();
    placeShips(player.gameboard, ship[2], 0, 0);
    expect(player.gameboard[0][0].hasShip).toBe(2);
  });
  test('isPlaced is set properly', () => {
    const ship = makeShips();
    placeShips(player.gameboard, ship[2], 0, 0);
    expect(ship[2].isPlaced).toBe(true);
  });
  test('ships can place vertically', () => {
    const ship = makeShips();
    ship[2].vertical = true;
    placeShips(player.gameboard, ship[2], 0, 0);
    expect(player.gameboard[0][0].hasShip).toBe(2);
  });

  test('ships cannot be placed out of bounds', () => {
    const ship = makeShips();
    expect(() => {
      placeShips(player.gameboard, ship[0], 8, 8);
    }).toThrow("Ship can't be placed here.");
  });
  test('ships cannot be placed out of bounds vertical', () => {
    const ship = makeShips();
    ship[0].vertical = true;
    expect(() => {
      placeShips(player.gameboard, ship[0], 8, 8);
    }).toThrow("Ship can't be placed here.");
  });

  test('ships cannot overlap', () => {
    const ship1 = makeShips()[0];
    const ship2 = makeShips()[1];
    expect(() => {
      placeShips(player.gameboard, ship1, 0, 0);
      placeShips(player.gameboard, ship2, 0, 0);
    }).toThrow("Ship can't be placed here.");
    expect(ship1.isPlaced).toBe(true);
    expect(ship2.isPlaced).toBe(false);
  });

  test('ships cannot overlap crossed', () => {
    const ship1 = makeShips()[0];
    const ship2 = makeShips()[1];
    ship2.vertical = true;
    expect(() => {
      placeShips(player.gameboard, ship1, 1, 1);
      placeShips(player.gameboard, ship2, 1, 0);
    }).toThrow("Ship can't be placed here.");
  });

  test('ships can place horizontally', () => {
    const ship = makeShips();
    placeShips(opponent.gameboard, ship[2], 0, 0);
    expect(opponent.gameboard[0][0].hasShip).toBe(2);
  });
  test('ships can place vertically', () => {
    const ship = makeShips();
    ship[2].vertical = true;
    placeShips(opponent.gameboard, ship[2], 0, 0);
    expect(opponent.gameboard[0][0].hasShip).toBe(2);
  });

  test('ships cannot be placed out of bounds', () => {
    const ship = makeShips();
    expect(() => {
      placeShips(opponent.gameboard, ship[0], 8, 8);
    }).toThrow("Ship can't be placed here.");
  });
  test('ships cannot be placed out of bounds vertical', () => {
    const ship = makeShips();
    ship[0].vertical = true;
    expect(() => {
      placeShips(opponent.gameboard, ship[0], 8, 8);
    }).toThrow("Ship can't be placed here.");
  });

  test('ships cannot overlap', () => {
    const ship1 = makeShips()[0];
    const ship2 = makeShips()[1];
    expect(() => {
      placeShips(opponent.gameboard, ship1, 0, 0);
      placeShips(opponent.gameboard, ship2, 0, 0);
    }).toThrow("Ship can't be placed here.");
  });

  test('ships cannot overlap crossed', () => {
    const ship1 = makeShips()[0];
    const ship2 = makeShips()[1];
    ship2.vertical = true;
    expect(() => {
      placeShips(player.gameboard, ship1, 1, 1);
      placeShips(player.gameboard, ship2, 1, 0);
    }).toThrow("Ship can't be placed here.");
  });
});

describe('receiveAttack', () => {
  beforeEach(() => {
    player.ships.forEach((ship) => {
      ship.hits = 0;
    });
    for (let i = 0; i < player.gameboard.length; i++) {
      for (let j = 0; j < player.gameboard[0].length; j++) {
        player.gameboard[i][j].hasShip = null;
        player.gameboard[i][j].isHit = false;
      }
    }
  });

  test('it should mark the square as hit', () => {
    receiveAttack(player, 3, 4);
    expect(player.gameboard[4][3].isHit).toBe(true);
  });

  test('it should throw an error if the square has already been hit', () => {
    player.gameboard[4][3].isHit = true;
    expect(() => receiveAttack(player, 3, 4)).toThrow(
      'This square has already been hit!'
    );
  });

  test('it should call the hit method on the ship if there is one', () => {
    placeShips(player.gameboard, player.ships[0], 3, 4);
    receiveAttack(player, 3, 4);
    expect(player.ships[0].hits).toBe(1);
  });

  test('it should not call the hit method on the ship if there is not one', () => {
    receiveAttack(player, 3, 4);
    expect(player.ships[0].hits).toBe(0);
  });

  test('it should mark the ship as sunk if all of its squares have been hit', () => {
    placeShips(player.gameboard, player.ships[0], 3, 4);
    receiveAttack(player, 3, 4);
    receiveAttack(player, 4, 4);
    receiveAttack(player, 5, 4);
    receiveAttack(player, 6, 4);
    receiveAttack(player, 7, 4);
    expect(player.ships[0].sunk).toBe(true);
  });

  test('it should mark the ship as not sunk if not all of its squares have been hit', () => {
    placeShips(player.gameboard, player.ships[0], 3, 4);
    receiveAttack(player, 3, 4);
    receiveAttack(player, 4, 4);
    receiveAttack(player, 5, 4);
    receiveAttack(player, 6, 4);
    expect(player.ships[0].sunk).toBe(false);
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
