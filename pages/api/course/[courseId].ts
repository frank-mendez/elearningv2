import dbConnect from '@/config/dbConnect'
import Course from '@/models/course'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const conn = await dbConnect()
	if (req.method === 'GET') {
		const { courseId } = req.query
		try {
			if (conn) {
				const course = await Course.findById(courseId).populate('modules').exec()
				if (course) {
					return res.send(course)
				} else {
					throw new Error('subject not found')
				}
			}
		} catch (error) {
			console.error('error', error)
			return res.status(404).send('User not found')
		}
	}

	if (req.method === 'DELETE') {
		const { courseId } = req.query
		try {
			if (conn) {
				const course = await Course.findByIdAndRemove(courseId)
				if (course) {
					return res.status(200).send(course)
				} else {
					throw new Error('Course not found')
				}
			}
		} catch (error) {
			console.error('error', error)
			return res.status(404).send('User not found')
		}
	}
}
