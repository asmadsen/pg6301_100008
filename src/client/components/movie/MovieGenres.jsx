import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles({
	chip: {
		marginRight: 5
	}
})

const MovieGenres = ({ genres }) => {
	const classes = useStyles()

	return <div>
		{
			genres.map(genre => <Chip
				key={genre}
				label={genre}
				size="small"
				className={classes.chip}
			/>)
		}
	</div>
}

MovieGenres.propTypes = {
	genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default MovieGenres
