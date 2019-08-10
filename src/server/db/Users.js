import BaseEntity from './BaseEntity'
import * as bcrypt from 'bcrypt-promise'
import ApiError from '../../shared/ApiError'

export class Users extends BaseEntity {
	sanitize({ email, firstName, lastName, alias, dateOfBirth }) {
		return {
			email: email.trim(),
			firstName,
			lastName,
			dateOfBirth,
			alias
		}
	}

	get all() {
		return super.all.map(({ password, ...user }) => user)
	}

	async create({ email, password, firstName, lastName, alias, dateOfBirth }) {
		if (!password) throw new ApiError('Missing password')
		if (this.get(user => user.email === email.toLowerCase().trim())) throw new ApiError('Email already exists')

		const hash = await bcrypt.hash(password, await bcrypt.genSalt())

		const user = {
			id: this.nextId++,
			...this.sanitize({
				email,
				firstName,
				lastName,
				dateOfBirth,
				alias
			}),
			password: hash
		}

		this.items.set(user[this.identifier], user)
		return user[this.identifier]
	}

	async update(identifierValueOrPredicate, entry) {
		const { existingEntry, input } = this.updateGuard(identifierValueOrPredicate, entry)
		if (!existingEntry) return false
		const updatedEntry = { ...existingEntry, ...this.sanitize({ ...existingEntry, ...input }) }
		this.items.set(existingEntry[this.identifier], updatedEntry)
		return updatedEntry
	}

	async verifyUser(email, password) {
		const user = this.get(({ email: dbEmail }) => dbEmail === email)
		if (user) {
			return bcrypt.compare(password, user.password)
		}
		return false
	}
}

export const users = new Users()

users.items = new Map([[1,
	{ alias: 'example',
		email: 'post@example.com',
		firstName: 'John',
		id: 1,
		lastName: 'Doe',
		password:
			'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[2,
	{ alias: 'normand.howell',
		email: 'sheena.ward@yahoo.com',
		firstName: 'Karrie',
		id: 2,
		lastName: 'Osinski',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[3,
	{ alias: 'rosamond.wehner',
		email: 'miquel.kuhic@gmail.com',
		firstName: 'Lou',
		id: 3,
		lastName: 'Lesch',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[4,
	{ alias: 'shanna.mohr',
		email: 'gianna.okeefe@yahoo.com',
		firstName: 'Martin',
		id: 4,
		lastName: 'Stracke',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[5,
	{ alias: 'oralee.turcotte',
		email: 'deshawn.reichert@hotmail.com',
		firstName: 'Wilford',
		id: 5,
		lastName: 'Medhurst',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[6,
	{ alias: 'riley.schaefer',
		email: 'herman.huels@hotmail.com',
		firstName: 'Ryan',
		id: 6,
		lastName: 'Mertz',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[7,
	{ alias: 'delbert.dickinson',
		email: 'young.heller@gmail.com',
		firstName: 'Michael',
		id: 7,
		lastName: 'Ankunding',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[8,
	{ alias: 'kenneth.schamberger',
		email: 'elbert.zieme@hotmail.com',
		firstName: 'Oswaldo',
		id: 8,
		lastName: 'Ruecker',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[9,
	{ alias: 'donnetta.moen',
		email: 'abram.brekke@gmail.com',
		firstName: 'Thurman',
		id: 9,
		lastName: 'Russel',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[10,
	{ alias: 'mireya.kozey',
		email: 'alfreda.pollich@yahoo.com',
		firstName: 'Damien',
		id: 10,
		lastName: 'Metz',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[11,
	{ alias: 'lucia.schroeder',
		email: 'edwardo.bauch@yahoo.com',
		firstName: 'Ismael',
		id: 11,
		lastName: 'Swaniawski',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[12,
	{ alias: 'ardella.okon',
		email: 'chaya.stokes@yahoo.com',
		firstName: 'Vaughn',
		id: 12,
		lastName: 'Becker',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[13,
	{ alias: 'jame.balistreri',
		email: 'todd.denesik@hotmail.com',
		firstName: 'Osvaldo',
		id: 13,
		lastName: 'Hudson',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[14,
	{ alias: 'charlesetta.wolff',
		email: 'rudolf.armstrong@hotmail.com',
		firstName: 'Gerald',
		id: 14,
		lastName: 'Bartoletti',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[15,
	{ alias: 'francisca.batz',
		email: 'carlie.gusikowski@yahoo.com',
		firstName: 'Kathy',
		id: 15,
		lastName: 'Grant',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[16,
	{ alias: 'lucas.leuschke',
		email: 'terrence.reynolds@yahoo.com',
		firstName: 'Tyson',
		id: 16,
		lastName: 'Kulas',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[17,
	{ alias: 'lavern.grady',
		email: 'lean.ratke@gmail.com',
		firstName: 'Terrie',
		id: 17,
		lastName: 'Okuneva',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[18,
	{ alias: 'pedro.roberts',
		email: 'jeffrey.marvin@gmail.com',
		firstName: 'Ashely',
		id: 18,
		lastName: 'Klocko',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[19,
	{ alias: 'casey.rodriguez',
		email: 'robin.maggio@hotmail.com',
		firstName: 'Selina',
		id: 19,
		lastName: 'Vandervort',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[20,
	{ alias: 'beaulah.effertz',
		email: 'reanna.marquardt@yahoo.com',
		firstName: 'Ezekiel',
		id: 20,
		lastName: 'Dickinson',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }],
[21,
	{ alias: 'vito.runolfsdottir',
		email: 'robin.schuster@hotmail.com',
		firstName: 'Curt',
		id: 21,
		lastName: 'VonRueden',
		password:
				'$2a$10$J65xnFXGB20pvElymSRZVeqbgLzhq8IKdJpcSEjFe0sqPwrafHg.6' }]])
