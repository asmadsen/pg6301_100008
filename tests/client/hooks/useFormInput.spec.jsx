import { useFormInput } from '../../../src/client/hooks/useFormInput'
import { testHook } from './utils'
import { act } from 'react-dom/test-utils'

describe('client/hooks/useFormInput', () => {
	it('should provide getter, setter and onChange', () => {
		let input, hook
		testHook(() => {
			hook = useFormInput('InitialValue')
			input = hook.input
		})

		expect(input).toMatchObject({
			onChange: expect.anything()
		})
		expect(input.value).toEqual('InitialValue')
		expect(hook.value).toEqual('InitialValue')
		act(() => { input.value = 'Changed' })
		expect(input.value).toEqual('Changed')
		expect(hook.value).toEqual('Changed')
		act(() => { hook.value = 'Changed again' })
		expect(input.value).toEqual('Changed again')
		expect(hook.value).toEqual('Changed again')

		act(() =>
			input.onChange({ target: { value: 'Changed from Event' } })
		)

		expect(input.value).toEqual('Changed from Event')
		expect(hook.value).toEqual('Changed from Event')
	})

	it('should validate if rule provided', () => {
		let input
		testHook(() => {
			input = useFormInput(1234, value => typeof value === 'number' || 'Error').input
		})

		expect(input).toHaveProperty('error', false)

		act(() =>
			input.onChange({ target: { value: 'Changed' } })
		)
		expect(input.value).toEqual('Changed')
		expect(input.error).toEqual(true)
	})

	it('should force validate then .validate is called', () => {
		let hook
		testHook(() => {
			hook = useFormInput('Invalid value', value => typeof value === 'number' || 'Error')
		})
		expect(hook.input.error).toEqual(false)

		act(() =>
			expect(hook.validate()).toEqual(false)
		)
		expect(hook.input.error).toEqual(true)

		act(() =>
			hook.input.onChange({ target: { value: 1 } })
		)
		expect(hook.input.error).toEqual(false)
		act(() =>
			expect(hook.validate()).toEqual(true)
		)
		expect(hook.input.error).toEqual(false)
	})

	it('should use event mapper if provided', () => {
		let hook
		const mapper = jest.fn()
		testHook(() => {
			hook = useFormInput('', [], mapper)
		})
		expect(mapper).not.toHaveBeenCalled()

		act(() => {
			hook.input.onChange('Something')
		})
		expect(mapper).toHaveBeenCalledWith('Something')
	})
})
