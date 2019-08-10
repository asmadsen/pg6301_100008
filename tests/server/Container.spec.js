import Container from '../../src/server/Container'

describe('server/Container', () => {
	it('should resolve variables', () => {
		const container = new Container({
			apiKey: 'megaSecret',
			someNumber: 12345
		})

		expect(container.get('nonExistingKey')).toEqual(null)
		expect(container.get('apiKey')).toEqual('megaSecret')
		expect(container.get('someNumber')).toEqual(12345)
	})

	it('should resolve dependencies', () => {
		const mock = jest.fn(() => 42)
		const mockApiKey = jest.fn().mockReturnValue('megaSecret')
		const container = new Container({
			apiKey: [[], mockApiKey],
			someNumber: 12345,
			hasDependencies: [['apiKey', 'someNumber'], mock],
		})

		expect(container.get('hasDependencies')).toEqual(42)
		expect(mock).toHaveBeenNthCalledWith(1, 'megaSecret', 12345)
		expect(container.get('apiKey')).toEqual('megaSecret')
		expect(mockApiKey).toHaveBeenCalledTimes(1)
	})

	it('should call identifier if factory func is not provided', () => {
		const mock = jest.fn()
		class ClassDep {
			constructor(apiKey, someNumber) {
				mock(apiKey, someNumber)
			}
		}
		const container = new Container({
			apiKey: 'megaSecret',
			someNumber: 12345,
			[ClassDep]: ['apiKey', 'someNumber'],
		})

		expect(container.get(ClassDep)).toBeInstanceOf(ClassDep)
		expect(container.get(ClassDep)).toBeInstanceOf(ClassDep)
		expect(mock).toHaveBeenNthCalledWith(1, 'megaSecret', 12345)
	})

	it('should return null if factory func is not provided and identifier is not constructor', () => {
		const InvalidDep = () => null
		const container = new Container({
			apiKey: 'megaSecret',
			someNumber: 12345,
			[InvalidDep]: ['apiKey', 'someNumber'],
		})

		expect(container.get(InvalidDep)).toBeNull()
	})
})
