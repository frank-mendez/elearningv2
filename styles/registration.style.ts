import { SxProps, Theme } from '@mui/material'
import theme from '@/theme'

export const registrationStyles: Record<string, SxProps<Theme> | undefined> = {
	registrationContainer: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: theme.spacing(3),
	},
	textField: {
		margin: theme.spacing(1),
		width: '400px',
	},
	button: {
		margin: theme.spacing(2),
	},
	successText: {
		marginBottom: theme.spacing(2),
	},
	successContainer: {
		backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '50px 30px',
	},
	loading: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'white',
		padding: '50px',
	},
	formContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: theme.spacing(3),
		background: 'white',
		padding: '30px 40px',
		borderRadius: '5px',
	},
	textFormat: {
		fontFamily: "'Montserrat', sans-serif",
		color: 'GrayText',
	},
}
