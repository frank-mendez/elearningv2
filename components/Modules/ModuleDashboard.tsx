import CommonLoading from '@/common/CommonLoading'
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
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Module, Order } from '@/types'
import { getComparator, stableSort } from '@/helpers/helpers'
import { useRouter } from 'next/router'
import { deleteModule, getModuleTable } from '@/services/module.service'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import CommonPageHeader from '@/common/CommonPageHeader'
import { subjectStyles } from '@/styles/subject.style'

const ModuleDashboard = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [rows, setRows] = useState<Module[]>([])
	const [anchorEl, setAnchorEl] = useState(null)
	const [selectedRow, setSelectedRow] = useState<Module | null>(null)
	const [rowsPerPage, setRowsPerPage] = useState(25)
	const [page, setPage] = useState(0)
	const [order, setOrder] = useState<Order>('asc')
	const [orderBy, setOrderBy] = useState<keyof Module>('title')
	const [visibleRows, setVisibleRows] = useState<Module[] | null>(null)
	const [searchData, setSearchData] = useState<string>('')
	const router = useRouter()

	const handleChangePage = React.useCallback(
		(event: unknown, newPage: number) => {
			setPage(newPage)

			const sortedRows = stableSort(rows, getComparator(order, orderBy))
			const updatedRows = sortedRows.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage)
			setVisibleRows(updatedRows)
		},
		[rows, order, orderBy, rowsPerPage]
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
		[rows, order, orderBy]
	)

	const handleClose = () => {
		setAnchorEl(null)
		setSelectedRow(null)
	}

	const handleEdit = () => {
		const { _id } = selectedRow as Module
		router.push(`/modules/edit-module/${_id}`)
		handleClose()
	}

	const handleDelete = async () => {
		const { _id } = selectedRow as Module
		setLoading(true)
		await deleteModule(_id)
		const updatedRows = rows.filter((row) => row._id !== _id)
		setRows(updatedRows)
		setLoading(false)
		handleClose()
	}

	const handleClick = (event: any, row: Module) => {
		setAnchorEl(event.currentTarget)
		setSelectedRow(row)
	}

	const getModuleTableData = async (search: string) => {
		const moduleTableData = await getModuleTable(search)
		if (moduleTableData.length > 0) {
			setRows(moduleTableData)
		}
	}

	useEffect(() => {
		setLoading(true)
		getModuleTableData(searchData)
		setLoading(false)
	}, [searchData, setLoading, setRows])

	return (
		<div>
			<CommonPageHeader
				title={<>Modules</>}
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
				actionButton={
					<>
						<Button sx={{ height: '40px', background: 'white', color: 'GrayText' }} onClick={() => router.push('/modules/add-module')}>
							Add New Module
						</Button>
					</>
				}
			/>

			{loading ? (
				<CommonLoading />
			) : (
				<Fragment>
					<TableContainer sx={subjectStyles.tableContainer} component={Paper}>
						<Table size='small' sx={{ minWidth: 650 }}>
							<TableHead>
								<TableRow>
									<TableCell>Title</TableCell>
									<TableCell>Course</TableCell>
									<TableCell>Duration</TableCell>
									<TableCell>Status</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.length === 0 && (
									<TableRow>
										<TableCell style={{ textAlign: 'center' }} colSpan={5}>
											No Data Available
										</TableCell>
									</TableRow>
								)}
								{rows.map((row) => (
									<TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell component='th' scope='row'>
											{row.title}
										</TableCell>
										<TableCell>{row.courseId}</TableCell>
										<TableCell>{row.duration} Min</TableCell>
										<TableCell>{row.isPublished ? 'Published' : 'Draft'}</TableCell>
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

export default ModuleDashboard
