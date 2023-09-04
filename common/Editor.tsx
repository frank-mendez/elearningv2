import React, { Dispatch } from 'react'
import ReactQuill from 'react-quill'

export type EditorProps = {
	contentData: string
	setContentData: Dispatch<React.SetStateAction<string>>
}

const Editor = (props: EditorProps) => {
	const { contentData, setContentData } = props
	const modules = {
		toolbar: [
			[{ header: '1' }, { header: '2' }, { font: [] }],
			[{ size: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
			['link', 'image', 'video'],
			['clean'],
		],
		clipboard: {
			// toggle to add extra line breaks when pasting HTML:
			matchVisual: false,
		},
	}
	/*
	 * Quill editor formats
	 * See https://quilljs.com/docs/formats/
	 */
	const formats = [
		'header',
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'video',
	]

	return <ReactQuill modules={modules} formats={formats} theme='snow' value={contentData} onChange={setContentData} />
}

export default Editor
