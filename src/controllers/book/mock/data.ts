export const MOCK_USERS = [
  {
    username: 'john_doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    originalId: '65225b7caa8c636651b26d60',
    createdAt: 'Sun Oct 08 2023 13:04:20 GMT+0530 (India Standard Time)'
  },
  {
    username: 'jane_smith',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    originalId: '65225b7caa8c636651b26d61',
    createdAt: 'Sun Oct 08 2023 13:04:20 GMT+0530 (India Standard Time)'
  }
];

export const MOCK_USER_BOOKS = [
  {
    author: 'Ernest Hemingway',
    borrowedBy: '65225b7caa8c636651b26d60',
    referenceId: 11,
    description: 'A novel of the Lost Generation',
    isAvailable: false,
    publishedYear: 1926,
    title: 'The Sun Also Rises',
    createdAt: 'Sun Oct 08 2023 13:04:20 GMT+0530 (India Standard Time)',
    originalId: '65225b7caa8c636651b26d06',
  },
];

export const MOCK_BOOKS = [
  {
    author: 'John Grisham',
    borrowedBy: null,
    referenceId: 1,
    description: 'A legal thriller',
    isAvailable: true,
    publishedYear: 1993,
    title: 'The Pelican Brief',
    createdAt: 'Sun Oct 08 2023 13:04:20 GMT+0530 (India Standard Time)',
    originalId: '65225b7caa8c636651b26cfc'
  },
  {
    author: 'J.K. Rowling',
    borrowedBy: null,
    referenceId: 2,
    description: 'A magical adventure',
    isAvailable: true,
    publishedYear: 1997,
    title: 'Harry Potter and the Sorcerers Stone',
    createdAt: 'Sun Oct 08 2023 13:04:20 GMT+0530 (India Standard Time)',
    originalId: '65225b7caa8c636651b26cfd'
  },
  {
    author: 'Harper Lee',
    borrowedBy: null,
    referenceId: 4,
    description: 'A story of racial injustice',
    isAvailable: true,
    publishedYear: 1960,
    title: 'To Kill a Mockingbird',
    createdAt: 'Sun Oct 08 2023 13:04:20 GMT+0530 (India Standard Time)',
    originalId: '65225b7caa8c636651b26cff'
  },
  {
    author: 'Stephen King',
    borrowedBy: null,
    referenceId: 5,
    description: 'A horror masterpiece',
    isAvailable: true,
    publishedYear: 1986,
    title: 'It',
    createdAt: 'Sun Oct 08 2023 13:04:20 GMT+0530 (India Standard Time)',
    originalId: '65225b7caa8c636651b26d00'
  }
];
