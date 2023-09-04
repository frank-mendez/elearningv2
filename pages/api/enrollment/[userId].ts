import dbConnect from '@/config/dbConnect'
import Course from '@/models/course'
import Enrollment from '@/models/enrollment'
import Module from '@/models/module'
import Subject from '@/models/subject'
import User from '@/models/user'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const conn = await dbConnect()
	if (req.method === 'GET') {
		const { userId } = req.query
		try {
			if (conn) {
				const enrolledCourses = await Enrollment.find({ userId })
					.populate({
						path: 'courseId',
						model: Course,
						populate: [
							{ path: 'subjectId', model: Subject },
							{ path: 'authorId', model: User },
							{ path: 'modules', model: Module },
						],
					})
					.exec()
				if (enrolledCourses) {
					return res.send(enrolledCourses)
				} else {
					throw new Error('enrolledCourses not found')
				}
			}
		} catch (error) {
			console.error('error', error)
			return res.status(404).send('Course not found')
		}
	}
}
