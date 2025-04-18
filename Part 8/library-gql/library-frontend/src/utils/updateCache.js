const updateCache = (cache, query, addedBook) => {
  // check if the book already exists in the cache
  const existingBooks =
    cache.readQuery({
      query: query.query,
      variables: { genre: null }
    })?.allBooks || [];

  const isDuplicate = existingBooks.some((book) => book.id === addedBook.id);
  if (isDuplicate) return;

  // updating the ALL_BOOKS query by only a "null" genre means that the app
  // requires a page refresh to show the new book when filtering by genre

  // it's a bit bulky, and maybe I am bad at coding, but updating by genre-specific
  // queries after updating ALL_BOOKS by genre: null fixes this bug!

  // update "ALL_BOOKS" query (genre: null)
  cache.updateQuery({ query: query.query, variables: { genre: null } }, (data) => ({
    allBooks: [...(data?.allBooks || []), addedBook]
  }));

  // update genre-specific queries
  addedBook.genres.forEach((genre) => {
    cache.updateQuery({ query: query.query, variables: { genre } }, (data) => ({
      allBooks: [...(data?.allBooks || []), addedBook]
    }));
  });
};

export default updateCache;
