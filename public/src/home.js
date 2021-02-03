const {books} = require('../data/books.js');
const {authors} = require('../data/authors.js');

function totalBooksCount(books) {
  return books.length;
}

////////////////

function totalAccountsCount(accounts) {
  return accounts.length;
}

////////////////

function booksBorrowedCount(books) {

  let outThere = books.reduce((acc, {borrows}) => 
  {
    if (!borrows[0]) {
      acc += 1;
    }
    return acc;
  }, 0)
  return outThere;
}

//////////////

function getMostCommonGenres(books) {
  const genres = {}; 
  const mostCommon = []; 

for (let book of books) {
  genres[book.genre] ? genres[book.genre] += 1  : genres[book.genre] = 1
  console.log(genres);
}

for (let key in Object.keys(genres)) {
  mostCommon.push({
    name: Object.keys(genres)[key],
    count: Object.values(genres)[key]
  });
}
return mostCommon.sort((genre1, genre2) => genre1.count > genre2.count ? -1 : 1).slice(0,5);
}

//////////////

function getMostPopularBooks(books) {
  const popBooks = {};
  const mostPop = []; 

  for (let book of books) {
    // create object with amount of borrows per book
    if (!popBooks[book.title]) {
      popBooks[book.title] = book['borrows'].length;
    }
    console.log(popBooks);

  }

  for (let key in Object.keys(popBooks)) {
    mostPop.push({
      name: Object.keys(popBooks)[key],
      count: Object.values(popBooks)[key]
    });
  }
  return mostPop.sort((book1, book2) => book1.count > book2.count ? -1 : 1).slice(0,5);
}

///////////////

function getMostPopularAuthors(books, authors) {
  const popAuth = {};
  const mostPop = [];
  for (let author of authors) {
    // if author.id has been added to object, bypass it
    // (due to entry duplication in data/authors.js file)
  if (!(String(author.id) in popAuth)) {
    const authorBooks = books.filter((book) => book.authorId === author.id)
    for (let book of authorBooks) {

      if (author.id in popAuth) {
        popAuth[author.id] += book.borrows.length;
      } else {
        popAuth[author.id] = book.borrows.length;
      }
    }
  }
  }
  // 
  for (let key in popAuth) {
    const author = authors.find((auth) => auth.id == key)
    const authName = `${author.name.first} ${author.name.last}`;
    
    mostPop.push({
      name: authName,
      count: popAuth[key]
    });
  }
 // return 
  mostPop.sort((auth1, auth2) =>  auth2.count - auth1.count)
    return mostPop.slice(0,5);
}


getMostPopularAuthors(books, authors);


module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
