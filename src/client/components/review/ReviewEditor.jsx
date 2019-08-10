import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import { CardActions, CardHeader, makeStyles, TextField, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import Button from '@material-ui/core/Button'
import { useFormInput } from '../../hooks/useFormInput'
import Grid from '@material-ui/core/Grid'
import { useApiContext } from '../../utils/Api'
import ApiError from '../../../shared/ApiError'
import ApiErrorAlert from '../ApiErrorAlert'

const useStyles = makeStyles({
	reviewCard: {
		marginTop: 15
	},
	textArea: {
		width: '100%'
	},
	spacer: {
		flexGrow: 1
	}
})

const ReviewEditor = ({ movie, review = null }) => {
	const classes = useStyles()
	const apiContext = useApiContext()
	const [rating, setRating] = useState(review?.rating || 0)
	const [ratingError, setRatingError] = useState(null)
	const reviewContent = useFormInput(
		review?.review || '',
		review => review.length >= 50 || 'The review must be at least 50 characters long'
	)
	const [apiError, setApiError] = useState(null)

	const validateRating = () => {
		if (rating === 0) {
			setRatingError('You have to rate the movie to save your review')
			return false
		}
		setRatingError(null)
		return true
	}

	const onSave = async () => {
		const valid = ![validateRating(), reviewContent.validate()].some(valid => !valid)
		if (valid) {
			try {
				await apiContext.saveReview({
					movieId: movie.id,
					review: reviewContent.value,
					rating
				})
			} catch (e) {
				if (e instanceof ApiError) {
					setApiError(e)
				}
			}
		}
	}

	return (
		<Card className={classes.reviewCard}>
			<CardHeader
				title={`Review ${movie.title}`}
			/>
			<CardContent>
				<TextField
					placeholder="Write your review here"
					fullWidth
					multiline
					{...reviewContent.input}
				/>
				<Box mt={1}>
					<Grid container direction="column">
						<Rating
							value={rating}
							onChange={(_, value) => setRating(value)}
						/>
						{ ratingError && (
							<Typography variant="subtitle2" component="span" color="error">
								{ ratingError }
							</Typography>
						)}
					</Grid>
				</Box>
				{ apiError && (
					<ApiErrorAlert data-test-id="error" error={apiError} />
				)}
			</CardContent>
			<CardActions>
				<div className={classes.spacer} />
				<Button color="primary" onClick={onSave}>
					Save
				</Button>
			</CardActions>
		</Card>
	)
}

ReviewEditor.propTypes = {
	movie: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string
	}).isRequired,
	review: PropTypes.object
}

export default ReviewEditor
