const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((top, blog) => {
    return top.likes > blog.likes
      ? { title: top.title, author: top.author, likes: top.likes }
      : { title: blog.title, author: blog.author, likes: blog.likes };
  }, {});
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}