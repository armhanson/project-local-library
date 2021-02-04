const { findAuthorById } = require("./books");

function findAccountById(accounts, id) {
  return accounts.find(function (account) {
    if (account.id === id) return account;
  });
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((name1, name2) =>
    name1.name.last < name2.name.last ? -1 : 1
  );
}

function getTotalNumberOfBorrows(account, books) {
  // assigining reference for id matching
  let acctNum = account["id"];
  // reduce elements of borrows data to create array of values
  let borrowed = books.reduce((acc, { borrows: borrow }) => {
    // creating array of account ids
    const borrowId = borrow.map((element) => element.id);
    //
    for (let elem of borrowId) {
      if (acctNum === elem) {
        acc++;
      }
    }

    return acc;
  }, 0);

  return borrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksList = [];

  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      // see if book is currently borrowed by account passed in
      if (borrow.id === account.id && borrow.returned === false) {
        const authorObj = findAuthorById(authors, book.authorId);
        // put name into book object
        booksList.push(Object.assign(book, { author: authorObj }));
      }
    });
  });
  return booksList;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
