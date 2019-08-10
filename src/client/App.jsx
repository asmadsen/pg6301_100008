import React, { useEffect, useMemo, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Router } from './utils/Router'
import api, { ApiContext } from './utils/Api'
import websocket, { WebsocketContext } from './utils/Websocket'
import routes from './routes'
import NavBar from './components/NavBar'
import Banner from './components/base/Banner'
import { Typography } from '@material-ui/core'
import { Whatshot } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import LiveChat from './components/LiveChat'

const getWebsocketUrl = () => {
	let protocol = 'ws:'
	if (window.location.protocol.toLowerCase() === 'https:') {
		protocol = 'wss:'
	}
	return protocol + '//' + window.location.host
}

const App = () => {
	const [user, setUser] = useState(null)
	const [title, setTitle] = useState('Movie')
	const [isLoading, setLoading] = useState(false)
	const [displayWelcomeMessage, setDisplayWelcomeMessage] = useState(false)
	const apiContext = useMemo(() => api({ user, setUser }), [user, setUser])
	const websocketContext = useMemo(() => websocket(getWebsocketUrl()), [])

	useEffect(() => {
		let subject
		if (user === null) {
			apiContext.getUserInfo()
		}
		if (user !== null) {
			subject = websocketContext.subscribe()
		}

		return () => {
			subject?.unsubscribe()
		}
	}, [user, apiContext])

	useEffect(() => {
		let timeout
		if (user !== null) {
			setDisplayWelcomeMessage(true)
			timeout = setTimeout(() => {
				setDisplayWelcomeMessage(false)
			}, 5000)
		}
		return () => {
			clearTimeout(timeout)
			setDisplayWelcomeMessage(false)
		}
	}, [user])

	return (
		<React.Fragment>
			<CssBaseline />
			<BrowserRouter>
				<ApiContext.Provider value={apiContext}>
					<WebsocketContext.Provider value={websocketContext}>
						<NavBar title={title} loading={isLoading} />
						{ displayWelcomeMessage && (
							<Banner
								icon={<Whatshot />}
								button={<Button color="primary" onClick={() => setDisplayWelcomeMessage(false)}>Dismiss</Button>}
							>
								<Typography>
								Welcome back, my dude
								</Typography>
							</Banner>
						)}
						<Router routes={routes} setTitle={title => setTitle(title)} setLoading={setLoading}/>
						{ apiContext.isLoggedIn && (
							<LiveChat/>
						)}
					</WebsocketContext.Provider>
				</ApiContext.Provider>
			</BrowserRouter>
		</React.Fragment>
	)
}

export default App
