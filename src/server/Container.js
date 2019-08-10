export default class Container {
	resolved = {}

	factories = {}

	constructor(factories) {
		this.factories = factories
	}

	get(identifier) {
		if (!this.resolved[identifier]) {
			if (!this.factories[identifier]) return null
			const factory = this.factories[identifier]
			if (Array.isArray(factory)) {
				if (factory.length === 0) return null
				if (Array.isArray(factory[0])) {
					if (typeof factory[1] === 'function') {
						this.resolved[identifier] = factory[1](...factory[0].map(this.get.bind(this)))
					}
				} else {
					const dependencies = factory.map(this.get.bind(this))
					try {
						// eslint-disable-next-line new-cap
						this.resolved[identifier] = new identifier(...dependencies)
					} catch (e) {
						if (e.message.includes('identifier is not a constructor')) {
							return null
						}
					}
				}
			} else {
				this.resolved[identifier] = factory
			}
		}
		return this.resolved[identifier]
	}
}
