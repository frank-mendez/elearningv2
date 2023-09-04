import mongoose, { Document } from 'mongoose'
import Course from './course'
import { IUser } from './user'
const { Schema } = mongoose

export interface ISubject extends Document {
	title: string
	ownerId: IUser
	isPublished: boolean
	createdAt: Date
	updatedAt: Date
	courses: number
}

const subjectSchema = new Schema<ISubject>({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	ownerId: {
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

subjectSchema.virtual('courses', {
	ref: Course,
	localField: '_id',
	foreignField: 'subjectId',
	count: true,
})

subjectSchema.pre<ISubject>('save', function (next) {
	this.updatedAt = new Date()
	next()
})

const Subject = mongoose.models.Subject || mongoose.model('Subject', subjectSchema)

export default Subject
