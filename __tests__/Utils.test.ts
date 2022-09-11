import {describe, expect, test} from '@jest/globals';
import {randomNumbers, shuffleArray} from '../src/utils';
describe('randomNumbers', () => {
  test('pass 6 as a method parameter => ', () => {
    expect(randomNumbers(6).length).toEqual(6);
  });
  test('check returns empty => ', () => {
    expect(randomNumbers(6)).not.toBeUndefined();
  });
  test('pass 0 as a method parameter => ', () => {
    expect(randomNumbers(0).length).toEqual(0);
  });
});

describe('shuffleArray', () => {
  test('not equals to [1, 2, 3, 4] => ', () => {
    expect(shuffleArray([1, 2, 3, 4])).toContain(1);
  });
});
