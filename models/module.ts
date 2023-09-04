import mongoose, { Document } from 'mongoose'
import { ICourse } from './course'
import { IUser } from './user'
const { Schema } = mongoose

export interface IModule extends Document {
	title: string
	duration: number
	isPublished: boolean
	courseId: ICourse
	authorId: IUser
	createdAt: Date
	updatedAt: Date
}

const moduleSchema = new Schema<IModule>({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	isPublished: {
		type: Boolean,
		required: false,
		default: false,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	updatedAt: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	authorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	courseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course',
	},
})

const Module = mongoose.models.Module || mongoose.model('Module', moduleSchema)

export default Module
