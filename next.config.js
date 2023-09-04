/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		mongoDbUrl: process.env.MONGODB_URL,
		apiUrl: process.env.API_URL,
		secretKey: process.env.SECRET_KEY,
		baseUrl: 'http://localhost:3000/',
	},
}

module.exports = nextConfig
