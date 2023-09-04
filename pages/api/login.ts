import dbConnect from '@/config/dbConnect'
import User from '@/models/user'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	if (req.method === 'POST') {
		const { email, password } = req.body
		try {
			const conn = await dbConnect()
			if (conn) {
				const user = await User.findOne({ email }).select(['password', 'firstName', 'lastName', 'email', 'isActive', 'role', 'theme'])
				if (!user) return res.status(401).send('User not found')
				const passwordValid = await bcrypt.compare(password, user.password)
				if (!passwordValid) return res.status(401).send('Invalid credentials')

				const payload = {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					id: user._id,
					isActive: user.isActive,
					role: user.role,
					theme: user.theme,
				}

				const response = {
					data: {
						access_token: jwt.sign(payload, process.env.secretKey!, { expiresIn: '1d' }),
						...payload,
					},
				}

				return res.status(206).send(response)
			}
		} catch (error) {
			console.error(error)
			return res.status(401).send(`Error! ${error}`)
		}
	}
}
