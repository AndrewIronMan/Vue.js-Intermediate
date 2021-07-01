export default (arr, nextPage, perPage) => {
  const skip = nextPage && nextPage > 1 ? nextPage * perPage - perPage : 0;
  const limit = perPage || 10;
  return {
    posts: arr.slice(
      nextPage < Math.ceil(arr.length / limit)
        ? skip
        : Math.ceil(arr.length / limit) * perPage - perPage,
      limit ? skip + limit : arr.length,
    ),
    meta: {
      currentPage:
        nextPage > Math.ceil(arr.length / limit) ? Math.ceil(arr.length / limit) : nextPage || 1,
      perPage: limit,
      total: arr.length,
      totalPages: Math.ceil(arr.length / limit),
    },
  };
};
