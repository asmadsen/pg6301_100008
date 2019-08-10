export default class BaseEntity {
	items = new Map()

	nextId = 1

	identifier = 'id'

	constructor() {
		if (new.target === BaseEntity) {
			throw new TypeError('Cannot construct BaseEntity instances directly')
		}
	}

	get all() {
		return Array.from(this.items.values())
	}

	get(identifierValueOrPredicate) {
		if (typeof identifierValueOrPredicate === 'function') {
			return Array.from(this.items.values()).find(identifierValueOrPredicate)
		}
		return this.items.get(identifierValueOrPredicate)
	}

	async create(entry) {
		throw new Error('Create method must be implemented in subclass')
	}

	async update(identifierValueOrPredicate, entry) {
		throw new Error('Update method must be implemented in subclass')
	}

	delete(identifierValueOrPredicate) {
		let identifiers = []
		if (typeof identifierValueOrPredicate === 'function') {
			identifiers = this.all.filter(identifierValueOrPredicate).map(entry => entry[this.identifier])
		} else {
			identifiers = [identifierValueOrPredicate]
		}
		return identifiers.map(identifier => this.items.delete(identifier)).filter(changed => changed).length
	}

	updateGuard(identifierValueOrPredicate, entry) {
		if (typeof entry === 'undefined') {
			entry = identifierValueOrPredicate
			identifierValueOrPredicate = identifierValueOrPredicate[this.identifier]
		}
		const existingEntry = this.get(identifierValueOrPredicate)
		if (!existingEntry) return { existingEntry: false, input: entry }
		if (existingEntry[this.identifier] !== identifierValueOrPredicate) return { existingEntry: false, input: entry }
		return { existingEntry, input: entry }
	}

	sanitize(input) {
		return input
	}

	reset() {
		this.items.clear()
		this.nextId = 1
	}
}
