import { testHook } from './utils'
import usePagination from '../../../src/client/hooks/usePagination'

describe('client/hooks/usePagination', () => {
	it('should provide getter and setter for totalItems, currentPage and rowsPerPage', () => {
		let hook
		testHook(() => {
			hook = usePagination()
		})

		expect(hook.totalItems).toEqual(0)
		hook.totalItems++
		expect(hook.totalItems).toEqual(1)

		expect(hook.currentPage).toEqual(0)
		hook.currentPage++
		expect(hook.currentPage).toEqual(1)

		expect(hook.rowsPerPage).toEqual(9)
		hook.rowsPerPage++
		expect(hook.rowsPerPage).toEqual(10)
	})

	it('should provide props object', () => {
		let hook
		testHook(() => {
			hook = usePagination()
		})

		expect(hook.props).toEqual(expect.objectContaining({
			count: 0,
			page: 0,
			rowsPerPage: 9,
			rowsPerPageOptions: [6, 9, 12, 15, 18]
		}))

		hook.props.onChangePage(null, 1)

		expect(hook.props).toEqual(expect.objectContaining({
			count: 0,
			page: 1,
			rowsPerPage: 9,
			rowsPerPageOptions: [6, 9, 12, 15, 18]
		}))

		hook.props.onChangeRowsPerPage({ target: { value: 6 } })

		expect(hook.props).toEqual(expect.objectContaining({
			count: 0,
			page: 1,
			rowsPerPage: 6,
			rowsPerPageOptions: [6, 9, 12, 15, 18]
		}))
	})
})
