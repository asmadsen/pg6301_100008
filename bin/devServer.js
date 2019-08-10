import * as path from 'path'
import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotClient from 'webpack-hot-client'
import baseConfig from '../webpack.config.base'
import app from '../src/server/app'
import displayRoutes from 'express-routemap'

baseConfig.mode('development')

baseConfig.devtool('cheap-module-eval-source-map')
	.output.publicPath('/')

const config = baseConfig.toConfig()

const compiler = webpack(config)

const port = process.env.PORT || 8080

const client = hotClient(compiler, {
	port: port + 1,
	logLevel: 'error'
})

const { server } = client

server.on('listening', () => {
	const middleware = devMiddleware(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	})
	app.use(middleware)
	app.get('*', (req, res) => res.end(middleware.fileSystem.readFileSync(path.join(config.output.path, 'index.html'))))
})

app.listen(port, () => {
	console.log(`Started server on port ${port}`)
	displayRoutes(app)
})
