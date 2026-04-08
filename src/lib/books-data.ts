export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  description: string;
  isbn: string;
  pages: number;
  rating: number;
}

const initialBooks: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    publishedYear: 1925,
    description: "A story of decadence and excess, Gatsby explores the darker aspects of the Jazz Age, and in its characters' inability to achieve their dreams, it creates a portrait of the American Dream itself.",
    isbn: "978-0743273565",
    pages: 180,
    rating: 4.2
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    publishedYear: 1960,
    description: "The story of young Scout Finch and her father Atticus in a racially divided Alabama town during the Great Depression.",
    isbn: "978-0446310789",
    pages: 281,
    rating: 4.3
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publishedYear: 1949,
    description: "A dystopian social science fiction novel and cautionary tale about totalitarianism.",
    isbn: "978-0451524935",
    pages: 328,
    rating: 4.1
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    publishedYear: 1813,
    description: "The story follows the emotional development of Elizabeth Bennet, who learns the error of making hasty judgments.",
    isbn: "978-0141439518",
    pages: 432,
    rating: 4.4
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publishedYear: 1937,
    description: "A fantasy novel about the adventures of Bilbo Baggins, a hobbit who embarks on a quest to reclaim a dwarf kingdom.",
    isbn: "978-0547928241",
    pages: 366,
    rating: 4.5
  }
];

// In-memory storage for books (simulates a database)
export const booksData: Book[] = initialBooks.map((book) => ({ ...book }));

// Helper functions for managing books
export const addBook = (book: Omit<Book, 'id'>): Book => {
  const newBook: Book = {
    ...book,
    id: Math.max(...booksData.map(b => b.id)) + 1
  };
  booksData.push(newBook);
  return newBook;
};

export const getBooks = (): Book[] => {
  return booksData;
};

export const getBookById = (id: number): Book | undefined => {
  return booksData.find(book => book.id === id);
};

export const resetBooks = (): void => {
  booksData.length = 0;
  booksData.push(...initialBooks.map((book) => ({ ...book })));
};
