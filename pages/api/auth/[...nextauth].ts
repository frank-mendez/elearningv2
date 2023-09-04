import jwt from 'jsonwebtoken'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { AuthOptions } from 'next-auth'
import dbConnect from '@/config/dbConnect'
import User from '@/models/user'
import bcrypt from 'bcrypt'

const providers = [
	CredentialsProvider({
		type: 'credentials',
		credentials: {},
		async authorize(credentials: any) {
			const { email, password } = credentials
			try {
				const conn = await dbConnect()
				if (conn) {
					const user = await User.findOne({ email }).select(['password', 'email', 'firstName', 'lastName'])
					if (user) {
						const passwordValid = await bcrypt.compare(password, user.password)
						if (passwordValid) {
							return user
						} else {
							throw new Error('Invalid Credentials')
						}
					}
				}
			} catch (error) {
				throw new Error('Invalid Credentials')
			}
		},
	}),
]

export const options: AuthOptions = {
	providers,
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token.accessToken = account.access_token
				token.id = user.id
			}
			return token
		},
		async session({ session, token }) {
			if (token) {
				session.user = token
			}
			return session
		},
	},
	session: {
		strategy: 'jwt',
	},
	jwt: {
		secret: process.env.secretKey,
		maxAge: 1 * 24 * 30 * 60, // 1 day
	},
	debug: true,
}

const Auth = (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options)
export default Auth
