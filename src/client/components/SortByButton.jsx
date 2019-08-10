import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, makeStyles, Menu, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import clsx from 'clsx'

const useStyles = makeStyles({
	sortIcon: {
		verticalAlign: 'middle',
		marginLeft: 5
	},
	iconAlignRight: {
		marginRight: 0,
		marginLeft: 'auto',
		paddingLeft: 10
	}
})

const SortByButton = ({ options, sortBy, sortDirection, onSortByChanged, onSortDirectionChanged }) => {
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = useState(null)
	const handleMenuItemClick = option => {
		setAnchorEl(null)
		if (sortBy !== option) {
			onSortByChanged(option)
			onSortDirectionChanged(options[option])
		} else {
			onSortDirectionChanged(sortDirection === 'asc' ? 'desc' : 'asc')
		}
	}

	const calculateIcon = (name, defaultSort) => {
		const direction = name === sortBy
			? sortDirection === 'asc'
				? 'desc'
				: 'asc'
			: defaultSort
		return direction === 'asc' ? 'fa-caret-up' : 'fa-caret-down'
	}

	return <div>
		<Typography component="span" variant="subtitle1">Sort by: </Typography>
		<Button
			data-test-id="activator"
			variant="text"
			onClick={e => setAnchorEl(e.target)}
		>
			{sortBy}
			<Icon className={clsx(
				'fas',
				sortDirection === 'asc' ? 'fa-caret-up' : 'fa-caret-down',
				classes.sortIcon
			)}/>
		</Button>
		<Menu
			data-test-id="menu"
			anchorEl={anchorEl}
			keepMounted
			open={Boolean(anchorEl)}
			onClose={() => setAnchorEl(null)}
		>
			{Object.entries(options).map(([option, defaultSort], index) => (
				<MenuItem
					key={option}
					onClick={() => handleMenuItemClick(option)}
				>
					{option}
					<Icon className={clsx(
						'fas',
						calculateIcon(option, defaultSort),
						classes.sortIcon,
						classes.iconAlignRight
					)}/>
				</MenuItem>
			))}
		</Menu>
	</div>
}

SortByButton.propTypes = {
	options: PropTypes.shape({
		[PropTypes.string]: PropTypes.oneOf(['asc', 'desc'])
	}).isRequired,
	sortBy: PropTypes.string.isRequired,
	onSortByChanged: PropTypes.func.isRequired,
	sortDirection: PropTypes.oneOf(['asc', 'desc']).isRequired,
	onSortDirectionChanged: PropTypes.func.isRequired
}

export default SortByButton
