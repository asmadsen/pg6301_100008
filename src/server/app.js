import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import { isProd } from '../shared/utils'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import registerModules from './modules'
import { Users } from './db/Users'
import Container from './Container'
import factories from './factories'
import { Subject } from 'rxjs'

const app = express()
app.use(bodyParser.json())

const container = new Container(factories)

app.use(session({
	secret: 'your mom',
	resave: true,
	saveUninitialized: false
}))

if (isProd) {
	app.use(express.static('public'))
}

const users = container.get(Users)

passport.use(new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	}, async (email, password, done) => {
		if (!await users.verifyUser(email, password)) {
			done(null, false, { message: 'Invalid email/password' })
			return
		}

		const user = users.get(({ email: dbEmail }) => dbEmail === email)
		done(null, user)
	}
))

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
	const user = users.get(id)

	if (user !== null) {
		done(null, user)
	} else {
		done(null, false)
	}
})

app.use(passport.initialize())
app.use(passport.session())

registerModules(app, container)

const subject = container.get(Subject)
subject.subscribe({
	next: value => {
		console.log(value)
	}
})

export default app
