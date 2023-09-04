import dbConnect from '@/config/dbConnect'
import Subject from '@/models/subject'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const conn = await dbConnect()
	if (req.method === 'GET') {
		const { subjectId } = req.query
		try {
			if (conn) {
				const subject = await Subject.findById(subjectId).populate('courses').lean().exec()
				if (subject) {
					return res.send(subject)
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
		const { subjectId } = req.query
		try {
			if (conn) {
				const subject = await Subject.findByIdAndRemove(subjectId)
				if (subject) {
					return res.status(200).send(subject)
				} else {
					throw new Error('subject not found')
				}
			}
		} catch (error) {
			console.error('error', error)
			return res.status(404).send('User not found')
		}
	}
}
