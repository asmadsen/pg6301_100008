import BaseEntity from '../../../src/server/db/BaseEntity'

class DemoClass extends BaseEntity {
	create({ name }) {
		if (this.get(entry => entry.name === name.trim())) return false

		const newEntry = {
			id: this.nextId++,
			name
		}

		this.items.set(newEntry.id, this.sanitize(newEntry))
		return newEntry.id
	}
}

describe('server/db/BaseEntity.js', () => {
	it('should throw exception if instantiated', () => {
		expect(() => new BaseEntity())
			.toThrow('Cannot construct BaseEntity instances directly')
	})

	it('should have array getter', () => {
		const demo = new DemoClass()

		expect(demo.all).toEqual([])
	})

	it('should start first entry with id 1', () => {
		const demo = new DemoClass()

		expect(demo.all).toEqual([])
		expect(demo.create({ name: 'Ola' })).toEqual(1)
		expect(demo.all).toEqual([ { id: 1, name: 'Ola' } ])
	})

	it('should throw error if create or update not implemented', () => {
		const demoNoCreateOrUpdate = new (class extends BaseEntity {
		})()

		expect(demoNoCreateOrUpdate.create({}))
			.rejects.toThrow('Create method must be implemented in subclass')
		expect(demoNoCreateOrUpdate.update(1, {}))
			.rejects.toThrow('Update method must be implemented in subclass')
	})

	it('should get entry by identifier or predicate', () => {
		const demo = new DemoClass()
		demo.create({ name: 'Ola' })
		expect(demo.get(1)).toEqual({ id: 1, name: 'Ola' })
		expect(demo.get(entry => entry.name === 'Ola')).toEqual({ id: 1, name: 'Ola' })
	})

	it('should be able to delete entry by identifier or predicate', () => {
		const demo = new DemoClass()
		demo.create({ name: 'Ola' })
		demo.create({ name: 'Kari' })
		demo.create({ name: 'Petter' })
		expect(demo.delete(entry => entry.name.includes('a'))).toEqual(2)
		expect(demo.all).not.toContain({ id: 1, name: 'Ola' })
		expect(demo.all).not.toContain({ id: 2, name: 'Kari' })
		expect(demo.delete(entry => entry.name.includes('a'))).toEqual(0)
		expect(demo.delete(3)).toEqual(1)
		expect(demo.all).toEqual([])
	})

	it('should clear state and reset ID counter', () => {
		const demo = new DemoClass()
		demo.create({ name: 'Ola' })
		expect(demo.all).toHaveLength(1)
		expect(demo.all.find(() => true)).toHaveProperty('id', 1)

		demo.reset()

		expect(demo.all).toHaveLength(0)
		demo.create({ name: 'Ola' })
		expect(demo.all).toHaveLength(1)
		expect(demo.all.find(() => true)).toHaveProperty('id', 1)
	})
})
