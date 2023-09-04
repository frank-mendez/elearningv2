import React from 'react'
import { shallow } from 'enzyme'
import { TextField, MenuItem, Grid } from '@material-ui/core'
import CourseContainer from './CourseContainer'
import CommonLoading from './CommonLoading'
import CourseSearch from './CourseSearch'

describe('CourseSearch', () => {
	let wrapper
	const courses = [
		{ id: 1, name: 'Course 1', subject: 'Math', author: 'John Doe' },
		{ id: 2, name: 'Course 2', subject: 'Science', author: 'Jane Smith' },
		{ id: 3, name: 'Course 3', subject: 'History', author: 'Bob Johnson' },
	]
	const subjectDropdownValues = [
		{ value: 'math', name: 'Math' },
		{ value: 'science', name: 'Science' },
		{ value: 'history', name: 'History' },
	]
	const userDropdownValues = [
		{ value: 'john', name: 'John Doe' },
		{ value: 'jane', name: 'Jane Smith' },
		{ value: 'bob', name: 'Bob Johnson' },
	]

	beforeEach(() => {
		wrapper = shallow(<CourseSearch courses={courses} />)
	})

	it('renders a search input field', () => {
		expect(wrapper.find(TextField).at(0).prop('id')).toEqual('course')
	})

	it('renders a subject dropdown field', () => {
		expect(wrapper.find(TextField).at(1).prop('name')).toEqual('subject')
		expect(wrapper.find(MenuItem)).toHaveLength(4) // 3 options + default "No Available Options"
	})

	it('renders an author dropdown field', () => {
		expect(wrapper.find(TextField).at(2).prop('name')).toEqual('instructor')
		expect(wrapper.find(MenuItem)).toHaveLength(4) // 3 options + default "No Available Options"
	})

	it('renders a loading spinner when loading is true', () => {
		wrapper.setProps({ loading: true })
		expect(wrapper.find(CommonLoading)).toHaveLength(1)
	})

	it('renders a grid of course containers when loading is false', () => {
		wrapper.setProps({ loading: false })
		expect(wrapper.find(Grid)).toHaveLength(2) // 1 for search fields, 1 for course containers
		expect(wrapper.find(CourseContainer)).toHaveLength(3)
	})

	it('filters courses by search keyword', () => {
		wrapper.setState({ search: 'Course 1' })
		expect(wrapper.find(CourseContainer)).toHaveLength(1)
		expect(wrapper.find(CourseContainer).prop('data')).toEqual(courses[0])
	})

	it('filters courses by subject', () => {
		wrapper.setState({ subject: 'math' })
		expect(wrapper.find(CourseContainer)).toHaveLength(1)
		expect(wrapper.find(CourseContainer).prop('data')).toEqual(courses[0])
	})

	it('filters courses by author', () => {
		wrapper.setState({ author: 'jane' })
		expect(wrapper.find(CourseContainer)).toHaveLength(1)
		expect(wrapper.find(CourseContainer).prop('data')).toEqual(courses[1])
	})
})
