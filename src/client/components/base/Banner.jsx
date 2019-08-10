/**
 * Copied from https://material-ui.com/system/basics/#real-world-use-case
 */
import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'

const Banner = ({ icon, children, button }) => {
	return (
		<Box clone pt={2} pr={1} pb={1} pl={2}>
			<Paper elevation={0}>
				<Grid container spacing={2} alignItems="center" wrap="nowrap">
					{ icon && (
						<Grid item data-test-id="icon">
							<Box bgcolor="primary.main" clone>
								<Avatar>
									{ icon }
								</Avatar>
							</Box>
						</Grid>

					)}
					<Grid item data-test-id="children">
						{ children }
					</Grid>
				</Grid>
				{ button && (
					<Grid data-test-id="button" container justify="flex-end" spacing={1}>
						<Grid item>
							{ button }
						</Grid>
					</Grid>
				)}
			</Paper>
		</Box>
	)
}

Banner.propTypes = {
	icon: PropTypes.element,
	button: PropTypes.element,
	children: PropTypes.element
}

export default Banner
