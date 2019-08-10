import { useState } from 'react'

export const useFormInput = (initialValue, rules = [], mapper = e => e.target.value) => {
	const [value, setValue] = useState(initialValue)
	const [hasChanged, setHasChanged] = useState(false)

	rules = Array.isArray(rules) ? rules : [ rules ]

	const validate = value => rules.map(fn => fn(value))
		.filter(error => error !== true)

	const errors = hasChanged
		? validate(value)
		: []

	const errorOptions = rules.length > 0 ? {
		error: errors.length > 0,
		helperText: errors.length > 0 ? errors.join(', ') : null
	} : {}

	return {
		get value() {
			return value
		},
		set value(value) {
			setValue(value)
		},
		validate() {
			if (validate(value).length > 0) {
				setHasChanged(true)
				return false
			}
			return true
		},
		input: {
			get value() {
				return value
			},
			set value(value) {
				setValue(value)
			},
			onChange: e => {
				setHasChanged(true)
				setValue(mapper(e))
			},
			...errorOptions,
		}
	}
}
