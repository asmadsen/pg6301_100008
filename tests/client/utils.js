import { differenceInCalendarMonths } from 'date-fns'
import spacetime from 'spacetime'
import * as Api from '../../src/client/utils/Api'
import * as Websocket from '../../src/client/utils/Websocket'

export const mockApiContext = context => {
	jest.spyOn(Api, 'useApiContext')
		.mockImplementation(() => context)
}

export const mockWebsocketContext = context => {
	jest.spyOn(Websocket, 'useWebsocketContext')
		.mockImplementation(() => context)
}

export const testErrorHandling = (wrapper, testId, testObject, mapper = value => ({ target: { value } })) => {
	Object.entries(testObject)
		.forEach(([expectedError, values]) => {
			values.forEach(value => {
				wrapper.findByTestId(testId).simulate('change', mapper(value))
				const elm = wrapper.findByTestId(testId)

				if (!['null', 'false'].includes(expectedError)) {
					expect(elm.props()).toStrictEqual(expect.objectContaining({
						error: true,
						helperText: expectedError
					}))
				} else {
					expect(elm.props()).toStrictEqual(expect.objectContaining({
						error: false,
						helperText: null
					}))
				}
			})
		})
}

export const nextTick = () => new Promise(resolve => process.nextTick(resolve))

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const changeTextField = (wrapper, testId, newValue) => {
	wrapper.findByTestId(testId)
		.find('input').simulate('change', { target: { value: newValue } })
}

export const changeDatePicker = (wrapper, testId, newDate) => {
	let picker = wrapper.findByTestId(testId)
	picker.find('input').simulate('click')
	wrapper.findByTestId(testId).find('button').last().simulate('click')
	picker.find('input').simulate('click')
	picker = wrapper.findByTestId(testId)
	const currentDate = spacetime(picker.find('PureDateInput').props().inputValue.split('.').reverse()).d
	let diffMonths = differenceInCalendarMonths(newDate, currentDate)
	const monthButtons = picker.find('CalendarHeader button')
	while (diffMonths !== 0) {
		if (diffMonths > 0) {
			monthButtons.last().simulate('click')
			diffMonths--
		}
		if (diffMonths < 0) {
			monthButtons.first().simulate('click')
			diffMonths++
		}
	}
	const desiredDay = spacetime(newDate).day().toString()
	picker = wrapper.findByTestId(testId)
	picker.find('Day button')
		.findWhere(elm => elm.text().trim() === desiredDay)
		.first()
		.simulate('click')
	picker.find('button').last().simulate('click')
}
