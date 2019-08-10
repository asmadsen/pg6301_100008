import React from 'react'
import PropTypes from 'prop-types'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles, Typography } from '@material-ui/core'
import MovieGenres from './MovieGenres'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { AdapterLink } from '../../utils/Router'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles({
	spacing: {
		flexGrow: 1
	},
	cardHeader: {
		display: 'flex',
		justifyContent: 'space-between'
	}
})

const MovieCard = ({ movie }) => {
	const classes = useStyles()

	return (
		<Card>
			<CardContent>
				<div className={classes.cardHeader}>
					<Typography component="h5" variant="h5">{movie.title}</Typography>
					<Typography component="span" variant="subtitle1">{movie.rating.toFixed(1)}</Typography>
				</div>
				<MovieGenres genres={movie.genres.slice(0, 3)} />
				<Typography variant="body2" component="p">
					{movie.plot}
				</Typography>
			</CardContent>
			<CardActions>
				<div className={classes.spacing}/>
				<Button
					size="small"
					component={AdapterLink}
					to={`/movies/${movie.id}`}
				>
					Read More
				</Button>
			</CardActions>
		</Card>
	)
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		genres: PropTypes.arrayOf(PropTypes.string),
		plot: PropTypes.string,
		rating: PropTypes.number
	})
}

export default MovieCard
