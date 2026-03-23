import { describe, it, expect } from 'vitest';
import Ajv from 'ajv';
import { bookSchema } from '../../schema/book.schema';
import { bookBuilder } from '../../test-data/books-Data';


describe('Book Schema Validation', () => {

  it('should fail invalid book', () => {
    const ajv = new Ajv();
    const validate = ajv.compile(bookSchema);

    const invalidBook = { title: '', author: '' };
    const valid = validate(invalidBook);

    expect(valid).toBe(false);
    expect(validate.errors).not.toBeNull();
  });

});