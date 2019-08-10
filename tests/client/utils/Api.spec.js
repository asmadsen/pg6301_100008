import Api from '../../../src/client/utils/Api'
import axios from 'axios'

describe('client/utils/Api', () => {
	const clearMock = mock => { mock.mockClear(); return mock }
	const axiosGetSpy = () => clearMock(jest.spyOn(axios, 'get'))
	const axiosPostSpy = () => clearMock(jest.spyOn(axios, 'post'))

	it('should return isLoggedIn', () => {
		expect(Api({ user: null })).toHaveProperty('isLoggedIn', false)
		expect(Api({ user: {} })).toHaveProperty('isLoggedIn', true)
	})

	it('should call setUser when /user request returns', async () => {
		const setUserMock = jest.fn()
		const api = Api({ user: null, setUser: setUserMock })
		const spy = jest.spyOn(axios, 'get')
		spy
			.mockResolvedValue({ data: { results: ['userobj'] } })

		await expect(api.getUserInfo()).resolves.toEqual('userobj')
		expect(spy).toHaveBeenNthCalledWith(1, '/user')
		expect(setUserMock).toHaveBeenNthCalledWith(1, 'userobj')

		spy.mockClear()
		setUserMock.mockClear()
		spy
			.mockRejectedValue({})
		await expect(api.getUserInfo()).resolves.toEqual(null)
		expect(spy).toHaveBeenNthCalledWith(1, '/user')
		expect(setUserMock).toHaveBeenNthCalledWith(1, null)
	})

	it('should also call getUserInfo when login succeeds', async () => {
		const api = Api({ user: null, setUser: () => {} })
		const loginSpy = axiosPostSpy()
		const getUserInfoSpy = axiosGetSpy()

		getUserInfoSpy.mockResolvedValue({ data: { results: ['userobj'] } })
		loginSpy.mockResolvedValue()
		await expect(api.login('email', 'password')).resolves.toEqual(true)
		expect(loginSpy).toHaveBeenNthCalledWith(1, '/login', { email: 'email', password: 'password' })
		expect(getUserInfoSpy).toHaveBeenCalledTimes(1)

		getUserInfoSpy.mockClear()
		loginSpy.mockRejectedValue()
		await expect(api.login('email', 'password')).resolves.toEqual(false)
		expect(getUserInfoSpy).not.toHaveBeenCalled()
	})

	it('should run getUserInfo when signup succeeds', async () => {
		const api = Api({ user: null, setUser: () => {} })
		const signUpSpy = axiosPostSpy()
		const getUserInfoSpy = axiosGetSpy()

		getUserInfoSpy.mockResolvedValue({ data: { results: ['userobj'] } })
		signUpSpy.mockResolvedValue()
		const credentials = {
			email: 'email', password: 'password', firstName: 'firstName', lastName: 'lastName', alias: 'alias', dateOfBirth: 'dateOfBirth'
		}
		await expect(api.signUp(credentials)).resolves.toEqual(true)
		expect(signUpSpy).toHaveBeenNthCalledWith(1, '/signup', credentials)
		expect(getUserInfoSpy).toHaveBeenCalledTimes(1)

		getUserInfoSpy.mockClear()
		signUpSpy.mockRejectedValue()
		await expect(api.signUp(credentials)).resolves.toEqual(false)
		expect(getUserInfoSpy).not.toHaveBeenCalled()

		getUserInfoSpy.mockClear()
		signUpSpy.mockRejectedValue({ response: { status: 401 } })
		await expect(api.signUp(credentials)).rejects.toThrow('You\'re are not logged in')
		expect(getUserInfoSpy).not.toHaveBeenCalled()

		getUserInfoSpy.mockClear()
		signUpSpy.mockRejectedValue({ response: { data: { error: { message: 'Sum ting wong' } } } })
		await expect(api.signUp(credentials)).rejects.toThrow('Sum ting wong')
		expect(getUserInfoSpy).not.toHaveBeenCalled()
	})
})
