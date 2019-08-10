import LoginPage from '../../../src/client/views/LoginPage'
import { shallow } from 'enzyme'
import React from 'react'
import { mockApiContext, nextTick, testErrorHandling } from '../utils'
import * as Api from '../../../src/client/utils/Api'
import { Redirect } from 'react-router'

describe('client/views/LoginPage', () => {
	it('should validate email', () => {
		const wrapper = shallow(<LoginPage />)

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

	it('should validate password', () => {
		const wrapper = shallow(<LoginPage />)

		testErrorHandling(
			wrapper,
			'password',
			{
				'Password must be at least 6 characters': [
					'',
					'short'
				],
				null: [
					'123456'
				]
			}
		)
	})

	it('should not call login unless all fields are valid', () => {
		const mock = jest.fn()
		mockApiContext({ login: mock })
		const wrapper = shallow(<LoginPage />)

		const checkIfFieldsHasErrors = expected => {
			['email', 'password'].forEach(field => {
				expect(wrapper.findByTestId(field).props()).toHaveProperty('error', expected)
			})
		}

		checkIfFieldsHasErrors(false)
		wrapper.findByTestId('loginBtn').simulate('click')
		checkIfFieldsHasErrors(true)
		wrapper.findByTestId('email').simulate('change', { target: { value: 'valid@domain.tld' } })
		wrapper.findByTestId('password').simulate('change', { target: { value: '123456' } })
		checkIfFieldsHasErrors(false)
		expect(mock).not.toHaveBeenCalled()
		wrapper.findByTestId('loginBtn').simulate('click')
		expect(mock).toHaveBeenNthCalledWith(1, 'valid@domain.tld', '123456')
	})

	it('should show error if login failed', async () => {
		const mock = jest.fn()
		mockApiContext({ login: mock })
		const wrapper = shallow(<LoginPage />)

		wrapper.findByTestId('email').simulate('change', { target: { value: 'valid@domain.tld' } })
		wrapper.findByTestId('password').simulate('change', { target: { value: '123456' } })

		mock.mockImplementation(async () => {
			return false
		})

		wrapper.findByTestId('loginBtn').simulate('click')

		await nextTick()
		expect(wrapper.findByTestId('error').text())
			.toContain('We couldn\'t log you in, make sure you have an account and you used the correct credentials, or try again later')
	})

	it('should redirect to home if login succeeded', async () => {
		const mock = jest.fn()
		const routerMock = jest.fn()
		mockApiContext({ login: mock })
		const wrapper = shallow(<LoginPage history={{ push: routerMock }} />)

		wrapper.findByTestId('email').simulate('change', { target: { value: 'valid@domain.tld' } })
		wrapper.findByTestId('password').simulate('change', { target: { value: '123456' } })

		mock.mockImplementation(async () => {
			return true
		})

		wrapper.findByTestId('loginBtn').simulate('click')

		await nextTick()
		expect(routerMock).toHaveBeenNthCalledWith(1, '/')
	})

	it('should redirect to home if already logged in', () => {
		mockApiContext({ isLoggedIn: true })
		const wrapper = shallow(<LoginPage />)

		expect(wrapper.type()).toEqual(Redirect)
		expect(wrapper.props()).toHaveProperty('to', '/')
	})
})
