/* eslint-disable indent */
const path = require('path')
const Config = require('webpack-chain')
const isProd = process.env.NODE_ENV === 'production'
const config = new Config()
const publicDir = path.resolve(__dirname, 'public')

config
	.entry('app')
	.add('./src/client/index.jsx')
	.end()
	.output
	.filename('[name].[hash:8].js')
	.path(publicDir)
	.publicPath('/')

config.module
	.rule('js')
	.test(/\.jsx?$/)
	.use('babel')
	.loader('babel-loader')

const genAssetSubPath = dir => {
	return `${dir}/[name].[hash:8].[ext]`
}

const genUrlLoaderOptions = dir => {
	return {
		limit: 4096,
		// use explicit fallback to avoid regression in url-loader>=1.1.0
		fallback: {
			loader: 'file-loader',
			options: {
				name: genAssetSubPath(dir)
			}
		}
	}
}

config.module
	.rule('images')
	.test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
	.use('url-loader')
	.loader('url-loader')
	.options(genUrlLoaderOptions('img'))

config.module
	.rule('svg')
	.test(/\.(svg)(\?.*)?$/)
	.use('file-loader')
	.loader('file-loader')
	.options({
		name: genAssetSubPath('img')
	})

config.module
	.rule('media')
	.test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
	.use('url-loader')
	.loader('url-loader')
	.options(genUrlLoaderOptions('media'))

config.module
	.rule('fonts')
	.test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
	.use('url-loader')
	.loader('url-loader')
	.options(genUrlLoaderOptions('fonts'))

function createCSSRule(lang, test, loader, options) {
	const sourceMap = !isProd
	const rule = config.module.rule(lang).test(test)

	if (isProd) {
		rule
			.use('extract-css-loader')
			.loader(require('mini-css-extract-plugin').loader)
			.options({
				hmr: !isProd,
				reloadAll: true
			})
	} else {
		rule
			.use('style-loader')
			.loader('style-loader')
	}

	rule
		.use('css-loader')
		.loader('css-loader')
		.options({ sourceMap })

	if (loader) {
		rule
			.use(loader)
			.loader(loader)
			.options(Object.assign({ sourceMap }, options))
	}
}

createCSSRule('css', /\.css$/)
createCSSRule('scss', /\.scss$/, 'sass-loader', {
	implementation: require('sass')
})
createCSSRule('sass', /\.sass$/, 'sass-loader', {
	indentedSyntax: true,
	implementation: require('sass')
})

config
	.plugin('extract-css')
	.use(require('mini-css-extract-plugin'), [
		{
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css'
		}
	])
if (isProd) {
	// minify extracted CSS
	config
		.plugin('optimize-css')
		.use(require('@intervolga/optimize-cssnano-plugin'), [{
			sourceMap: isProd,
			cssnanoOptions: {
				preset: ['default', {
					mergeLonghand: false,
					cssDeclarationSorter: false
				}]
			}
		}])
}

config.resolve
	.extensions
	.merge(['.js', '.jsx'])
	.end()

config
	.optimization.splitChunks({
	cacheGroups: {
		vendors: {
			name: 'chunk-vendors',
			test: /[\\/]node_modules[\\/]/,
			priority: -10,
			chunks: 'initial'
		},
		common: {
			name: 'chunk-common',
			minChunks: 2,
			priority: -20,
			chunks: 'initial',
			reuseExistingChunk: true
		}
	}
})

config
	.plugin('case-sensitive-paths')
	.use(require('case-sensitive-paths-webpack-plugin'))

config.plugin('html')
	.use(require('html-webpack-plugin'), [{
		filename: 'index.html',
		template: 'src/client/public/index.html'
	}])

module.exports = config
