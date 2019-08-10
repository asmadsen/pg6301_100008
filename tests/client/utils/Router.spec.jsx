import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { Router } from '../../../src/client/utils/Router'
import { nextTick } from '../utils'

describe('client/utils/Router', () => {
	const expectPath = path => expect.objectContaining({
		match: expect.objectContaining({ path })
	})
	it('should convert sensible route spec to jsx', async () => {
		const mock = jest.fn()
		let history
		const component = props => {
			mock(props)
			// eslint-disable-next-line react/prop-types
			if (!history) history = props.history
			// eslint-disable-next-line react/prop-types
			return <p>Route: {props.match.path}</p>
		}
		const routes = [
			{
				exact: true,
				path: '/',
				component: () => Promise.resolve(component)
			},
			{
				exact: true,
				path: '/about',
				component: () => Promise.resolve(component)
			}
		]
		const wrapper = mount((
			<MemoryRouter>
				<Router routes={routes}/>
			</MemoryRouter>
		))
		expect(wrapper.find('Switch').props().children).toHaveLength(2)
		await nextTick()
		expect(mock).toHaveBeenCalledWith(expectPath('/'))

		history.push('/about')
		await nextTick()
		expect(mock).toHaveBeenCalledWith(expectPath('/about'))
	})
})
