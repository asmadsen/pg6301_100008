import { useState } from 'react'

export default (options = { currentPage: 0, rowsPerPage: 9, rowsPerPageOptions: [6, 9, 12, 15, 18] }) => {
	const [totalItems, setTotalItems] = useState(0)
	const [currentPage, setCurrentPage] = useState(options.currentPage)
	const [rowsPerPage, setRowsPerPage] = useState(options.rowsPerPage)

	return {
		get totalItems() {
			return totalItems
		},
		set totalItems(value) {
			if (value !== totalItems) setTotalItems(value)
		},
		get currentPage() {
			return currentPage
		},
		set currentPage(value) {
			if (value !== currentPage) setCurrentPage(value)
		},
		get rowsPerPage() {
			return rowsPerPage
		},
		set rowsPerPage(value) {
			if (value !== rowsPerPage) setRowsPerPage(value)
		},
		props: {
			onChangePage: (_, page) => setCurrentPage(page),
			onChangeRowsPerPage: e => setRowsPerPage(e.target.value),
			rowsPerPage,
			count: totalItems,
			page: currentPage,
			rowsPerPageOptions: options.rowsPerPageOptions,
		}
	}
}
