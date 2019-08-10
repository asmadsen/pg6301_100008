import { users, Users } from './db/Users'
import { Reviews, reviews } from './db/Reviews'
import { movies, Movies } from './db/Movies'
import { ReviewsRepository } from './repositories/ReviewsRepository'
import movieModule, { MovieModule } from './modules/MovieModule'
import movieGenreModule, { MovieGenreModule } from './modules/MovieGenreModule'
import { MoviesRepository } from './repositories/MoviesRepository'
import { UsersRepository } from './repositories/UsersRepository'
import authenticationModule, { AuthenticationModule } from './modules/AuthenticationModule'
import reviewModule, { ReviewModule } from './modules/ReviewModule'
import { Subject } from 'rxjs'

export default {
	[Subject]: [[], () => new Subject()],
	[Users]: [[], () => users],
	[Movies]: [[], () => movies],
	[Reviews]: [[], () => reviews],
	[MoviesRepository]: [Movies, ReviewsRepository],
	[UsersRepository]: [Users],
	[ReviewsRepository]: [Reviews, UsersRepository, Subject],
	[AuthenticationModule]: [[UsersRepository], authenticationModule],
	[MovieModule]: [[MoviesRepository, ReviewsRepository], movieModule],
	[MovieGenreModule]: [[MoviesRepository], movieGenreModule],
	[ReviewModule]: [[ReviewsRepository], reviewModule]
}
