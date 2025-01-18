const reverseString = (string) => {
  return string.split("").reverse().join("");
};

const arrAverage = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  return !array.length ? 0 : array.reduce(reducer, 0) / array.length;
};

const blogDummy = (blogs) => {
  return 1;
};

export default { reverseString, arrAverage, blogDummy };
