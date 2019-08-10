import LiveChat from '../../../src/client/components/LiveChat'
import React from 'react'
import { shallow } from 'enzyme'
import { mockApiContext, mockWebsocketContext } from '../utils'
import { liveChatTopic } from '../../../src/shared/WebsocketTopics'

describe('client/components/LiveChat', () => {
	it('should toggle chat window', () => {
		const wrapper = shallow(<LiveChat />)

		expect(wrapper.findByTestId('chat').props()).toHaveProperty('isOpen', false)
		wrapper.findByTestId('chat').props().handleClick()
		expect(wrapper.findByTestId('chat').props()).toHaveProperty('isOpen', true)
	})

	it('should publish new messages to websocket', () => {
		const mock = jest.fn()
		mockWebsocketContext({
			next: mock
		})
		mockApiContext({
			user: {
				id: 1
			}
		})

		const wrapper = shallow(<LiveChat />)
		wrapper.findByTestId('chat').simulate('messageWasSent', { message: 'message' })
		expect(mock).toHaveBeenNthCalledWith(1, {
			topic: liveChatTopic,
			data: {
				message: 'message',
				sender: {
					id: 1
				}
			}
		})
	})
})
