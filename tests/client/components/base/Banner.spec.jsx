import React from 'react'
import { shallow } from 'enzyme'
import Banner from '../../../../src/client/components/base/Banner'

describe('client/components/base/banner', () => {
	it('should not render icon or button unless provided', () => {
		const wrapper = shallow(<Banner>Children</Banner>)

		expect(wrapper.findByTestId('icon').exists()).toEqual(false)
		expect(wrapper.findByTestId('children').text()).toEqual('Children')
		expect(wrapper.findByTestId('button').exists()).toEqual(false)

		wrapper.setProps({ icon: 'Icon' })
		expect(wrapper.findByTestId('icon').exists()).toEqual(true)
		expect(wrapper.findByTestId('children').text()).toEqual('Children')
		expect(wrapper.findByTestId('button').exists()).toEqual(false)

		wrapper.setProps({ button: 'Button', icon: null })
		expect(wrapper.findByTestId('icon').exists()).toEqual(false)
		expect(wrapper.findByTestId('children').text()).toEqual('Children')
		expect(wrapper.findByTestId('button').exists()).toEqual(true)
	})
})
