import app from '../src/server/app'

const port = process.env.PORT || 8080

app.listen(port, () => {
	console.log(`Started server on port ${port}`)
})
