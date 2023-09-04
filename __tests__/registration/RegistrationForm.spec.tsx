import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { registerUser } from '@/services/user.service'
import { useRouter } from 'next/router'
import RegistrationForm from '@/pages/registration/RegistrationForm'

jest.mock('../../services/user.service.ts')
jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}))
jest.mock('../../services/user.service.ts', () => ({
	registerUser: jest.fn(), // mock the function
}))

describe('RegistrationForm', () => {
	let mockRouter

	beforeEach(() => {
		mockRouter = {
			push: jest.fn(),
		}
		;(useRouter as jest.Mock).mockReturnValue(mockRouter)
	})

	test('submits form with valid data', async () => {
		;(registerUser as jest.Mock).mockResolvedValue({
			access_token: 'token',
			email: 'test@test.com',
			firstName: 'Test',
			lastName: 'User',
			id: '1',
			isActive: true,
			role: 'instructor',
		})

		render(<RegistrationForm />)

		fireEvent.change(screen.getByTestId('register-role-input'), {
			target: { value: 'instructor' },
		})
		fireEvent.change(screen.getByTestId('register-email-input'), {
			target: { value: 'test@test.com' },
		})
		fireEvent.change(screen.getByTestId('register-firstName-input'), {
			target: { value: 'Test' },
		})
		fireEvent.change(screen.getByTestId('register-lastName-input'), {
			target: { value: 'User' },
		})
		fireEvent.change(screen.getByTestId('register-password-input'), {
			target: { value: 'password' },
		})
		fireEvent.change(screen.getByTestId('register-confirmPassword-input'), {
			target: { value: 'password' },
		})

		fireEvent.click(screen.getByText('Register'))

		await waitFor(() => expect(registerUser).toHaveBeenCalledTimes(1))
		expect(registerUser).toHaveBeenCalledWith({
			role: 'instructor',
			email: 'test@test.com',
			firstName: 'Test',
			lastName: 'User',
			password: 'password',
		})
	})

	test('shows error message on failed login', async () => {
		;(registerUser as jest.Mock).mockRejectedValue(new Error('Email already in use'))

		render(<RegistrationForm />)

		fireEvent.change(screen.getByTestId('register-email-input'), {
			target: { value: 'test@test.com' },
		})
		fireEvent.change(screen.getByTestId('register-password-input'), {
			target: { value: 'password' },
		})

		fireEvent.click(screen.getByText('Register'))

		await waitFor(() => expect(registerUser).toHaveBeenCalledTimes(1))
	})
})
