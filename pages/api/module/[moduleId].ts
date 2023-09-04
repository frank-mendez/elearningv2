import dbConnect from '@/config/dbConnect'
import Content from '@/models/content'
import Module from '@/models/module'
import Subject from '@/models/subject'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const conn = await dbConnect()
	if (req.method === 'GET') {
		const { moduleId } = req.query
		try {
			if (conn) {
				const moduleData = await Module.findById(moduleId).exec()
				if (moduleData) {
					return res.send(moduleData)
				} else {
					throw new Error('Module not found')
				}
			}
		} catch (error) {
			console.error('error', error)
			return res.status(404).send('User not found')
		}
	}

	if (req.method === 'PATCH') {
		const { moduleId } = req.query
		const { title, status, duration, courseId, authorId, content } = req.body
		try {
			if (conn) {
				const moduleData = await Module.findById(moduleId).exec()
				if (moduleData) {
					moduleData.title = title
					moduleData.duration = duration
					moduleData.courseId = courseId
					moduleData.authorId = authorId
					moduleData.isPublished = status === 'Published' ? true : false
					await moduleData.save()

					if (content) {
						const contentData = await Content.findOne({ moduleId }).exec()
						if (contentData) {
							contentData.content = content
							contentData.type = 'module'
							contentData.isPublished = status === 'Published' ? true : false
							contentData.moduleId = moduleId
							contentData.authorId = authorId
							await contentData
								.save()
								.then((data: any) => {
									return res.status(200).send(data)
								})
								.catch((err: any) => {
									console.error(err)
									return res.status(401).send(err)
								})
						} else {
							const contentPayload = {
								content,
								type: 'module',
								status,
								moduleId,
								authorId,
							}
							const newContent = new Content(contentPayload)
							await newContent
								.save()
								.then((data: any) => {
									return res.status(200).send(data)
								})
								.catch((err: any) => {
									console.error(err)
									return res.status(401).send(err)
								})
						}
					}

					return res.status(200)
				} else {
					throw new Error('Module not found')
				}
			}
		} catch (error) {
			console.error('error', error)
			return res.status(404).send('Module not found')
		}
	}

	if (req.method === 'DELETE') {
		const { moduleId } = req.query
		try {
			if (conn) {
				const moduleData = await Module.findByIdAndRemove(moduleId)
				if (moduleData) {
					return res.status(200).send(moduleData)
				} else {
					throw new Error('Module not found')
				}
			}
		} catch (error) {
			console.error('error', error)
			return res.status(404).send('User not found')
		}
	}
}
