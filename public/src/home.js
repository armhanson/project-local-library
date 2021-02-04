const { books } = require("../data/books.js");
const { authors } = require("../data/authors.js");

function totalBooksCount(books) {
  if (books.length === 0) {
    return 0;
  }
  return books.length;
}

////////////////

function totalAccountsCount(accounts) {
  if (accounts.length === 0) {
    return 0;
  }
  return accounts.length;
}

////////////////

function booksBorrowedCount(books) {
  const count = books.reduce((acc, {borrows}) => 
  {
    if (!borrows[0].returned) {
      acc += 1;
    }
    return acc;
  }, 0);
  return count;
}

//////////////

function getMostCommonGenres(books) {
  // assign empty object and array to collect genre
  const genres = {};
  const mostCommon = [];
  // check for books genre in object and add value of 1 to existing key
  // if it doesn't exist, add key with value of 1
  for (let book of books) {
    genres[book.genre] ? (genres[book.genre] += 1) : (genres[book.genre] = 1);
  }
  // check key of genres and accumulate array with 'name' and 'count' as keys,
  // setting value to genres key and value
  for (let key in Object.keys(genres)) {
    mostCommon.push({
      name: Object.keys(genres)[key],
      count: Object.values(genres)[key],
    });
  }
  // return array of genres, sorting highest to lowest from top to bottom,
  // stopping at 5 entries total
  return mostCommon
    .sort((genre1, genre2) => (genre1.count > genre2.count ? -1 : 1))
    .slice(0, 5);
}

//////////////

function getMostPopularBooks(books) {
  const popBooks = {};
  const mostPop = [];

  for (let book of books) {
    // create object with amount of borrows per book
    if (!popBooks[book.title]) {
      popBooks[book.title] = book["borrows"].length;
    }
  }
  // break object into array of objects
  // with 'name' keys and 'count' values
  for (let key in Object.keys(popBooks)) {
    mostPop.push({
      name: Object.keys(popBooks)[key],
      count: Object.values(popBooks)[key],
    });
  }
  // sort array and return top 5 books
  return mostPop
    .sort((book1, book2) => (book1.count > book2.count ? -1 : 1))
    .slice(0, 5);
}

///////////////

function getMostPopularAuthors(books, authors) {
  const popAuth = {};
  const mostPop = [];
  for (let author of authors) {
    // if author.id has been added to object, bypass it
    // (due to entry duplication in data/authors.js file)
    if (!(String(author.id) in popAuth)) {
      const authorBooks = books.filter((book) => book.authorId === author.id);
      for (let book of authorBooks) {
        if (author.id in popAuth) {
          popAuth[author.id] += book.borrows.length;
        } else {
          popAuth[author.id] = book.borrows.length;
        }
      }
    }
  }
  // find author who's id matches the popAuth object id
  for (let key in popAuth) {
    const author = authors.find((auth) => auth.id == key);
    const authName = `${author.name.first} ${author.name.last}`;
    // compile array of most popular authors
    mostPop.push({
      name: authName,
      count: popAuth[key],
    });
  }
  // sort array and return top 5 books
  mostPop.sort((auth1, auth2) => auth2.count - auth1.count);
  return mostPop.slice(0, 5);
}



module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
