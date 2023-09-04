import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const ModuleContent = (props: { id: string }) => {
	const [content, setContent] = useState<string>('')

	useEffect(() => {
		axios
			.get(`${process.env.apiUrl}/content/${props.id}`)
			.then((data) => {
				const { data: contentData } = data
				setContent(contentData.content)
			})
			.catch((err) => {
				console.error('err', err)
			})
	}, [setContent, props])

	return <div>{content && <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>}</div>
}

export default ModuleContent
