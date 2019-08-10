import React from 'react'
import Movie from '../../../src/client/views/Movie'
import { mount, shallow } from 'enzyme'
import { mockApiContext, mockWebsocketContext, nextTick } from '../utils'
import { MemoryRouter } from 'react-router'

describe('client/views/Movie', () => {
	it('should show loading when movie is null', () => {
		const wrapper = shallow(<Movie match={{ params: { id: '1' } }} />)

		expect(wrapper.children().text()).toContain('Loading')
	})

	it('should render details', async () => {
		const movie = { director: 'Danny Boyle',
			genres: ['Biography', 'Drama'],
			id: 1,
			image:
				'https://m.media-amazon.com/images/M/MV5BMjE0NTA2MTEwOV5BMl5BanBnXkFtZTgwNzg4NzU2NjE@._V1_SX300.jpg',
			plot:
				'Steve Jobs takes us behind the scenes of the digital revolution, to paint a portrait of the man at its epicenter. The story unfolds backstage at three iconic product launches, ending in 1998 with the unveiling of the iMac.',
			released: '2015-10-22T22:00:00.000Z',
			runtime: 122,
			rating: 3,
			reviews: [],
			title: 'Steve Jobs' }

		const setTitleMock = jest.fn()
		mockApiContext({
			getMovie: () => Promise.resolve(movie)
		})
		const websocketMock = {
			subscribe: jest.fn()
		}
		mockWebsocketContext(websocketMock)
		const wrapper = mount(
			<MemoryRouter>
			<Movie match={{ params: { id: '1' } }} setTitle={setTitleMock} />
		</MemoryRouter>
		)

		await nextTick()
		expect(setTitleMock).toHaveBeenCalledWith('Steve Jobs - Movie')


	})
})
