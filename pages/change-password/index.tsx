import React from 'react'
import ChangePasswordForm from '../../components/ChangePassword/ChangePasswordForm'

const Index = () => {
	return (
		<div
			style={{
				height: '100vh',
				backgroundImage: 'url(http://cdn.backgroundhost.com/backgrounds/subtlepatterns/cutcube.png)',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ChangePasswordForm />
		</div>
	)
}

export default Index
