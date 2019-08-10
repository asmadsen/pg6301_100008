import React from 'react'
import ReviewCard from '../../../../src/client/components/review/ReviewCard'
import { shallow } from 'enzyme'

describe('client/components/review', () => {
	it('should match snapshot', () => {
		const wrapper = shallow(<ReviewCard
			review={{
				user: {
					alias: 'Alias'
				},
				rating: 4,
				// eslint-disable-next-line max-len
				review: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
			}}
		/>)

		expect(wrapper).toMatchSnapshot()
	})

	it('should show edit button if isLoggedInUser is true', () => {
		const wrapper = shallow(<ReviewCard
			isLoggedInUser={true}
			review={{
				user: {
					alias: 'Alias'
				},
				rating: 4,
				// eslint-disable-next-line max-len
				review: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
			}}
		/>)

		expect(wrapper.findByTestId('editBtn').exists()).toEqual(true)

		wrapper.setProps({ isLoggedInUser: false })
		expect(wrapper.findByTestId('editBtn').exists()).toEqual(false)
	})
})
