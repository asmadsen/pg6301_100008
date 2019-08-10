import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useApiContext } from '../utils/Api'
import { CardActions, CardHeader, Container, Grid } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { AdapterLink } from '../utils/Router'
import { TextField } from '../components/base/TextField'
import { useFormInput } from '../hooks/useFormInput'
import { emailRegex } from '../../shared/regexs'
import Typography from '@material-ui/core/Typography'
import { Redirect } from 'react-router'

export const LoginPage = props => {
	const email = useFormInput(
		'',
		value => emailRegex.test(value) || 'Invalid email'
	)
	const password = useFormInput(
		'',
		value => value.length >= 6 || 'Password must be at least 6 characters'
	)
	const [error, setError] = useState(null)
	const apiContext = useApiContext()

	const onLogin = async e => {
		// eslint-disable-next-line no-unused-expressions
		e?.preventDefault()
		const valid = ![email, password]
			.map(hook => hook.validate()).some(valid => !valid)
		if (valid) {
			if (!(await apiContext.login(email.value, password.value))) {
				setError('We couldn\'t log you in, make sure you have an account and you used the correct credentials, or try again later')
				return
			}
			props.history.push('/')
		}
	}

	if (apiContext.isLoggedIn) {
		return <Redirect to="/" />
	}

	return (<Container maxWidth="sm">
		<Card>
			<form onSubmit={onLogin}>
				<CardHeader title="Login"/>
				<CardContent>
					<Grid container direction="column" spacing={2}>
						{
							error && (
								<Typography component="span" variant="subtitle1" data-test-id="error">
									{error}
								</Typography>
							)
						}
						<TextField
							type="email"
							label="Email"
							data-test-id="email"
							{...email.input}
						/>
						<TextField
							type="password"
							label="Password"
							data-test-id="password"
							{...password.input}
						/>
					</Grid>
				</CardContent>
				<CardActions disableSpacing>
					<Grid container direction="column">
						<Button
							color="primary"
							variant="contained"
							onClick={onLogin}
							size="medium"
							fullWidth
							type="submit"
							data-test-id="loginBtn"
						>
						Login
						</Button>
						<Box mt={1}>
							<Button
								color="secondary"
								size="medium"
								fullWidth
								component={AdapterLink}
								to="/signup"
							>
							Sign up
							</Button>
						</Box>
					</Grid>
				</CardActions>
			</form>
		</Card>
	</Container>)
}

LoginPage.propTypes = {
	history: PropTypes.object
}

export default LoginPage
