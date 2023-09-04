import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Formik } from 'formik'
import Form from './Form'

describe('Form', () => {
	it('should render correctly', () => {
		const { getByLabelText, getByText } = render(
			<Formik initialValues={{ title: '', status: '' }} onSubmit={() => {}}>
				{(formik) => <Form formik={formik} />}
			</Formik>
		)

		expect(getByLabelText('Title')).toBeInTheDocument()
		expect(getByLabelText('Status')).toBeInTheDocument()
		expect(getByText('Save')).toBeInTheDocument()
	})

	it('should update form values on change', async () => {
		const { getByLabelText } = render(
			<Formik initialValues={{ title: '', status: '' }} onSubmit={() => {}}>
				{(formik) => <Form formik={formik} />}
			</Formik>
		)

		const titleInput = getByLabelText('Title')
		const statusInput = getByLabelText('Status')

		await act(async () => {
			fireEvent.change(titleInput, { target: { value: 'Test Title' } })
			fireEvent.change(statusInput, { target: { value: 'Draft' } })
		})

		expect(titleInput.value).toBe('Test Title')
		expect(statusInput.value).toBe('Draft')
	})

	it('should call onSubmit when form is submitted', async () => {
		const handleSubmit = jest.fn()
		const { getByText } = render(
			<Formik initialValues={{ title: '', status: '' }} onSubmit={handleSubmit}>
				{(formik) => <Form formik={formik} />}
			</Formik>
		)

		const saveButton = getByText('Save')

		await act(async () => {
			fireEvent.click(saveButton)
		})

		expect(handleSubmit).toHaveBeenCalled()
	})
})
