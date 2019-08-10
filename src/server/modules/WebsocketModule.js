import expressWs from 'express-ws'
import { ReviewSavedTopic } from '../topics'
import { liveChatTopic, updateMovieTopic } from '../../shared/WebsocketTopics'

export default (app, subject) => {
	const ws = expressWs(app)

	app.ws('/', (socket, req) => {
		socket.on('message', message => {
			const { topic, data } = JSON.parse(message)
			switch (topic) {
				case liveChatTopic:
					broadcast(liveChatTopic, data)
			}
		})

		socket.on('close', () => {

		})
	})

	const broadcast = (topic, data) => {
		const timestamp = Date.now()
		ws.getWss().clients.forEach(client => {
			client.send(JSON.stringify({
				topic,
				data,
				timestamp
			}))
		})
	}

	subject.subscribe({
		next: value => {
			switch (value.topic) {
				case ReviewSavedTopic:
					broadcast(updateMovieTopic, {
						movieId: value.data.movieId
					})
			}
		}
	})
}
