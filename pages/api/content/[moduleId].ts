import dbConnect from '@/config/dbConnect'
import Content from '@/models/content'
import Module from '@/models/module'
import Subject from '@/models/subject'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const conn = await dbConnect()
	if (req.method === 'GET') {
		const { moduleId } = req.query
		try {
			if (conn) {
				const contentData = await Content.findOne({ moduleId }).exec()
				if (contentData) {
					return res.send(contentData)
				} else {
					return res.status(404).send('Content not found')
				}
			}
		} catch (error) {
			console.error('error', error)
			return res.status(404).send('Content not found')
		}
	}

	if (req.method === 'DELETE') {
		const { subjectId } = req.query
		try {
			if (conn) {
				const subject = await Subject.findByIdAndRemove(subjectId)
				if (subject) {
					return res.status(200)
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
