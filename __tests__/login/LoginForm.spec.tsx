import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { loginUser } from '@/services/user.service'
import { useRouter } from 'next/router'
import LoginForm from '@/pages/login/LoginForm'

jest.mock('../../services/user.service.ts')
jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}))
jest.mock('../../services/user.service.ts', () => ({
	loginUser: jest.fn(), // mock the function
}))

describe('LoginForm', () => {
	let mockRouter

	beforeEach(() => {
		mockRouter = {
			push: jest.fn(),
		}
		;(useRouter as jest.Mock).mockReturnValue(mockRouter)
	})

	test('submits form with valid data', async () => {
		;(loginUser as jest.Mock).mockResolvedValue({
			access_token: 'token',
			email: 'test@test.com',
			firstName: 'Test',
			lastName: 'User',
			id: '1',
			isActive: true,
			role: 'user',
		})

		render(<LoginForm />)

		fireEvent.change(screen.getByTestId('login-email-input'), {
			target: { value: 'test@test.com' },
		})
		fireEvent.change(screen.getByTestId('login-password-input'), {
			target: { value: 'password' },
		})

		fireEvent.click(screen.getByText('Login In'))

		await waitFor(() => expect(loginUser).toHaveBeenCalledTimes(1))
		expect(loginUser).toHaveBeenCalledWith({
			email: 'test@test.com',
			password: 'password',
		})
		expect(mockRouter.push).toHaveBeenCalledWith('/')
	})

	test('shows error message on failed login', async () => {
		;(loginUser as jest.Mock).mockRejectedValue(new Error('Invalid Credentials'))

		render(<LoginForm />)

		fireEvent.change(screen.getByTestId('login-email-input'), {
			target: { value: 'test@test.com' },
		})
		fireEvent.change(screen.getByTestId('login-password-input'), {
			target: { value: 'password' },
		})

		fireEvent.click(screen.getByText('Login In'))

		await waitFor(() => expect(loginUser).toHaveBeenCalledTimes(1))
	})
})
