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
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Course, Order } from '@/types'
import { useRouter } from 'next/router'
import { deleteCourse, getCourseTable } from '@/services/course.service'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import CommonPageHeader from '@/common/CommonPageHeader'
import { subjectStyles } from '@/styles/subject.style'
import { getAllCourses } from '@/redux/courses/actions'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'

const CourseDashboard = () => {
	const dispatch = useDispatch<AppDispatch>()
	const [loading, setLoading] = useState<boolean>(false)
	const [rows, setRows] = useState<Course[]>([])
	const [anchorEl, setAnchorEl] = useState(null)
	const [selectedRow, setSelectedRow] = useState<Course | null>(null)
	const [rowsPerPage, setRowsPerPage] = useState(25)
	const [page, setPage] = useState(0)
	const [order, setOrder] = useState<Order>('asc')
	const [orderBy, setOrderBy] = useState<keyof Course>('title')
	const [visibleRows, setVisibleRows] = useState<Course[] | null>(null)
	const [searchData, setSearchData] = useState<string>('')
	const router = useRouter()

	const courses = useSelector((state: RootState) => state.course.courses)

	const handleChangePage = useCallback(
		(event: unknown, newPage: number) => {
			setPage(newPage)
		},
		[setPage]
	)

	const handleChangeRowsPerPage = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const updatedRowsPerPage = parseInt(event.target.value, 10)
			setRowsPerPage(updatedRowsPerPage)

			setPage(0)
		},
		[setRowsPerPage, setPage]
	)

	const handleClose = () => {
		setAnchorEl(null)
		setSelectedRow(null)
	}

	const handleEdit = () => {
		const { id } = selectedRow as Course
		router.push(`/courses/edit-course/${id}`)
		handleClose()
	}

	const handleDelete = async () => {
		const { id } = selectedRow as Course
		setLoading(true)
		const updatedRows = rows.filter((row) => row.id !== id)
		setRows(updatedRows)
		setLoading(false)
		handleClose()
		await deleteCourse(id)
	}

	const handleClick = (event: any, row: Course) => {
		setAnchorEl(event.currentTarget)
		setSelectedRow(row)
	}

	useEffect(() => {
		dispatch(getAllCourses({ searchData }))
	}, [searchData])

	useEffect(() => {
		if (courses.length > 0) {
			setRows(courses)
		}
	}, [courses, setRows])

	return (
		<div>
			<CommonPageHeader
				title={<>Courses</>}
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
						<Button sx={{ height: '40px', background: 'white', color: 'GrayText' }} onClick={() => router.push('/courses/add-course')}>
							Add New Course
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
									<TableCell>Subject</TableCell>
									<TableCell>Author</TableCell>
									<TableCell>Modules</TableCell>
									<TableCell>Duration</TableCell>
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
									<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell component='th' scope='row'>
											{row.title}
										</TableCell>
										<TableCell>{row.subject}</TableCell>
										<TableCell>{row.author}</TableCell>
										<TableCell>{row.modules} Modules</TableCell>
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

export default CourseDashboard
