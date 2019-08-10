import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AppBar, LinearProgress, makeStyles, Toolbar, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { AdapterLink } from '../utils/Router'
import { AccountCircle } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import { useApiContext } from '../utils/Api'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { withRouter } from 'react-router'

const useStyles = makeStyles(theme => ({
	title: {
		flexGrow: 1
	},
	toolbar: {
		flexDirection: 'column',
		alignItems: 'stretch'
	},
	toolbarContent: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		flexGrow: 1,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3)
		}
	}
}))

const NavBar = ({ loading, title, history }) => {
	const classes = useStyles()
	const apiContext = useApiContext()
	const isLoggedIn = apiContext.isLoggedIn
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClose = () => setAnchorEl(null)
	const handleGoToProfile = () => {
		handleClose()
		history.push('/profile')
	}
	const handleLogout = async () => {
		await apiContext.logout()
		handleClose()
		// eslint-disable-next-line no-self-assign
		document.location = document.location
	}

	return (
		<AppBar position="sticky">
			<Toolbar disableGutters className={classes.toolbar}>
				<div className={classes.toolbarContent}>
					<Typography variant="h6" className={classes.title} data-test-id="title">
						{title}
					</Typography>
					<Button
						color="inherit"
						component={AdapterLink}
						to="/"
					>
						Home
					</Button>
					{isLoggedIn
						? (
							<div>
								<IconButton
									onClick={e => setAnchorEl(e.target)}
									color="inherit"
									data-test-id="menuButton"
								>
									<AccountCircle />
								</IconButton>
								<Menu
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorEl)}
									onClose={() => setAnchorEl(null)}
								>
									<MenuItem onClick={handleGoToProfile}>Profile</MenuItem>
									<MenuItem onClick={handleLogout}>Logout</MenuItem>
								</Menu>
							</div>
						)
						: (
							<div>
								<Button component={AdapterLink} to="/login" variant="text" color="inherit" data-test-id="loginButton">
									Login
								</Button>
							</div>
						)
					}
				</div>
				<LinearProgress variant={loading ? 'indeterminate' : null} />
			</Toolbar>
		</AppBar>
	)
}

NavBar.propTypes = {
	title: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	history: PropTypes.object
}

export default withRouter(NavBar)
