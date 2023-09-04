import dbConnect from '@/config/dbConnect'
import Enrollment from '@/models/enrollment'
import Subject from '@/models/subject'
import User from '@/models/user'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const conn = await dbConnect()
	if (req.method === 'POST') {
		const { courseId, userId } = req.body
		try {
			if (conn) {
				const payload = {
					userId,
					courseId,
				}
				const enroll = new Enrollment(payload)
				await enroll
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
		const { courseId, userId } = req.body
		try {
			if (conn) {
				const payload = {
					userId,
					courseId,
				}
				const enroll = new Enrollment(payload)
				await enroll
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
}
