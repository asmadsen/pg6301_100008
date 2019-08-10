import React from 'react'
import { mockApiContext, nextTick } from '../utils'
import UserProfile from '../../../src/client/views/UserProfile'
import { mount, shallow } from 'enzyme'
import { Redirect } from 'react-router'

describe('client/views/UserProfile', () => {
	it('should redirect to home if not logged in', () => {
		mockApiContext({
			user: null
		})
		const wrapper = shallow(<UserProfile setTitle={() => {}} />)

		expect(wrapper.type()).toEqual(Redirect)
	})

	it('should only render alias if provided', () => {
		mockApiContext({
			user: {
				alias: 'Present'
			}
		})

		const wrapper = shallow(<UserProfile setTitle={() => {}} />)

		expect(wrapper.findByTestId('alias').exists()).toEqual(true)

		mockApiContext({
			user: {
				alias: ''
			}
		})

		wrapper.rerender()
		expect(wrapper.findByTestId('alias').exists()).toEqual(false)

		mockApiContext({
			user: {}
		})

		wrapper.rerender()
		expect(wrapper.findByTestId('alias').exists()).toEqual(false)
	})

	it('should show loading for movies reviews when not fetched yet', async () => {
		mockApiContext({
			user: {},
			getLoggedInUserReviews: () => Promise.resolve(null)
		})

		let wrapper = mount(<UserProfile setTitle={() => {}} />)

		expect(wrapper.findByTestId('reviews').text()).toContain('Loading...')

		mockApiContext({
			user: {},
			getLoggedInUserReviews: () => Promise.resolve([1, 2, 3])
		})

		wrapper = mount(<UserProfile setTitle={() => {}} />)
		await nextTick()
		expect(wrapper.findByTestId('reviews').text()).not.toContain('Loading...')
	})
})
