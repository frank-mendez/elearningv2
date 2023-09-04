import mongoose, { Document } from 'mongoose'
import Module, { IModule } from './module'
import { ISubject } from './subject'
import { IUser } from './user'
const { Schema } = mongoose

export interface ICourse extends Document {
	title: string
	description: string
	icon: string
	subjectId: ISubject
	authorId: IUser
	isPublished: boolean
	createdAt: Date
	updatedAt: Date
	modules?: IModule[]
	duration?: number
	moduleData?: any
}

export const courseSchema = new Schema<ICourse>({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	description: { type: String, required: true },
	icon: { type: String },
	subjectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Subject',
	},
	authorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
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
})

courseSchema.virtual('modules', {
	ref: Module,
	localField: '_id',
	foreignField: 'courseId',
})

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema)

export default Course
