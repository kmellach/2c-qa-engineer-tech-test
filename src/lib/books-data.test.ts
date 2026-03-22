import { describe, it, expect } from 'vitest';
import { bookBuilder } from '../../test-data/books-Data';

describe('bookBuilder', () => {
  it('should generate valid book data', () => {
    const book = bookBuilder();

    expect(book.title).toBeTruthy();
    expect(book.author).toBeTruthy();
    expect(book.rating).toBeLessThanOrEqual(5);
  });

  it('should override fields correctly', () => {
    const book = bookBuilder({ title: 'Custom Title' });

    expect(book.title).toBe('Custom Title');
  });
});