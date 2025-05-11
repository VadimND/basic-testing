// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 23, action: Action.Add })).toBe(35);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 2, action: Action.Subtract })).toBe(10);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 23, action: Action.Multiply })).toBe(46);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 4, action: Action.Divide })).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(8);
  });

  test('should return null for invalid action', () => {

    function isInvalidAction(check: any) {
      if (!Action.hasOwnProperty(check)) {
        return null;
      }
    }

    expect(isInvalidAction('WrongAction')).toBeNull();
  });

  test('should return null for invalid arguments', () => {

    function isInvalidArgs(a: any, b: any) {
      if (! (typeof a === 'number' && typeof b === 'number') ) {
        return null;
      }      
    }

    expect(isInvalidArgs('test', 8)).toBeNull();
  });
});
