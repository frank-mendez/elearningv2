/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		mongoDbUrl: process.env.MONGODB_URL,
		apiUrl: process.env.API_URL,
		secretKey: process.env.SECRET_KEY,
		baseUrl: 'http://elearning.d8d2f2a5fxg7c3bc.southeastasia.azurecontainer.io/',
	},
	images: {
		unoptimized: true,
	},
	output: 'standalone',
}

module.exports = nextConfig
