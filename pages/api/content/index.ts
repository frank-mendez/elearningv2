import dbConnect from '@/config/dbConnect'
import Content from '@/models/content'
import Module from '@/models/module'
import Subject from '@/models/subject'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const conn = await dbConnect()
	if (req.method === 'POST') {
		const { content, type, status, moduleId, authorId } = req.body
		try {
			if (conn) {
				const payload = {
					content,
					type,
					moduleId,
					isPublished: status === 'Draft' ? false : true,
					authorId,
				}
				const contentDate = new Content(payload)
				await contentDate
					.save()
					.then((data: any) => {
						return res.status(200).send(data)
					})
					.catch((err: any) => {
						console.error(err)
						return res.status(401).send(err)
					})
			}
		} catch (error) {
			console.error(error)
			throw new Error('Something went wrong')
		}
	}

	if (req.method === 'GET') {
		try {
			if (conn) {
				const filter = {}
				const subjects = await Subject.find(filter).populate('courses').populate('ownerId', ['firstName', 'lastName']).lean().exec()
				const payload = {
					data: subjects,
					page: 1,
					limit: 25,
					totalCount: subjects.length,
				}
				return res.status(200).send(payload)
			}
		} catch (error) {
			console.error('error', error)
			throw new Error('Something went wrong')
		}
	}

	if (req.method === 'PATCH') {
		const { title, status, ownerId, subjectId } = req.body
		try {
			if (conn) {
				const subject = await Subject.findById(subjectId).exec()
				subject.title = title
				subject.isPublished = status === 'Draft' ? false : true
				subject.ownerId = ownerId
				subject.save()
				return res.status(200).send(subject)
			}
		} catch (error) {
			console.error(error)
			throw new Error('Something went wrong')
		}
	}
}
