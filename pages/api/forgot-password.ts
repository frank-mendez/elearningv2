import dbConnect from '@/config/dbConnect'
import User from '@/models/user'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	if (req.method === 'POST') {
		const { email } = req.body
		try {
			const conn = await dbConnect()
			if (conn) {
				const user = await User.findOne({ email }).select(['password', 'firstName', 'lastName', 'email', 'isActive', 'role', 'theme'])
				if (!user) return res.status(500).send({ message: 'User not found' })

				return res.status(206).send({ message: 'Reset Link will be sent to your email' })
			}
		} catch (error) {
			console.error(error)
			return res.status(500).send(`Error! ${error}`)
		}
	}
}
