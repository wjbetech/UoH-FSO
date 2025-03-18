import lodash from "lodash";

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

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const favBlog = blogs.reduce((fav, current) => {
    return current.likes > fav.likes ? current : fav;
  });
  return { title: favBlog.title, author: favBlog.author, likes: favBlog.likes };
};

const mostBlogs = (blogs) => {
  const groupedByAuthor = lodash.groupBy(blogs, "author");
  const mostBlogsAuthor = lodash.maxBy(
    Object.keys(groupedByAuthor),
    (author) => groupedByAuthor[author].length,
  );
  return {
    author: mostBlogsAuthor,
    blogs: groupedByAuthor[mostBlogsAuthor].length,
  };
};

const favoriteAuthor = (blogs) => {
  const favAuthor = blogs.reduce((fav, current) => {
    return current.likes > fav.likes ? current : fav;
  });

  const likes = blogs.reduce((total, current) => {
    if (current.author === favAuthor.author) {
      return total + current.likes;
    }
    return total;
  }, 0);

  return {
    author: favAuthor.author,
    likes: likes,
  };
};

export default {
  reverseString,
  arrAverage,
  blogDummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  favoriteAuthor,
};
