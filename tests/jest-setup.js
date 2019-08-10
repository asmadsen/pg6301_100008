import 'jsdom-global/register'
import { ReactWrapper, ShallowWrapper } from 'enzyme'
const { configure } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Object.fromEntries = entries => entries.reduce((acc, [key, value]) => {
	acc[key] = value
	return acc
}, {})

process.env = Object.assign(process.env, { ENVIRONMENT: 'development' })
global.console.error = () => {}
/*
const copyProps = (src, target) => {
	const props = Object.getOwnPropertyNames(src)
		.filter(prop => typeof target[prop] === 'undefined')
		.map(prop => Object.getOwnPropertyDescriptor(src, prop))
	Object.defineProperties(target, props)
}

;(() => {
	const { JSDOM } = jsdom
	const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/' })
	const { window } = dom

	global.window = window
	global.document = window.document
	global.navigator = { userAgent: 'node.js' }
	copyProps(window, global)
})()
*/

configure({ adapter: new Adapter() })

const configureWrapperUtils = () => {
	[ShallowWrapper, ReactWrapper].forEach(wrapper => {
		wrapper.prototype.findByTestId = function (testId) {
			return this.find(`[data-test-id="${testId}"]`).first()
		}
	})
}
configureWrapperUtils()
