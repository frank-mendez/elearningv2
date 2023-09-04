import CommonLoading from '@/common/CommonLoading'
import { ICourse } from '@/models/course'
import {
	Button,
	Grid,
	IconButton,
	Input,
	InputAdornment,
	Menu,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
} from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Course, Module, Order, UserData } from '@/types'
import { getComparator, stableSort } from '@/helpers/helpers'
import { useRouter } from 'next/router'
import { IModule } from '@/models/module'
import { IUser } from '@/models/user'
import SearchIcon from '@mui/icons-material/Search'
import CommonPageHeader from '@/common/CommonPageHeader'
import FilterListIcon from '@mui/icons-material/FilterList'
import { subjectStyles } from '@/styles/subject.style'

const UserDashboard = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [rows, setRows] = useState<UserData[]>([])
	const [anchorEl, setAnchorEl] = useState(null)
	const [selectedRow, setSelectedRow] = useState<UserData | null>(null)
	const [rowsPerPage, setRowsPerPage] = useState(25)
	const [page, setPage] = useState(0)
	const [order, setOrder] = useState<Order>('asc')
	const [orderBy, setOrderBy] = useState<keyof UserData>('name')
	const [visibleRows, setVisibleRows] = useState<UserData[] | null>(null)
	const [searchData, setSearchData] = useState<string>('')
	const router = useRouter()

	const handleChangePage = React.useCallback(
		(event: unknown, newPage: number) => {
			setPage(newPage)

			const sortedRows = stableSort(rows, getComparator(order, orderBy))
			const updatedRows = sortedRows.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage)
			setVisibleRows(updatedRows)
		},
		[order, orderBy, rowsPerPage, rows]
	)

	const handleChangeRowsPerPage = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const updatedRowsPerPage = parseInt(event.target.value, 10)
			setRowsPerPage(updatedRowsPerPage)

			setPage(0)

			const sortedRows = stableSort(rows, getComparator(order, orderBy))
			const updatedRows = sortedRows.slice(0 * updatedRowsPerPage, 0 * updatedRowsPerPage + updatedRowsPerPage)
			setVisibleRows(updatedRows)
		},
		[order, orderBy, rows]
	)

	const handleClose = () => {
		setAnchorEl(null)
		setSelectedRow(null)
	}

	const handleEdit = () => {
		const { _id } = selectedRow as UserData
		router.push(`/modules/edit-module/${_id}`)
		handleClose()
	}

	const handleDelete = () => {
		const { _id } = selectedRow as UserData
		setLoading(true)
		axios
			.delete(`${process.env.apiUrl}/module/${_id}`)
			.then(() => {})
			.catch((err) => {
				setLoading(false)
				setErrorMessage('There is something wrong')
				handleClose()
			})
		const updatedRows = rows.filter((row) => row._id !== _id)
		setRows(updatedRows)
		setLoading(false)
		handleClose()
	}

	const handleClick = (event: any, row: UserData) => {
		setAnchorEl(event.currentTarget)
		setSelectedRow(row)
	}

	useEffect(() => {
		setLoading(true)
		axios
			.get(`${process.env.apiUrl}/user?search=${searchData}`)
			.then((data) => {
				const { data: users } = data
				const { data: userArr } = users
				if (userArr && userArr.length > 0) {
					const mappedUsers: UserData[] = userArr.map((user: IUser) => {
						return {
							_id: user._id,
							name: user.firstName + ' ' + user.lastName,
							email: user.email,
							role: user.role,
							status: user.isActive ? 'Active' : 'Inactive',
						}
					})
					setRows(mappedUsers)
					setLoading(false)
				} else {
					setRows([])
					setLoading(false)
				}
			})
			.catch((err) => {
				console.error(err)
			})
	}, [searchData, setLoading, setRows])

	const handleAddUser = () => {}

	return (
		<div>
			<CommonPageHeader
				title={<>Users</>}
				headerChild={
					<>
						<Input
							id='search'
							startAdornment={
								<InputAdornment position='start'>
									<SearchIcon sx={{ marginLeft: '10px' }} />
								</InputAdornment>
							}
							placeholder='Search'
							sx={{ borderRadius: '20px', background: 'white', height: '40px', borderBottom: 'none' }}
							size='small'
							name='search'
							value={searchData}
							onChange={(e) => setSearchData(e.target.value)}
							className='SearchBox'
						/>
						<IconButton sx={{ background: 'white', marginLeft: '15px' }} aria-label='Filter'>
							<FilterListIcon />
						</IconButton>
					</>
				}
				actionButton={<></>}
			/>
			{loading ? (
				<CommonLoading />
			) : (
				<Fragment>
					<TableContainer sx={subjectStyles.tableContainer} component={Paper}>
						<Table size='small' sx={{ minWidth: 650 }}>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Role</TableCell>
									<TableCell>Status</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.length === 0 && (
									<TableRow>
										<TableCell style={{ textAlign: 'center' }} colSpan={6}>
											No Data Available
										</TableCell>
									</TableRow>
								)}
								{rows.map((row) => (
									<TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell component='th' scope='row'>
											{row.name}
										</TableCell>
										<TableCell>{row.email}</TableCell>
										<TableCell>{row.role}</TableCell>
										<TableCell>{row.status}</TableCell>
										<TableCell>
											<IconButton aria-label='more' aria-controls='long-menu' aria-haspopup='true' onClick={(event) => handleClick(event, row)}>
												<MoreVertIcon />
											</IconButton>
											<Menu anchorEl={anchorEl} id='long-menu' keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
												<MenuItem onClick={handleEdit}>
													<EditIcon />
													Edit
												</MenuItem>
												<MenuItem onClick={handleDelete}>
													<DeleteIcon />
													Delete
												</MenuItem>
											</Menu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component='div'
						count={rows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Fragment>
			)}
		</div>
	)
}

export default UserDashboard
