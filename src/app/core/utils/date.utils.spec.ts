import { getNextYear } from './date.utils';

describe('DateUtils', () => {
  it('getNextYear: Must return another year', () => {

    const res = getNextYear('2020-01-01');

    expect(res).toBe('2021-01-01');
  });
});
