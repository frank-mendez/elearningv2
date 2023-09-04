import React from 'react'
import { shallow } from 'enzyme'
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { Paper, IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import MyTable from './MyTable'

describe('MyTable', () => {
	let wrapper
	const rows = [
		{ id: 1, title: 'Title 1', subject: 'Subject 1', author: 'Author 1', modules: 5, duration: 30, isPublished: true },
		{ id: 2, title: 'Title 2', subject: 'Subject 2', author: 'Author 2', modules: 3, duration: 20, isPublished: false },
		{ id: 3, title: 'Title 3', subject: 'Subject 3', author: 'Author 3', modules: 7, duration: 45, isPublished: true },
	]

	beforeEach(() => {
		wrapper = shallow(<MyTable rows={rows} />)
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
		expect(wrapper.find(TableRow)).toHaveLength(rows.length + 1) // +1 for the header row
	})

	it('should render a TableCell component for each column in each row', () => {
		expect(wrapper.find(TableCell)).toHaveLength((rows.length + 1) * 7) // +1 for the header row, *7 for 7 columns
	})

	it('should render a TablePagination component', () => {
		expect(wrapper.find(TablePagination)).toHaveLength(1)
	})

	it('should open the menu when the MoreVertIcon is clicked', () => {
		const iconButton = wrapper.find(IconButton).first()
		iconButton.simulate('click')
		expect(wrapper.find(Menu).prop('open')).toBe(true)
	})

	it('should close the menu when a MenuItem is clicked', () => {
		const iconButton = wrapper.find(IconButton).first()
		iconButton.simulate('click')
		const menuItem = wrapper.find(MenuItem).first()
		menuItem.simulate('click')
		expect(wrapper.find(Menu).prop('open')).toBe(false)
	})

	it('should call the handleEdit function when the Edit MenuItem is clicked', () => {
		const handleEdit = jest.fn()
		wrapper.setProps({ handleEdit })
		const iconButton = wrapper.find(IconButton).first()
		iconButton.simulate('click')
		const editMenuItem = wrapper.find(MenuItem).first()
		editMenuItem.simulate('click')
		expect(handleEdit).toHaveBeenCalled()
	})

	it('should call the handleDelete function when the Delete MenuItem is clicked', () => {
		const handleDelete = jest.fn()
		wrapper.setProps({ handleDelete })
		const iconButton = wrapper.find(IconButton).first()
		iconButton.simulate('click')
		const deleteMenuItem = wrapper.find(MenuItem).at(1)
		deleteMenuItem.simulate('click')
		expect(handleDelete).toHaveBeenCalled()
	})
})
