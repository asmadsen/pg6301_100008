import { AuthenticationModule } from './AuthenticationModule'
import { MovieModule } from './MovieModule'
import { MovieGenreModule } from './MovieGenreModule'
import { ReviewModule } from './ReviewModule'
import WebsocketModule from './WebsocketModule'
import { Subject } from 'rxjs'

export default (app, container) => {
	WebsocketModule(app, container.get(Subject))
	app.use('/api', container.get(AuthenticationModule))
	app.use('/api', container.get(MovieModule))
	app.use('/api', container.get(MovieGenreModule))
	app.use('/api', container.get(ReviewModule))
}
