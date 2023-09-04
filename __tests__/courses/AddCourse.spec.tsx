import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { Formik } from 'formik'
import { MenuItem } from '@material-ui/core'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
	const mockHandleSubmit = jest.fn()
	const mockHandleImageChange = jest.fn()
	const mockHandleClearImage = jest.fn()

	const initialValues = {
		title: '',
		status: '',
		subject: '',
		author: '',
		description: '',
		icon: null,
	}

	const subjectDropdownValues = [
		{ name: 'Subject 1', value: 'subject1' },
		{ name: 'Subject 2', value: 'subject2' },
	]

	const userDropdownValues = [
		{ name: 'User 1', value: 'user1' },
		{ name: 'User 2', value: 'user2' },
	]

	const renderBlogForm = (props) =>
		render(
			<Formik initialValues={initialValues} onSubmit={mockHandleSubmit}>
				{(formik) => <BlogForm formik={formik} {...props} />}
			</Formik>
		)

	it('should render all form fields', () => {
		renderBlogForm({ subjectDropdownValues, userDropdownValues })

		expect(screen.getByLabelText('Title')).toBeInTheDocument()
		expect(screen.getByLabelText('Status')).toBeInTheDocument()
		expect(screen.getByLabelText('Subject')).toBeInTheDocument()
		expect(screen.getByLabelText('Author')).toBeInTheDocument()
		expect(screen.getByLabelText('Description')).toBeInTheDocument()
		expect(screen.getByLabelText('Icon')).toBeInTheDocument()
		expect(screen.getByText('Save')).toBeInTheDocument()
	})

	it('should show error message when title is not provided', async () => {
		renderBlogForm({ subjectDropdownValues, userDropdownValues })

		const titleInput = screen.getByLabelText('Title')
		fireEvent.blur(titleInput)

		await act(async () => {
			await userEvent.type(titleInput, '')
		})

		expect(screen.getByText('Title is required')).toBeInTheDocument()
	})

	it('should show error message when subject is not selected', async () => {
		renderBlogForm({ subjectDropdownValues, userDropdownValues })

		const subjectInput = screen.getByLabelText('Subject')
		fireEvent.blur(subjectInput)

		await act(async () => {
			await userEvent.selectOptions(subjectInput, '')
		})

		expect(screen.getByText('Subject is required')).toBeInTheDocument()
	})

	it('should show error message when author is not selected', async () => {
		renderBlogForm({ subjectDropdownValues, userDropdownValues })

		const authorInput = screen.getByLabelText('Author')
		fireEvent.blur(authorInput)

		await act(async () => {
			await userEvent.selectOptions(authorInput, '')
		})

		expect(screen.getByText('Author is required')).toBeInTheDocument()
	})

	it('should call handleSubmit when form is submitted', async () => {
		renderBlogForm({ subjectDropdownValues, userDropdownValues })

		const titleInput = screen.getByLabelText('Title')
		const subjectInput = screen.getByLabelText('Subject')
		const authorInput = screen.getByLabelText('Author')
		const saveButton = screen.getByText('Save')

		await act(async () => {
			await userEvent.type(titleInput, 'Test Blog')
			await userEvent.selectOptions(subjectInput, 'subject1')
			await userEvent.selectOptions(authorInput, 'user1')
			await userEvent.click(saveButton)
		})

		expect(mockHandleSubmit).toHaveBeenCalled()
	})

	it('should call handleImageChange when icon is selected', async () => {
		renderBlogForm({ subjectDropdownValues, userDropdownValues })

		const iconInput = screen.getByLabelText('Icon')

		await act(async () => {
			await fireEvent.change(iconInput, {
				target: {
					files: [new File(['(⌐□_□)'], 'test.png', { type: 'image/png' })],
				},
			})
		})

		expect(mockHandleImageChange).toHaveBeenCalled()
	})

	it('should call handleClearImage when clear button is clicked', async () => {
		renderBlogForm({ subjectDropdownValues, userDropdownValues, preview: 'test.png' })

		const clearButton = screen.getByText('Clear')

		await act(async () => {
			await userEvent.click(clearButton)
		})

		expect(mockHandleClearImage).toHaveBeenCalled()
	})
})
