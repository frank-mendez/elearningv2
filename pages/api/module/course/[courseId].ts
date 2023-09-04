import dbConnect from '@/config/dbConnect'
import Content from '@/models/content'
import Module from '@/models/module'
import Subject from '@/models/subject'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const conn = await dbConnect()
	if (req.method === 'GET') {
		const { courseId } = req.query
		try {
			if (conn) {
				const moduleData = await Module.find({ courseId }).populate('courseId').populate('authorId')
				if (moduleData) {
					return res.send(moduleData)
				} else {
					throw new Error('Module not found')
				}
			}
		} catch (error) {
			console.error('error', error)
			return res.status(404).send('User not found')
		}
	}
}
