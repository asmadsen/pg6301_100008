import React, { useEffect, useState } from 'react'
import { Launcher } from 'react-chat-window'
import { useWebsocketContext } from '../utils/Websocket'
import { liveChatTopic } from '../../shared/WebsocketTopics'
import { useApiContext } from '../utils/Api'

const LiveChat = () => {
	const { user } = useApiContext()
	const websocket = useWebsocketContext()
	const [messages, setMessages] = useState([])
	const [isOpen, setIsOpen] = useState(false)
	const [newMessageCount, setNewMessageCount] = useState(0)

	useEffect(() => {
		const subject = websocket.subscribe(
			({ topic, data }) => {
				if (topic === liveChatTopic) {
					setMessages([
						...messages,
						{
							...data,
							author: data.sender.id === user.id ? 'me' : 'them',
						}
					])
					if (!isOpen) {
						setNewMessageCount(newMessageCount + 1)
					}
				}
			}
		)
		return () => subject.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages])

	if (isOpen && newMessageCount > 0) {
		setNewMessageCount(0)
	}

	const sendMessage = message => {
		websocket.next({
			topic: liveChatTopic,
			data: {
				...message,
				sender: user
			}
		})
	}

	return (
		<div>
			<Launcher
				data-test-id="chat"
				handleClick={() => setIsOpen(!isOpen)}
				agentProfile={{
					teamName: 'All other users'
				}}
				newMessagesCount={newMessageCount}
				messageList={messages}
				isOpen={isOpen}
				onMessageWasSent={sendMessage}
			/>
		</div>
	)
}

export default LiveChat
