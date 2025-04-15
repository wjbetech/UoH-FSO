const updateCache = (cache, query, addedPerson) => {
  const uniqueByName = (a) => {
    let nameSeen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return nameSeen.has(k) ? false : nameSeen.add(k);
    });
  };

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqueByName(allPersons.concat(addedPerson))
    };
  });
};

export default updateCache;
