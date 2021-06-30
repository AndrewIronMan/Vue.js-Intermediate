export default (posts, userId) => {
  if (userId) {
    return posts.filter((post) => post.userId === userId);
  }
  return posts;
};
