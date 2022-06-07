/* eslint-disable import/prefer-default-export */
export const paginate = (array, pageSize, page) => ({
  data: array.slice((page - 1) * pageSize, page * pageSize),
  page,
  pages: Math.floor(array.length / pageSize) + 1,
  total: array.length,
});
