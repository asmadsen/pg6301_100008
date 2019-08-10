import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import { useApiContext } from '../utils/Api'
import { Redirect } from 'react-router'
import Card from '@material-ui/core/Card'
import { CardContent, CardHeader, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const UserProfile = ({ setTitle }) => {
	const { user, getLoggedInUserReviews } = useApiContext()
	const [reviewsGiven, setReviewsGiven] = useState(null)

	setTitle('User profile')

	useEffect(() => {
		if (reviewsGiven === null) {
			getLoggedInUserReviews().then(reviews => setReviewsGiven(reviews))
		}
	}, [reviewsGiven, getLoggedInUserReviews])

	if (!user) {
		return (
			<Redirect to="/"/>
		)
	}

	return (
		<Container fixed>
			<Card>
				<CardHeader
					title={`${user.firstName} ${user.lastName}`}
				/>
				<CardContent>
					{ user.alias?.trim().length > 0 && (
						<Typography data-test-id="alias">Alias: {user.alias}</Typography>
					)}
					<Typography>Email: {user.email}</Typography>
					<Typography data-test-id="reviews">Movies reviewed: { reviewsGiven !== null ? reviewsGiven.length : 'Loading...' }</Typography>
				</CardContent>
			</Card>
		</Container>
	)
}

UserProfile.propTypes = {
	setTitle: PropTypes.func
}

export default UserProfile
