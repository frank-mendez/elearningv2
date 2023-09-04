import React from 'react'
import ModuleDashboard from '../../components/Modules/ModuleDashboard'
import CommonLayout from '@/common/CommonLayout'

export default function ModuleComponent(props: any) {
	return (
		<CommonLayout title='Modules'>
			<ModuleDashboard />
		</CommonLayout>
	)
}
