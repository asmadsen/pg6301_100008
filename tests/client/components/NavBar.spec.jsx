import NavBar from '../../../src/client/components/NavBar'
import React from 'react'
import { shallow } from 'enzyme'
import { mockApiContext } from '../utils'

describe('client/components/NavBar', () => {
	it.only('should show login button when not loggedin', async () => {
		mockApiContext({
			isLoggedIn: false
		})

		const wrapper = shallow(<NavBar.WrappedComponent loading={false} title="title"/>)

		expect(wrapper.findByTestId('title').text()).toEqual('title')
		expect(wrapper.findByTestId('loginButton').exists()).toEqual(true)

		mockApiContext({
			isLoggedIn: true
		})
	})
})
