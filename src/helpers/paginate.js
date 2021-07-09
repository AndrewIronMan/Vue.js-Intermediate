export default (arrPosts, nextPage, perPage) => {
  const skip = nextPage && nextPage > 1 ? nextPage * perPage - perPage : 0;
  const limit = perPage || 10;
  return {
    posts: arrPosts.slice(
      nextPage < Math.ceil(arrPosts.length / limit)
        ? skip
        : Math.ceil(arrPosts.length / limit) * perPage - perPage,
      limit ? skip + limit : arrPosts.length,
    ),
    meta: {
      currentPage:
        nextPage > Math.ceil(arrPosts.length / limit)
          ? Math.ceil(arrPosts.length / limit)
          : nextPage || 1,
      perPage: limit,
      total: arrPosts.length,
      totalPages: Math.ceil(arrPosts.length / limit),
    },
  };
};
