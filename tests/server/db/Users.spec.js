import { Users } from '../../../src/server/db/Users'

describe('server/db/Users.js', () => {
	it('should create unique users by email', async () => {
		const users = new Users()

		await users.create({
			email: 'ola@nordmann.no',
			password: 'IvarAasen❤️',
			firstName: 'Ola',
			lastName: 'Nordmann',
			dateOfBirth: Date(1814, 5, 17),
			location: 'Norge'
		})

		await expect(users.create({
			email: 'ola@nordmann.no',
			password: 'IvarAasen❤️',
			firstName: 'Ola',
			lastName: 'Nordmann',
			dateOfBirth: Date(1814, 5, 17),
			location: 'Norge'
		})).rejects.toThrow('Email already exists')
	})

	it('should update users', async () => {
		const users = new Users()

		const firstState = {
			email: 'ola@nordmann.no',
			password: 'IvarAasen❤️',
			firstName: 'Ola',
			lastName: 'Nordmann',
			dateOfBirth: Date(1814, 5, 17),
			location: 'Norge'
		}

		await users.create(firstState)

		expect(users.get(1)).toHaveProperty('firstName', 'Ola')

		await users.update({ id: 1, firstName: 'Kari' })
		expect(users.get(1)).toHaveProperty('firstName', 'Kari')

		await users.update(1, { firstName: 'Petter' })
		expect(users.get(1)).toHaveProperty('firstName', 'Petter')

		await expect(users.update(2, { firstName: 'Petter' })).resolves.toEqual(false)
	})

	it('should fail if no password provided', async () => {
		const users = new Users()

		await expect(users.create({
			email: 'ola@nordmann.no',
			firstName: 'Ola',
			lastName: 'Nordmann',
			dateOfBirth: Date(1814, 5, 17),
			location: 'Norge'
		})).rejects.toThrow('Missing password')
	})

	it('should save hashed password', async () => {
		const users = new Users()

		const user = {
			email: 'ola@nordmann.no',
			password: 'IvarAasen❤️',
			firstName: 'Ola',
			lastName: 'Nordmann',
			dateOfBirth: Date(1814, 5, 17),
			location: 'Norge'
		}

		await users.create(user)

		expect(users.get(1).password).not.toEqual(user.password)

		const valid = await users.verifyUser(user.email, user.password)
		expect(valid).toEqual(true)
	})
})
