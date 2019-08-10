import React, { useEffect, useState } from 'react'
import { useApiContext } from '../utils/Api'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Toolbar } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import MovieCard from '../components/movie/MovieCard'
import TablePagination from '@material-ui/core/TablePagination'
import SortByButton from '../components/SortByButton'
import usePagination from '../hooks/usePagination'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
	spacing: {
		flexGrow: 1
	},
	chip: {
		marginRight: 5
	},
	chipContainer: {
		overflowX: 'scroll',
		paddingBottom: 20,
		'& > div': {
			display: 'flex',
			flexWrap: 'no-wrap',
		},
	}
})

const LandingPage = props => {
	const classes = useStyles()
	const pagination = usePagination()
	const [allGenres, setAllGenres] = useState([])
	const [selectedGenres, setSelectedGenres] = useState([])
	const [movies, setData] = useState([])
	const apiContext = useApiContext()
	const [sortBy, setSortBy] = useState('rating')
	const [sort, setSort] = useState('desc')

	useEffect(() => {
		apiContext.getAllMovieGenres()
			.then(data => {
				setAllGenres(data)
			})
	}, [apiContext])

	const { rowsPerPage, currentPage } = pagination

	useEffect(() => {
		apiContext.getAllMovies({
			genres: selectedGenres,
			perPage: rowsPerPage,
			page: currentPage,
			sortBy,
			sort
		})
			.then(data => {
				setData(data.result)
				pagination.currentPage = data.meta.page - 1
				pagination.totalItems = data.meta.total
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [apiContext, selectedGenres, rowsPerPage, currentPage, sortBy, sort])

	props.setTitle('Homepage')
	const handleGenreToggle = genre => {
		if (selectedGenres.includes(genre)) {
			setSelectedGenres(selectedGenres.filter(g => g !== genre))
		} else {
			setSelectedGenres([...selectedGenres, genre])
		}
		pagination.currentPage = 0
	}

	const genres = allGenres.map(genre => ({ text: genre, selected: selectedGenres.includes(genre) }))
		.sort((a, b) => a.selected === b.selected ? 0 : a.selected ? -1 : 1)

	const sortOptions = {
		rating: 'desc',
		title: 'asc',
		runtime: 'asc'
	}

	console.log(genres)

	return (
		<Container fixed>
			<Toolbar>
				<div className={classes.chipContainer}>
					<div data-test-id="genresContainer">
						{
							genres.map(genre => <Chip
								label={genre.text}
								key={genre.text}
								color={genre.selected ? 'primary' : undefined}
								onClick={() => handleGenreToggle(genre.text)}
							/>)
						}
					</div>
				</div>
			</Toolbar>
			<Grid container justify="space-between" alignItems="center">
				<SortByButton
					options={sortOptions}
					sortBy={sortBy}
					onSortByChanged={setSortBy}
					sortDirection={sort}
					onSortDirectionChanged={setSort}
				/>
				<TablePagination
					component="div"
					{...pagination.props}
				/>
			</Grid>
			<Grid container spacing={3} data-test-id="moviesContainer">
				{movies.map(movie =>
					<Grid item xs={4} key={movie.id}>
						<MovieCard movie={movie} />
					</Grid>)
				}
			</Grid>
		</Container>
	)
}

LandingPage.propTypes = {
	setTitle: PropTypes.func
}

export default LandingPage
