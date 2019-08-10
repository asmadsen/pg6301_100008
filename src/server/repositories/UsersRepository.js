export class UsersRepository {
	db

	constructor(db) {
		this.db = db
	}

	create(user) {
		return this.db.create(user)
	}

	getUsersByIds(ids) {
		return this.db.all.filter(user => ids.includes(user.id))
	}
}
