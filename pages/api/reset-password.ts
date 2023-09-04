import dbConnect from '@/config/dbConnect'
import User from '@/models/user'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	if (req.method === 'POST') {
		const { password, resetLink } = req.body
		try {
			const conn = await dbConnect()
			if (conn) {
				const user = await User.findOne({ resetLink }).select(['password', 'firstName', 'lastName', 'email', 'isActive', 'role', 'theme'])
				if (!user) return res.status(500).send({ message: 'User not found' })
				const salt = await bcrypt.genSalt()
				const hashedPassword = await bcrypt.hash(password, salt)

				user.password = hashedPassword

				await user.save()

				return res.status(206).send({ message: 'Password successfully changed' })
			}
		} catch (error) {
			console.error(error)
			return res.status(500).send(`Error! ${error}`)
		}
	}
}
