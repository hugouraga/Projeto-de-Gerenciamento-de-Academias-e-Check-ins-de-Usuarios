import { it, describe, expect } from 'vitest';

describe('espero que a soma de 2 + 2 seja igual a 5', () => {
  it('2 + 2 = 4', () => {
    const a = 2 + 2;
    expect(a).toBe(4);
  });
});
