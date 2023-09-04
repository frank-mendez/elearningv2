import mongoose from 'mongoose'

const dbConnect = async (): Promise<boolean> => {
	const conn = await mongoose
		.connect(process.env.mongoDbUrl!, {
			autoIndex: true,
			dbName: 'eLearning',
		})
		.then((data) => {
			console.log(`DB connected: ${data}`)
			return true
		})
		.catch((err) => {
			console.error(err)
			return false
		})
	return conn
}

export const disconnectDb = async () => {
	await mongoose.disconnect()
}

export default dbConnect
