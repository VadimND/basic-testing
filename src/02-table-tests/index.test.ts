// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 11, b: 2, action: Action.Subtract, expected: 9 },
  { a: 21, b: 2, action: Action.Subtract, expected: 19 },
  { a: 31, b: 21, action: Action.Subtract, expected: 10 },

  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 2, b: 21, action: Action.Multiply, expected: 42 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },

  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 21, b: 3, action: Action.Divide, expected: 7 },
  { a: 30, b: 2, action: Action.Divide, expected: 15 },

  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
];

describe('calculate function', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`calculates ${a} ${action} ${b} to be ${expected}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });
});
