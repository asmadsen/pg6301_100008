import React from 'react'
import { TextField } from '../../../../src/client/components/base/TextField'
import { shallow } from 'enzyme'

describe('client/components/base/TextField', () => {
	it('should proxy props but have some defaults', () => {
		let wrapper = shallow(<TextField/>)

		expect(wrapper.props()).toEqual(expect.objectContaining({
			variant: 'filled',
			margin: 'dense',
			fullWidth: true
		}))

		wrapper = shallow(<TextField
			variant={'standard'}
			margin={'none'}
			label={'Some label'}
		/>)

		expect(wrapper.props()).toEqual(expect.objectContaining({
			variant: 'standard',
			margin: 'none',
			fullWidth: true,
			label: 'Some label'
		}))
	})
})
