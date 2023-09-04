import dbConnect from '@/config/dbConnect'
import Course from '@/models/course'
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import formidable from 'formidable'
import path from 'path'

//This is very important config  to make formidable work
// Reference: https://nextjs.org/docs/api-routes/request-helpers#custom-config
export const config = {
	api: {
		bodyParser: false,
	},
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const conn = await dbConnect()
	if (req.method === 'POST') {
		const form = formidable({ multiples: true })
		const formData = new Promise((resolve, reject) => {
			form.parse(req, async (err, fields, files) => {
				if (err) {
					reject('error')
				}
				resolve({ fields, files })
			})
		})
		await formData
			.then(async (data) => {
				const { fields, files } = data as any
				try {
					const filePath = path.join(process.cwd(), 'public', 'uploads', files.icon.newFilename)
					fs.rename(files.icon.filepath, filePath, (err) => {
						if (err) {
							throw new Error('Something went wrong')
						}
					})
					const { title, status, description, subjectId, authorId } = fields
					const payload = {
						title,
						subjectId,
						authorId,
						description,
						isPublished: status === 'Draft' ? false : true,
						icon: `/uploads/${files.icon.newFilename}`,
					}

					const course = new Course(payload)
					await course
						.save()
						.then((data: any) => {
							return res.status(200).send(data)
						})
						.catch((err: any) => {
							console.error(err)
							return res.status(500).send(err)
						})
				} catch (error) {
					console.error('error', error)
					return res.status(500).send(error)
				}
			})
			.catch((err) => {
				console.error('err', err)
			})
	}

	if (req.method === 'GET') {
		try {
			if (conn) {
				const { search, page, rowsPerPage } = req.query
				const pageNumber = page ? +page : 1
				const pageSize = rowsPerPage ? +rowsPerPage : 25
				const filter = search ? { title: { $regex: new RegExp(search as string, 'i') } } : {}
				const courses = await Course.find(filter)
					.populate('subjectId', 'title')
					.populate('authorId', ['firstName', 'lastName'])
					.populate('modules')
					.skip((pageNumber - 1) * pageSize)
					.limit(pageSize)
					.lean()
					.exec()
				const payload = {
					data: courses,
					page: 1,
					limit: 25,
					totalCount: courses.length,
				}
				return res.status(200).send(payload)
			}
		} catch (error) {
			console.error('error', error)
			throw new Error('Something went wrong')
		}
	}

	if (req.method === 'PATCH') {
		const form = formidable({ multiples: true })
		const formData = new Promise((resolve, reject) => {
			form.parse(req, async (err, fields, files) => {
				if (err) {
					reject('error')
				}
				resolve({ fields, files })
			})
		})
		await formData
			.then(async (data) => {
				const { fields, files } = data as any
				try {
					if (files.icon) {
						const filePath = path.join(process.cwd(), 'public', 'uploads', files.icon.newFilename)
						fs.rename(files.icon.filepath, filePath, (err) => {
							if (err) {
								throw new Error('Something went wrong')
							}
						})
					}
					const { title, status, description, subjectId, authorId, courseId, icon } = fields
					const payload = {
						title,
						subjectId,
						authorId,
						description,
						isPublished: status === 'Draft' ? false : true,
						icon: !files.icon && icon ? icon : `/uploads/${files.icon.newFilename}`,
					}

					const course = await Course.findById(courseId)
					if (course) {
						course.title = title
						course.isPublished = payload.isPublished
						course.description = description
						course.subjectId = subjectId
						course.authorId = authorId
						course.icon = payload.icon
						await course
							.save()
							.then((data: any) => {
								return res.status(200).send(data)
							})
							.catch((err: any) => {
								console.error(err)
								return res.status(500).send(err)
							})
					} else {
						return res.status(500).send('Not found')
					}
				} catch (error) {
					console.error('error', error)
					return res.status(500).send(error)
				}
			})
			.catch((err) => {
				console.error('err', err)
			})
	}
}
