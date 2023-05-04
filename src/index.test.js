import { createShip } from './ships';
import { makeShips } from './gameboard';

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
