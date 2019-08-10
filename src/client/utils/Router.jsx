import React, { useEffect, useMemo, useState } from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'
import { Link } from 'react-router-dom'

export const Router = ({ routes, setTitle, setLoading }) => {
	const LoadingComponent = () => {
		const [isLoading, setIsLoading] = useState(false)

		useEffect(() => {
			const timeout = setTimeout(() => {
				setIsLoading(true)
			}, 100)

			return () => clearTimeout(timeout)
		}, [])

		useEffect(() => {
			if (isLoading) {
				setLoading(true)
			}
			return () => {
				if (isLoading) {
					setLoading(false)
				}
			}
		})

		if (!isLoading) return <div />

		return <h1>Loading</h1>
	}

	routes = useMemo(
		() => routes
			.map(route => {
				const LoadableComponent = Loadable({
					loader: route.component,
					loading: LoadingComponent
				})
				delete route.component
				return {
					...route,
					// eslint-disable-next-line react/display-name
					render: props => <LoadableComponent {...props} setTitle={setTitle} key={route.path}/>
				}
			})
			.map(route => <Route {...route} key={route.path}/>),
		[routes]
	)
	return (
		<Switch>
			{ routes }
		</Switch>
	)
}

Router.propTypes = {
	routes: PropTypes.array.isRequired,
	setTitle: PropTypes.func,
	setLoading: PropTypes.func
}

// eslint-disable-next-line react/display-name
export const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />)
