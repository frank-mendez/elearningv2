// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect, { disconnectDb } from '@/config/dbConnect'
import User from '@/models/user'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	if (req.method === 'POST') {
		const { role, email, firstName, lastName, password, theme } = req.body
		const salt = await bcrypt.genSalt()
		const hashedPassword = await bcrypt.hash(password, salt)

		const payload = {
			role,
			email,
			firstName,
			lastName,
			password: hashedPassword,
			theme,
		}
		try {
			const conn = await dbConnect()
			if (conn) {
				const existing = await User.findOne({ email: payload.email })
				if (existing) return res.status(500).send('Email already in use')
				const user = new User(payload)
				const response = await user
					.save()
					.then((data: any) => {
						return {
							data: {
								access_token: jwt.sign(payload, process.env.secretKey!, { expiresIn: '1d' }),
								...payload,
							},
						}
					})
					.catch((err: any) => {
						console.error(err)
						return res.status(500).send(err)
					})
				return res.status(200).send(response)
			}
		} catch (error) {
			console.error(error)
			return res.status(500).send(error)
		}
	}
}
