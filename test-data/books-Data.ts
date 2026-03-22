import type { Book } from '@/types/book';

// Static valid book (optional use)
export const validBook: Omit<Book, 'id'> = {
  title: 'Personal Diary',
  author: 'Kavya Mellacheruvu',
  genre: 'Self-help',
  publishedYear: 2026,
  description: 'A book about building good habit Journal',
  isbn: '9780735211292',
  pages: 320,
  rating: 4.8
};

// Dynamic builder (preferred for tests)
export const bookBuilder = (
  overrides: Partial<Omit<Book, 'id'>> = {}
): Omit<Book, 'id'> => ({
  title: `Book-${Date.now()}`,
  author: `Author-${Date.now()}`,
  genre: 'Fiction',
  publishedYear: 2024,
  description: 'Test description',
  isbn: `${Date.now()}${Math.floor(Math.random() * 1000)}`,
  pages: 200,
  rating: 4.5,
  ...overrides
});

// Invalid scenarios
export const invalidBooks = {
  emptyFields: {
    title: '',
    author: ''
  } as Partial<Omit<Book, 'id'>>,

  invalidRating: {
    rating: 6
  } as Partial<Omit<Book, 'id'>>,

  invalidPublishedYear: {
    publishedYear: 999
  } as Partial<Omit<Book, 'id'>>,

  invalidPages: {
    pages: 0
  } as Partial<Omit<Book, 'id'>>
};