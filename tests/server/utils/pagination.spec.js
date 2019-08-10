import { paginate } from '../../../src/server/utils/pagination'

describe('server/utils/pagination', () => {
	it('should shorten array according to pagination options', () => {
		const items = [...Array(100).keys()]
		expect(paginate(items)).toEqual(items.slice(0, 9))
		expect(paginate(items)).not.toContain(9)
		expect(paginate(items, 9, 1)).toEqual(items.slice(9, 18))
		expect(paginate(items, 9, 1)).not.toContain(8)
		expect([...paginate(items), ...paginate(items, 9, 1)])
			.toEqual([...Array(18).keys()])
	})
})
