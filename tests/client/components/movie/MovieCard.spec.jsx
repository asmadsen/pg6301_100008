import MovieCard from '../../../../src/client/components/movie/MovieCard'
import React from 'react'
import { shallow } from 'enzyme'

describe('client/component/movie/MovieCard', () => {
	it('should match snapshot', () => {
		const movie = {
			id: 1,
			title: 'Die Hard',
			genres: ['Action', 'Drama'],
			plot: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			rating: 3.6
		}
		const wrapper = shallow(<MovieCard movie={movie} />)

		expect(wrapper).toMatchSnapshot()
	})
})
