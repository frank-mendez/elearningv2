import { SxProps, Theme } from '@mui/material'
import theme from '@/theme'

export const forgotPasswordStyles: Record<string, SxProps<Theme> | undefined> = {
	forgotPasswordContainer: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	forgotForm: {
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
	},
}
