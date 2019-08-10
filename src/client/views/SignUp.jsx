import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardHeader, Container, Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { AdapterLink } from '../utils/Router'
import { TextField } from '../components/base/TextField'
import DateFnsUtils from '@date-io/date-fns'
import enLocale from 'date-fns/locale/en-GB'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { useFormInput } from '../hooks/useFormInput'
import { emailRegex } from '../../shared/regexs'
import spacetime from 'spacetime'
import { useApiContext } from '../utils/Api'
import { Redirect } from 'react-router'
import ApiError from '../../shared/ApiError'
import Alert from '../components/base/Alert'

const SignUp = props => {
	const email = useFormInput(
		'',
		value => emailRegex.test(value) || 'Invalid email'
	)
	const password = useFormInput(
		'',
		value => value.length >= 6 || 'Password must be at least 6 characters'
	)
	const confirmPassword = useFormInput(
		'',
		[
			value => value.length >= 6 || 'Password must be at least 6 characters',
			value => value === password.value || 'The passwords must be equal',
		]
	)
	const firstName = useFormInput(
		'',
		value => value.trim().length >= 2 || 'Firstname must be at least 2 characters'
	)
	const lastName = useFormInput(
		'',
		value => value.trim().length >= 2 || 'Lastname must be at least 2 characters'
	)
	const dateOfBirth = useFormInput(
		null,
		[
			value => (spacetime(value).isValid() && spacetime.now().isAfter(value)) ||
				'Date of birth must be in the past',
		],
		value => value
	)
	const alias = useFormInput(
		'',
		value => value.length >= 2 || 'Alias must be at least 2 characters'
	)

	const { signUp, isLoggedIn } = useApiContext()

	const [error, setError] = useState(null)

	const handleSingUp = async () => {
		const valid = ![email, password, confirmPassword, firstName, lastName, dateOfBirth, alias]
			.map(hook => hook.validate()).some(valid => !valid)
		if (valid) {
			try {
				const result = await signUp(Object.fromEntries(
					Object.entries({ email, password, firstName, lastName, dateOfBirth, alias })
						.map(([key, value]) => [key, value.value])
				))
				if (result) {
					props.history.push('/')
				}
			} catch (e) {
				if (e instanceof ApiError) {
					setError(e.message)
				}
			}
		}
	}

	if (isLoggedIn) {
		return <Redirect to="/" />
	}

	return (<Container maxWidth="sm">
		<Card>
			<CardHeader title="Create an account" />
			<CardContent>
				<Grid container wrap="wrap" spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							type="email"
							label="Email"
							required
							data-test-id="email"
							{...email.input}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Alias"
							required
							data-test-id="alias"
							{...alias.input}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							type="password"
							label="Password"
							required
							data-test-id="password"
							{...password.input}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							type="password"
							label="Confirm password"
							required
							data-test-id="confirmPassword"
							{...confirmPassword.input}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="First name"
							required
							data-test-id="firstName"
							{...firstName.input}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Last name"
							required
							data-test-id="lastName"
							{...lastName.input}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
							<DatePicker
								inputVariant="filled"
								margin="dense"
								label="Date of birth"
								format="dd.MM.yyyy"
								maxDate={spacetime.now().subtract(1, 'day').format('YYYY-MM-dd')}
								fullWidth
								required
								data-test-id="dateOfBirth"
								{...dateOfBirth.input}
							/>
						</MuiPickersUtilsProvider>
					</Grid>
				</Grid>
				{ error && (
					<Alert data-test-id="error" variant="error" message={error} />
				)}
			</CardContent>
			<CardActions>
				<Grid container direction="column">
					<Button
						color="primary"
						variant="contained"
						size="medium"
						onClick={handleSingUp}
						fullWidth
						data-test-id="signUpBtn"
					>
						Create account
					</Button>
					<Box mt={1}>
						<Button
							color="secondary"
							size="medium"
							fullWidth
							component={AdapterLink}
							to="/login"
						>
							Already have an account? Login here
						</Button>
					</Box>
				</Grid>
			</CardActions>
		</Card>
	</Container>)
}

export default SignUp
