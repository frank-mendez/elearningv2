import { ICourse } from './models/course'
import { IUser } from './models/user'

export type Order = 'asc' | 'desc'

export interface Subject {
	title: string
	courses: string
	isPublished: string
	id: string
}

export interface Course {
	title: string
	author: string
	subject: string
	modules: number
	duration: number
	isPublished: string
	description: string
	id: string
	icon: string
	createdAt?: Date
}

export interface Module {
	_id: string
	title: string
	duration: number
	isPublished: string
	courseId: string
}

export interface IModule {
	_id: string
	authorId: IUser
	courseId: ICourse
	duration: number
	title: string
	createdAt?: Date
	updatedAt?: Date
}

export interface Content {
	_id: string
	content: string
	type: string
	isPublished: boolean
	moduleId: string
}

export interface UserData {
	name: string
	email: string
	_id: string
	role: string
	status: string
}

export interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

export interface IMenu {
	value: string
	name: string
}

export interface AddSubjectPayload {
	title: string
	status: string
	ownerId: string
}

export interface UpdateSubjectPayload {
	title: string
	status: string
	ownerId: string
	subjectId: string
}

export interface AddModulePayload {
	title: string
	status: string
	duration: string
	courseId: string
	authorId: string
}

export interface UpdateModulePayload {
	title: string
	status: string
	duration: number
	courseId: string
	authorId: string
	content: string
}
