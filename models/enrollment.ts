import mongoose, { Document } from 'mongoose'
import Course, { ICourse } from './course'
import { IUser } from './user'
const { Schema } = mongoose

export interface IEnrollment extends Document {
	courseId: ICourse
	userId: IUser
	createdAt: Date
	updatedAt: Date
}

const enrollmentSchema = new Schema<IEnrollment>({
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
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	courseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course',
	},
})

const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', enrollmentSchema)

export default Enrollment
