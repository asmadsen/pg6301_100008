import { shallow } from 'enzyme'
import Alert from '../../../../src/client/components/base/Alert'
import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'

describe('client/components/base/Alert', () => {
	it('should render correct icon depending on variant', () => {
		const wrapper = shallow(<Alert variant="error" />)
		const expectIcon = icon => {
			const type = wrapper.props().message.props.children[0].type
			expect(type).toEqual(icon)
		}
		expectIcon(ErrorIcon)
		wrapper.setProps({ variant: 'success' })
		expectIcon(CheckCircleIcon)
		wrapper.setProps({ variant: 'info' })
		expectIcon(InfoIcon)
		wrapper.setProps({ variant: 'warning' })
		expectIcon(WarningIcon)
	})

	it('should render action if onClose is provided', () => {
		const wrapper = shallow(<Alert variant="error" onClose={() => {}} />)

		expect(wrapper.props().action[0]).not.toEqual(undefined)
		wrapper.setProps({ variant: 'error', onClose: undefined })
		expect(wrapper.props().action[0]).toEqual(undefined)
	})
})
