import React from 'react'
import { shallow } from 'enzyme'
import SignUp from '../../../src/client/views/SignUp'
import { mockApiContext, nextTick, testErrorHandling } from '../utils'
import spacetime from 'spacetime'
import { Redirect } from 'react-router'
import ApiError from '../../../src/shared/ApiError'

describe('client/views/SignUp', () => {
	it('should validate email', () => {
		const wrapper = shallow(<SignUp />)

		testErrorHandling(
			wrapper,
			'email',
			{
				'Invalid email': [
					'',
					'invalid'
				],
				false: [
					'valid@domain.tld'
				]
			}
		)
	})

	it('should validate passwords', () => {
		const wrapper = shallow(<SignUp/>)
		const passwordError = 'Password must be at least 6 characters'
		testErrorHandling(
			wrapper,
			'password',
			{
				[passwordError]: [
					'',
					'short'
				],
				null: [
					'123456'
				]
			}
		)
		wrapper.findByTestId('password').simulate('change', { target: { value: '' } })

		testErrorHandling(
			wrapper,
			'confirmPassword',
			{
				[passwordError]: [
					''
				],
				'The passwords must be equal': [
					'notInSyncWithPassword'
				]
			}
		)

		wrapper.findByTestId('password').simulate('change', { target: { value: 'SuperSecure' } })
		wrapper.findByTestId('confirmPassword').simulate('change', { target: { value: 'SuperSecure' } })
		expect(wrapper.findByTestId('password').props())
			.toHaveProperty('error', false)
		expect(wrapper.findByTestId('confirmPassword').props())
			.toHaveProperty('error', false)
	})

	it('should validate names', () => {
		const wrapper = shallow(<SignUp/>)

		testErrorHandling(
			wrapper,
			'firstName',
			{
				'Firstname must be at least 2 characters': [
					''
				],
				null: [
					'Ola'
				]
			}
		)

		testErrorHandling(
			wrapper,
			'lastName',
			{
				'Lastname must be at least 2 characters': [
					''
				],
				null: [
					'Nordmann'
				]
			}
		)
	})

	it('should validate date of birth', () => {
		const wrapper = shallow(<SignUp/>)

		testErrorHandling(
			wrapper,
			'dateOfBirth',
			{
				'Date of birth must be in the past': [
					'',
					spacetime.now().add(1, 'second').d,
					spacetime.now().add(1, 'day').d
				],
				null: [
					spacetime.now().subtract(1, 'day').d
				]
			},
			value => value
		)
	})

	it('should validate location', () => {
		const wrapper = shallow(<SignUp/>)

		testErrorHandling(
			wrapper,
			'alias',
			{
				'Alias must be at least 2 characters': [
					''
				],
				null: [
					'Undercover'
				]
			}
		)
	})

	it('should only handle signup if all fields are valid', () => {
		const api = {
			signUp: jest.fn()
		}
		mockApiContext(api)

		const wrapper = shallow(<SignUp/>)

		const fields = {
			email: 'name@domain.tld',
			password: '123456',
			confirmPassword: '123456',
			firstName: 'Ola',
			lastName: 'Nordmann',
			dateOfBirth: spacetime().date(1).subtract(1, 'month')
				.second(0)
				.millisecond(0).d,
			alias: 'Norsemann'
		}
		const fieldNames = Object.keys(fields)

		fieldNames.forEach(field => {
			expect(wrapper.findByTestId(field).props()).toHaveProperty('error', false)
		})

		wrapper.findByTestId('signUpBtn').simulate('click')

		expect(api.signUp).not.toHaveBeenCalled()

		fieldNames.forEach(field => {
			expect(wrapper.findByTestId(field).props()).toHaveProperty('error', true)
		})

		expect(api.signUp).not.toHaveBeenCalled()
		// Populate fields
		Object.entries(fields).forEach(([field, value]) => {
			if (typeof value === 'string') {
				wrapper.findByTestId(field).simulate('change', { target: { value } })
			} else {
				wrapper.findByTestId(field).simulate('change', value)
			}
		})

		wrapper.findByTestId('signUpBtn').simulate('click')

		const expectingFields = fields
		delete expectingFields.confirmPassword
		expect(api.signUp).toHaveBeenCalledWith(expectingFields)
	})

	it('should redirect to home if already logged in', () => {
		mockApiContext({ isLoggedIn: true })
		const wrapper = shallow(<SignUp />)

		expect(wrapper.type()).toEqual(Redirect)
		expect(wrapper.props()).toHaveProperty('to', '/')
	})

	it('should redirect to home when registered', async () => {
		const mock = jest.fn()
		const routerMock = jest.fn()
		mockApiContext({
			signUp: mock
		})
		const wrapper = shallow(<SignUp history={{ push: routerMock }} />)

		const fields = {
			email: 'name@domain.tld',
			password: '123456',
			confirmPassword: '123456',
			firstName: 'Ola',
			lastName: 'Nordmann',
			dateOfBirth: spacetime().date(1).subtract(1, 'month')
				.second(0)
				.millisecond(0).d,
			alias: 'Norsemann'
		}

		Object.entries(fields).forEach(([field, value]) => {
			if (typeof value === 'string') {
				wrapper.findByTestId(field).simulate('change', { target: { value } })
			} else {
				wrapper.findByTestId(field).simulate('change', value)
			}
		})

		mock.mockImplementation(async () => {
			return true
		})

		expect(routerMock).not.toHaveBeenCalled()

		wrapper.findByTestId('signUpBtn').simulate('click')

		await nextTick()
		expect(routerMock).toHaveBeenNthCalledWith(1, '/')
	})

	it('should show error if ApiError is thrown', async () => {
		const mock = jest.fn()
		mockApiContext({
			signUp: mock
		})
		const wrapper = shallow(<SignUp />)

		const fields = {
			email: 'name@domain.tld',
			password: '123456',
			confirmPassword: '123456',
			firstName: 'Ola',
			lastName: 'Nordmann',
			dateOfBirth: spacetime().date(1).subtract(1, 'month')
				.second(0)
				.millisecond(0).d,
			alias: 'Norsemann'
		}

		Object.entries(fields).forEach(([field, value]) => {
			if (typeof value === 'string') {
				wrapper.findByTestId(field).simulate('change', { target: { value } })
			} else {
				wrapper.findByTestId(field).simulate('change', value)
			}
		})

		mock.mockImplementation(async () => {
			throw new ApiError('Some error from the api')
		})

		wrapper.findByTestId('signUpBtn').simulate('click')

		await nextTick()
		expect(wrapper.findByTestId('error').props()).toHaveProperty('message', 'Some error from the api')
	})
})
