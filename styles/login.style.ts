import { SxProps, Theme } from '@mui/material'
import theme from '@/theme'

export const loginStyles: Record<string, SxProps<Theme> | undefined> = {
	formContainer: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	paper: {
		marginTop: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	loginForm: {
		marginTop: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: 'white',
		padding: '30px 40px',
		width: '500px',
	},
	textFormat: {
		fontFamily: "'Montserrat', sans-serif",
		color: 'GrayText',
	},
}
