import React from 'react'
import PropTypes from 'prop-types'
import Alert from './base/Alert'
import ApiError from '../../shared/ApiError'
import Button from '@material-ui/core/Button'
import { AdapterLink } from '../utils/Router'

const ApiErrorAlert = ({ error }) => {
	const actions = []
	if (error.options) {
		actions.push(
			<Button component={AdapterLink} color="inherit" to={error.options.url}>
				{error.options.text}
			</Button>
		)
	}
	return (
		<Alert variant="error" message={error.message} actions={actions} />
	)
}

ApiErrorAlert.propTypes = {
	error: PropTypes.instanceOf(ApiError)
}

export default ApiErrorAlert
