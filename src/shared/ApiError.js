export default class ApiError extends Error {
	constructor(message, options) {
		super(message)
		this.options = options
	}

	toJson() {
		return {
			message: this.message
		}
	}
}
