export const paginate = (items, currentPage, itemsPerPage) => {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return items.slice(start, end);
};

export const getTotalPages = (items, itemsPerPage) => {
  return Math.ceil(items.length / itemsPerPage);
};

export const getPageNumbers = (totalPages) => {
  return Array.from({length: totalPages}, (_, index) => index + 1);
};
