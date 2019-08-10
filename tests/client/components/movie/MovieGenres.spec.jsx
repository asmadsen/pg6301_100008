import React from 'react'
import { shallow } from 'enzyme'
import MovieGenres from '../../../../src/client/components/movie/MovieGenres'

describe('client/component/movie/MovieCard', () => {
	it('should match snapshot', () => {
		const genres = ['Action', 'Drama']
		const wrapper = shallow(<MovieGenres genres={genres} />)

		expect(wrapper).toMatchSnapshot()
	})
})
