export const paginate = (items, itemsPerPage = 9, page = 0) => items.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
