import React, { useContext } from 'react'
import { webSocket } from 'rxjs/webSocket'

export const WebsocketContext = React.createContext({})

export const useWebsocketContext = () => useContext(WebsocketContext)

export default websocketUrl => {
	return webSocket(websocketUrl)
}
