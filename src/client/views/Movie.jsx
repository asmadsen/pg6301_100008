import React, { useEffect, useState } from 'react'
import { Container, Grid, Icon, makeStyles, Paper, Typography } from '@material-ui/core'
import { useApiContext } from '../utils/Api'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import MovieGenres from '../components/movie/MovieGenres'
import { format } from 'date-fns'
import clsx from 'clsx'
import Button from '@material-ui/core/Button'
import ReviewCard from '../components/review/ReviewCard'
import ReviewEditor from '../components/review/ReviewEditor'
import { AdapterLink } from '../utils/Router'
import { useWebsocketContext } from '../utils/Websocket'
import { updateMovieTopic } from '../../shared/WebsocketTopics'

const MovieWrapper = ({ children }) => <Container fixed>
	{ children }
</Container>

MovieWrapper.propTypes = {
	children: PropTypes.any
}

const useStyles = makeStyles(theme => ({
	card: {
		display: 'flex',
		flexDirection: 'row'
	},
	bulletIcon: {
		fontSize: 5,
		verticalAlign: 'middle',
		marginLeft: 5,
		marginRight: 5
	},
	metaLine: {
		color: '#636363'
	},
	reviewsSection: {
		marginTop: 20,
		paddingTop: 20,
		paddingBottom: 20
	}
}))

const Movie = props => {
	const movieId = parseInt(props.match.params.id)
	const [movie, setMovie] = useState(null)
	const [showReviewEditor, setShowReviewEditor] = useState(false)
	const { isLoggedIn, getMovie, user } = useApiContext()
	const websocket = useWebsocketContext()
	const classes = useStyles()

	useEffect(() => {
		const promise = getMovie(movieId)
		promise
			.then(data => {
				setMovie(data)
			})
			.catch(_ => {})
	}, [movieId, getMovie])

	useEffect(() => {
		if (movie !== null && isLoggedIn) {
			if (!movie.reviews.some(review => review.userId === user.id)) {
				setShowReviewEditor(true)
			} else {
				setShowReviewEditor(false)
			}
		}
	}, [movie, isLoggedIn, user])

	useEffect(() => {
		const subject = websocket.subscribe(
			({ topic, data }) => {
				if (topic === updateMovieTopic && data.movieId === movieId) {
					getMovie(movieId)
						.then(data => {
							setMovie(data)
						})
				}
			}
		)

		return () => subject.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [movieId])

	const handleEditReview = () => {
		setShowReviewEditor(true)
		window.scrollTo(0, 0)
	}

	if (movie === null) {
		return (
			<MovieWrapper>
				<div>Loading</div>
			</MovieWrapper>
		)
	}

	props.setTitle(`${movie.title} - Movie`)

	const released = format(new Date(movie.released), 'dd. MMMM yyyy')

	return (
		<MovieWrapper>
			<Card component={Grid} container>
				<Grid item xs={12} md={3}>
					<CardMedia
						component="img"
						image={movie.image}
					/>
				</Grid>
				<Grid item xs={12} md={9}>
					<CardContent>
						<Typography component="h1" variant="h2">{movie?.title}</Typography>
						<MovieGenres genres={movie.genres} />
						<Typography component="span" variant="subtitle1" className={classes.metaLine}>
							{released}
							<Icon className={clsx(['fas fa-circle', classes.bulletIcon])} />
							{movie.director}
							<Icon className={clsx(['fas fa-circle', classes.bulletIcon])} />
							{movie.runtime} min
							<Icon className={clsx(['fas fa-circle', classes.bulletIcon])} />
							{movie.rating.toFixed(2) || '4.5'}/5
							<Icon className={clsx(['fas fa-circle', classes.bulletIcon])} />
							{movie.reviews?.length || 0} reviews
						</Typography>
						<Typography component="p" variant="body1">{movie.plot}</Typography>
					</CardContent>
				</Grid>
			</Card>
			<Paper className={classes.reviewsSection}>
				<Typography variant="h4" component="h4" align="center">
					Reviews
				</Typography>
				{ !isLoggedIn && (
					<Grid container direction="column" justify="center" alignItems="center">
						<Typography>You have to login to leave a reveiw</Typography>
						<Button component={AdapterLink} to="/login">Login</Button>
					</Grid>
				)}
			</Paper>
			{ showReviewEditor && (
				<ReviewEditor movie={movie} review={movie.reviews.find(review => review.userId === user.id)} />
			)}
			{ movie.reviews.map(review => <ReviewCard
				key={review.userId}
				review={review}
				isLoggedInUser={review.userId === user?.id}
				onEdit={handleEditReview}
			/>)}
		</MovieWrapper>
	)
}

Movie.propTypes = {
	setTitle: PropTypes.func,
	match: PropTypes.object
}

export default Movie
