function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // initiate empty array
  const returnedBooks = [];
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

// used as a helper function in getBorrowersForBook function
function _findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function getBorrowersForBook(book, accounts) {

  const borrowedList = [];
   // iterate through each book's borrows
  book.borrows.forEach((item, counter) => {
     // limiting results to 10
      if (counter < 10) {
        // list the book and all account information
        //and add if each account has returned the book
        const account = _findAccountById(accounts, item.id);
        let final = {};
        final = {...item, ...account};
        borrowedList.push(final);
      };
  });
  return borrowedList;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
