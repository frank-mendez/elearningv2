import dbConnect from '@/config/dbConnect'
import Subject from '@/models/subject'
import User from '@/models/user'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const conn = await dbConnect()
	if (req.method === 'POST') {
		const { title, status, ownerId } = req.body
		try {
			if (conn) {
				const user = await User.findById(ownerId)
				const payload = {
					title,
					isPublished: status === 'Draft' ? false : true,
					ownerId: user._id,
				}
				const subject = new Subject(payload)
				await subject
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
				const { search, page, rowsPerPage } = req.query
				const pageNumber = page ? +page : 1
				const pageSize = rowsPerPage ? +rowsPerPage : 25
				const filter = search ? { firstName: { $regex: new RegExp(search as string, 'i') } } : {}
				const users = await User.find(filter)
					.skip((pageNumber - 1) * pageSize)
					.limit(pageSize)
					.lean()
					.exec()
				const payload = {
					data: users,
					page: 1,
					limit: 25,
					totalCount: users.length,
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
