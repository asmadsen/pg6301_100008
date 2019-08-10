import React from 'react'
import PropTypes from 'prop-types'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import { CardActions, Grid, Icon, makeStyles, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import ReadMore from '@crossfield/react-read-more'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles({
	reviewCard: {
		marginTop: 15
	}
})

const ReviewCard = ({ review, isLoggedInUser, onEdit }) => {
	const classes = useStyles()
	return (
		<Card className={classes.reviewCard}>
			{ isLoggedInUser && (
				<CardActions>
					<Box flexGrow={1} />
					<Button data-test-id="editBtn" onClick={onEdit} variant="contained">Edit</Button>
				</CardActions>
			)}
			<CardContent>
				<Box my={1}>
					<Grid container justify="space-between">
						<Typography variant="h6" component="span">
							{ review.user.alias }
						</Typography>
						<Rating
							value={review.rating}
							readOnly
						/>
					</Grid>
				</Box>
				<ReadMore
					initialHeight={350}
					readMore={props => (
						/* eslint-disable react/prop-types */
						<Button variant="text" onClick={props.onClick}>
							{props.open ? 'Read Less' : 'Read More'}
							<Icon
								style={{
									transform: `rotate( ${props.open ? '-90deg' : '90deg'})`,
									transition: 'transform 0.25s',
								}}
								className="fas fa-caret-right"
							/>
						</Button>)
						/* eslint-enable react/prop-types */
					}
				>
					<Typography component="p">{review.review}</Typography>
				</ReadMore>
			</CardContent>
		</Card>
	)
}

ReviewCard.propTypes = {
	review: PropTypes.object,
	isLoggedInUser: PropTypes.bool,
	onEdit: PropTypes.func
}

export default ReviewCard
