import { Button, FormHelperText, Grid, MenuItem, TextField } from '@mui/material'
import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'

const validationSchema = yup.object({
	title: yup.string().required('Title is required'),
	status: yup.string().required('Status is required'),
	description: yup.string().required('Description is required'),
	icon: yup.mixed().required('Icon is required'),
})

const Courses = () => {
	const formik = useFormik({
		initialValues: {
			status: '',
			title: '',
			description: '',
			icon: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {},
	})

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							label='Title'
							variant='outlined'
							value={formik.values.title}
							onChange={formik.handleChange}
							error={formik.touched.title && Boolean(formik.errors.title)}
							helperText={formik.touched.title && formik.errors.title}
							name='title'
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							select
							fullWidth
							name='status'
							placeholder='Status'
							label='Status'
							variant='outlined'
							value={formik.values.status}
							onChange={formik.handleChange}
							error={formik.touched.status && Boolean(formik.errors.status)}
						>
							<MenuItem value='Draft'>Draft</MenuItem>
							<MenuItem value='Published'>Published</MenuItem>
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							name='description'
							value={formik.values.description}
							onChange={formik.handleChange}
							error={formik.touched.description && Boolean(formik.errors.description)}
							helperText={formik.touched.description && formik.errors.description}
							fullWidth
							label='Description'
							multiline
							rows={4}
							variant='outlined'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							name='icon'
							value={formik.values.icon}
							onChange={formik.handleChange}
							error={formik.touched.icon && Boolean(formik.errors.icon)}
							helperText={formik.touched.icon && formik.errors.icon}
							type='file'
							label='Upload Icon'
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item xs={4}>
						<Button type='submit' variant='contained' color='primary'>
							Save
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	)
}

export default Courses
