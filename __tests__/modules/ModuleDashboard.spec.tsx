import React from 'react'
import { shallow } from 'enzyme'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Menu, MenuItem, TablePagination } from '@mui/material'
import { Paper } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import Component from './Component'

describe('Component', () => {
	let wrapper
	const rows = [
		{ _id: 1, title: 'Title 1', courseId: 'Course 1', duration: 60, isPublished: true },
		{ _id: 2, title: 'Title 2', courseId: 'Course 2', duration: 90, isPublished: false },
	]

	beforeEach(() => {
		wrapper = shallow(<Component rows={rows} />)
	})

	it('should render a TableContainer component', () => {
		expect(wrapper.find(TableContainer)).toHaveLength(1)
	})

	it('should render a Table component', () => {
		expect(wrapper.find(Table)).toHaveLength(1)
	})

	it('should render a TableHead component', () => {
		expect(wrapper.find(TableHead)).toHaveLength(1)
	})

	it('should render a TableRow component for each row', () => {
		expect(wrapper.find(TableRow)).toHaveLength(rows.length + 1) // +1 for the "No Data Available" row
	})

	it('should render a TableCell component for each column', () => {
		expect(wrapper.find(TableCell)).toHaveLength((rows.length > 0 ? 5 : 1) * (rows.length + 1)) // +1 for the "No Data Available" row
	})

	it('should render a TableBody component', () => {
		expect(wrapper.find(TableBody)).toHaveLength(1)
	})

	it('should render a IconButton component for each row', () => {
		expect(wrapper.find(IconButton)).toHaveLength(rows.length)
	})

	it('should render a Menu component for each IconButton', () => {
		expect(wrapper.find(Menu)).toHaveLength(rows.length)
	})

	it('should render a MenuItem component for each option in the Menu', () => {
		expect(wrapper.find(MenuItem)).toHaveLength(rows.length * 2) // *2 for Edit and Delete options
	})

	it('should render a TablePagination component', () => {
		expect(wrapper.find(TablePagination)).toHaveLength(1)
	})

	it('should call handleClick when an IconButton is clicked', () => {
		const handleClick = jest.spyOn(Component.prototype, 'handleClick')
		wrapper.instance().forceUpdate()
		wrapper.find(IconButton).first().simulate('click')
		expect(handleClick).toHaveBeenCalled()
	})

	it('should call handleEdit when the Edit option is clicked', () => {
		const handleEdit = jest.spyOn(Component.prototype, 'handleEdit')
		wrapper.instance().forceUpdate()
		wrapper.find(MenuItem).at(0).simulate('click')
		expect(handleEdit).toHaveBeenCalled()
	})

	it('should call handleDelete when the Delete option is clicked', () => {
		const handleDelete = jest.spyOn(Component.prototype, 'handleDelete')
		wrapper.instance().forceUpdate()
		wrapper.find(MenuItem).at(1).simulate('click')
		expect(handleDelete).toHaveBeenCalled()
	})

	it('should call handleChangePage when the page is changed', () => {
		const handleChangePage = jest.spyOn(Component.prototype, 'handleChangePage')
		wrapper.instance().forceUpdate()
		wrapper.find(TablePagination).simulate('changePage', {}, 2)
		expect(handleChangePage).toHaveBeenCalledWith({}, 2)
	})

	it('should call handleChangeRowsPerPage when the rows per page is changed', () => {
		const handleChangeRowsPerPage = jest.spyOn(Component.prototype, 'handleChangeRowsPerPage')
		wrapper.instance().forceUpdate()
		wrapper.find(TablePagination).simulate('changeRowsPerPage', { target: { value: 10 } })
		expect(handleChangeRowsPerPage).toHaveBeenCalledWith({ target: { value: 10 } })
	})
})
