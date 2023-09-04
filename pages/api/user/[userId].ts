import dbConnect from '@/config/dbConnect'
import User from '@/models/user'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	if (req.method === 'GET') {
		const { userId } = req.query
		try {
			const conn = await dbConnect()
			if (conn) {
				const user = await User.findById(userId).populate('subjects').exec()
				if (user) {
					return res.send(user)
				} else {
					throw new Error('User not found')
				}
			}
		} catch (error) {
			console.error('error', error)
			return res.status(404).send('User not found')
		}
	}

	if (req.method === 'PATCH') {
		const { userId } = req.query
		const { mode } = req.body
		try {
			const conn = await dbConnect()
			if (conn) {
				const user = await User.findById(userId)
				if (user) {
					user.theme = mode
					await user
						.save()
						.then((data: any) => {
							return res.status(200).send(data)
						})
						.catch((err: any) => {
							console.error(err)
							return res.status(500).send(err)
						})
					return user
				} else {
					throw new Error('User not found')
				}
			}
		} catch (error) {
			console.error('error', error)
			return res.status(404).send('User not found')
		}
	}
}
