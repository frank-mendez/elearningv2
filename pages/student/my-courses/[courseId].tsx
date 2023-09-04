import { Box, Button, Grid, Paper, Step, StepContent, StepLabel, Stepper } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import ModuleContent from '../../../components/Student/ModuleContent'
import { getStudentModule } from '@/services/student.service'
import CommonLayout from '@/common/CommonLayout'

export interface StepProps {
	id: string
	label: string
	description: string
}

const CourseDetails = () => {
	const router = useRouter()
	const { courseId } = router.query
	const [activeStep, setActiveStep] = useState(0)
	const [steps, setSteps] = useState<StepProps[]>([])

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleReset = () => {
		setActiveStep(0)
	}

	const getStudentModuleData = async (id: string) => {
		const response = await getStudentModule(id)
		if (response.length > 0) {
			setSteps(response)
		}
	}

	useEffect(() => {
		getStudentModuleData(courseId as string)
	}, [courseId])

	return (
		<CommonLayout title='Course Enrolled' isStudent={true}>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<Box sx={{ maxWidth: 400 }}>
						<Stepper activeStep={activeStep} orientation='vertical'>
							{steps.map((step, index) => (
								<Step key={step.label}>
									<StepLabel optional={index === 2 ? <Typography variant='caption'>Last step</Typography> : null}>{step.label}</StepLabel>
									<StepContent>
										<Typography>{step.description}</Typography>
										<Box sx={{ mb: 2 }}>
											<div>
												<Button variant='contained' onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
													{index === steps.length - 1 ? 'Finish' : 'Continue'}
												</Button>
												<Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
													Back
												</Button>
											</div>
										</Box>
									</StepContent>
								</Step>
							))}
						</Stepper>
						{activeStep === steps.length && (
							<Paper square elevation={0} sx={{ p: 3 }}>
								<Typography>All steps completed - you&apos;re finished</Typography>
								<Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
									Reset
								</Button>
							</Paper>
						)}
					</Box>
				</Grid>
				<Grid item xs={8}>
					{steps.length > 0 && <ModuleContent id={steps[activeStep].id} />}
				</Grid>
			</Grid>
		</CommonLayout>
	)
}

export default CourseDetails
