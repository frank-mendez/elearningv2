import mongoose, { Document } from 'mongoose'
import Course from './course'
import Subject from './subject'
const { Schema } = mongoose

export interface IUser extends Document {
	email: string
	firstName: string
	lastName: string
	password: string
	role: string
	theme: string
	isActive: boolean
	createdAt: Date
	updatedAt: Date
}

const userSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		role: {
			type: String,
			required: true,
		},
		theme: {
			type: String,
			required: true,
			unique: true,
		},
		isActive: {
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
	},
	{
		toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
		toObject: { virtuals: true },
	}
)

userSchema.virtual('subjects', {
	ref: Subject,
	localField: '_id',
	foreignField: 'User',
})

userSchema.virtual('courses', {
	ref: Course,
	localField: '_id',
	foreignField: 'User',
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
