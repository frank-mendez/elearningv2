import mongoose, { Document } from 'mongoose'
import { IUser } from './user'
import { IModule } from './module'
const { Schema } = mongoose

export interface IContent extends Document {
	content: string
	type: string
	isPublished: boolean
	moduleId: IModule
	authorId: IUser
	createdAt: Date
	updatedAt: Date
}

const contentSchema = new Schema<IContent>({
	content: {
		type: String,
		required: true,
		unique: true,
	},
	type: {
		type: String,
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
	moduleId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Module',
	},
})

const Content = mongoose.models.Content || mongoose.model('Content', contentSchema)

export default Content
