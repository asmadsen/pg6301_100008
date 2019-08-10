import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { amber, green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@material-ui/icons/Warning'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
}

const useStyles = makeStyles(theme => ({
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.main,
	},
	warning: {
		backgroundColor: amber[700],
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1),
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
}))

const Alert = ({ className, message, onClose, variant, actions = [], ...other }) => {
	const classes = useStyles()
	const Icon = variantIcon[variant]

	return (
		<SnackbarContent
			className={clsx(classes[variant], className)}
			message={
				<span className={classes.message}>
					<Icon className={clsx(classes.icon, classes.iconVariant)} data-test-id="icon" />
					{message}
				</span>
			}
			action={[
				onClose && (
					<IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
						<CloseIcon className={classes.icon} />
					</IconButton>
				),
				...actions
			]}
			{...other}
		/>
	)
}

Alert.propTypes = {
	className: PropTypes.string,
	message: PropTypes.string,
	onClose: PropTypes.func,
	variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
	actions: PropTypes.array
}

export default Alert
