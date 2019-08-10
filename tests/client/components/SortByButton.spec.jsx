import React from 'react'
import SortByButton from '../../../src/client/components/SortByButton'
import { shallow } from 'enzyme'
import { Icon, MenuItem } from '@material-ui/core'
import { nextTick } from '../utils'

describe('client/components/SortByButton', () => {
	let props
	let wrapper

	beforeEach(() => {
		props = {
			sortBy: 'rating',
			sortDirection: 'asc',
			onSortByChanged: jest.fn(),
			onSortDirectionChanged: jest.fn(),
			options: {
				rating: 'asc',
				id: 'asc'
			}
		}
		wrapper = shallow(<SortByButton {...props} />)
	})

	it('should show current sorting', () => {
		let btn = wrapper.findByTestId('activator')
		expect(btn.text()).toContain('rating')
		expect(btn.find(Icon).props().className).toContain('fa-caret-up')

		props.sortBy = 'id'
		wrapper.setProps(props)

		btn = wrapper.findByTestId('activator')
		expect(btn.text()).toContain('id')
		expect(btn.find(Icon).props().className).toContain('fa-caret-up')

		props.sortDirection = 'desc'
		wrapper.setProps(props)

		btn = wrapper.findByTestId('activator')
		expect(btn.text()).toContain('id')
		expect(btn.find(Icon).props().className).toContain('fa-caret-down')
	})

	it('should toggle sort direction when current sortBy is chosen in menu', () => {
		expect(wrapper.findByTestId('menu').props()).toHaveProperty('open', false)
		wrapper.findByTestId('activator').simulate('click', { target: 'something' })
		expect(wrapper.findByTestId('menu').props()).toHaveProperty('open', true)

		expect(props.onSortDirectionChanged).not.toHaveBeenCalled()
		wrapper.find(MenuItem).findWhere(item => item.key() === 'rating').simulate('click')
		expect(props.onSortByChanged).not.toHaveBeenCalled()
		expect(wrapper.findByTestId('menu').props()).toHaveProperty('open', false)
		expect(props.onSortDirectionChanged).toHaveBeenNthCalledWith(1, 'desc')

		props.sortDirection = 'desc'
		props.onSortDirectionChanged.mockClear()
		wrapper.setProps(props)
		wrapper.find(MenuItem).findWhere(item => item.key() === 'rating').simulate('click')
		expect(props.onSortDirectionChanged).toHaveBeenNthCalledWith(1, 'asc')
	})

	it('should set sortDirection to default direction for key when changing sortBy', () => {
		expect(wrapper.findByTestId('menu').props()).toHaveProperty('open', false)
		wrapper.findByTestId('activator').simulate('click', { target: 'something' })
		expect(wrapper.findByTestId('menu').props()).toHaveProperty('open', true)

		expect(props.onSortDirectionChanged).not.toHaveBeenCalled()
		expect(props.onSortByChanged).not.toHaveBeenCalled()
		wrapper.find(MenuItem).findWhere(item => item.key() === 'id').simulate('click')
		expect(props.onSortByChanged).toHaveBeenNthCalledWith(1, 'id')
		expect(props.onSortDirectionChanged).toHaveBeenNthCalledWith(1, 'asc')
		expect(wrapper.findByTestId('menu').props()).toHaveProperty('open', false)
	})

	it('should close when Menu onClose is called', () => {
		expect(wrapper.findByTestId('menu').props()).toHaveProperty('open', false)
		wrapper.findByTestId('activator').simulate('click', { target: 'something' })
		expect(wrapper.findByTestId('menu').props()).toHaveProperty('open', true)
		wrapper.findByTestId('menu').simulate('close')
		expect(wrapper.findByTestId('menu').props()).toHaveProperty('open', false)
	})
})
