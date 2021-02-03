function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // initiate empty array
  let returnedBooks = [];
  // initiate another array that's equal to a filter on books
  //inside filter will be arrow function with if statement inside
  const borrowedBooks = books.filter((book) => {
    // with if statement, decide to push to one or the other
    if (book.borrows[0].returned === true) {
      returnedBooks.push(book);
    } else {
      return book;
    }
  });
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  let counter = 0;
  const array = [];
  // go into accounts array
  for (let account in accounts) {
    // go inside book.borrows object
    for (let item in book.borrows) {
      // compare ids, make sure count is less than 10
      if (item.id === account.id) {
        if (counter < 10) {
          const final = { ...item, ...account, returned: item.returned };
          array.push(final);
          counter++;
        }
      }
    }
  }
  return array;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
