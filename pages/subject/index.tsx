import { getComparator, stableSort } from '@/helpers/helpers'
import { Order, Subject } from '@/types'
import {
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	Input,
	InputAdornment,
	Menu,
	MenuItem,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useRouter } from 'next/router'
import CommonLoading from '@/common/CommonLoading'
import { ISubject } from '@/models/subject'
import { deleteSubject, getSubjectTable } from '@/services/subject.service'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { getAllSubjects } from '@/redux/subjects/actions'
import { subjectStyles } from '@/styles/subject.style'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import CommonPageHeader from '@/common/CommonPageHeader'

const SubjectDashboard = () => {
	const dispatch = useDispatch<AppDispatch>()
	const [rowsPerPage, setRowsPerPage] = useState(25)
	const [page, setPage] = useState(0)
	const [order, setOrder] = useState<Order>('asc')
	const [orderBy, setOrderBy] = useState<keyof Subject>('courses')
	const [visibleRows, setVisibleRows] = useState<Subject[] | null>(null)
	const [anchorEl, setAnchorEl] = useState(null)
	const [selectedRow, setSelectedRow] = useState<Subject | null>(null)
	const [rows, setRows] = useState<Subject[]>([])
	const [searchData, setSearchData] = useState<string>('')
	const router = useRouter()

	const subjects = useSelector((state: RootState) => state.subject.subjects)
	const loading = useSelector((state: RootState) => state.subject.isLoading)

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
		const { id } = selectedRow as Subject
		router.push(`/subject/edit-subject/${id}`)
		handleClose()
	}

	const handleDelete = async () => {
		const { id: subjectId } = selectedRow as Subject
		await deleteSubject(subjectId)
		const updatedRows = rows.filter((row) => row.id !== subjectId)
		setRows(updatedRows)
		handleClose()
	}

	const handleClick = (event: any, row: Subject) => {
		setAnchorEl(event.currentTarget)
		setSelectedRow(row)
	}

	useEffect(() => {
		dispatch(getAllSubjects({ searchData }))
	}, [searchData])

	useEffect(() => {
		if (subjects.length > 0) {
			setRows(subjects)
		}
	}, [subjects, setRows])

	return (
		<div>
			<CommonPageHeader
				title={
					<>
						<MenuBookIcon /> Subjects
					</>
				}
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
						<Button sx={{ height: '40px', background: 'white', color: 'GrayText' }} onClick={() => router.push('/subject/add-subject')}>
							Add New Subject
						</Button>
					</>
				}
			/>
			{loading ? (
				<CommonLoading />
			) : (
				<div>
					<TableContainer sx={subjectStyles.tableContainer} component={Paper}>
						<Table size='small' sx={{ minWidth: 650 }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>Title</TableCell>
									<TableCell align='right'>Courses</TableCell>
									<TableCell align='right'>Status</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.length === 0 && (
									<TableRow>
										<TableCell style={{ textAlign: 'center' }} colSpan={4}>
											No Data Available
										</TableCell>
									</TableRow>
								)}
								{rows.map((row) => (
									<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell component='th' scope='row'>
											{row.title}
										</TableCell>
										<TableCell align='right'>{row.courses} Courses</TableCell>
										<TableCell align='right'>{row.isPublished ? 'Published' : 'Draft'}</TableCell>
										<TableCell align='right'>
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
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component='div'
							count={rows.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</TableContainer>
				</div>
			)}
		</div>
	)
}

export default SubjectDashboard
