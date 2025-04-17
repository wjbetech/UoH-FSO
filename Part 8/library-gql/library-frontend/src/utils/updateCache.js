const updateCache = (cache, query, addedBook) => {
  const uniqueByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByName(allBooks.concat(addedBook))
    };
  });
};

export default updateCache;
