import { SxProps, Theme } from '@mui/material'
import theme from '@/theme'

export const subjectStyles: Record<string, SxProps<Theme> | undefined> = {
	headerContainer: {
		height: '180px',
		background: '#28B4F4',
		color: 'white',
		padding: '40px 50px',
		marginBottom: '-65px',
	},
	tableContainer: { width: 'inherit', margin: '0px 50px', borderRadius: '10px' },
	subjectContainer: {
		background: 'white',
		margin: '0px 30px',
		borderRadius: '25px',
		width: 'inherit',
	},
}
