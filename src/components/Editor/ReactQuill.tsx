import { useEffect, useState, useRef, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import 'quill/dist/quill.core.css'; // Import Quill core styles
import 'quill/dist/quill.snow.css'; // Import Quill snow theme styles
import 'quill/dist/quill.bubble.css'; // Import Quill bubble theme styles

import { checkImage, imageUpload } from '../../utils/ImageUpload';
interface IProps {
    setBody: (value: string) => void,
    setThumbnail: (value: string) => void,
    body: string,
}
const Quill = ({ setBody, setThumbnail, body }: IProps) => {
    const [thumb, setThumb] = useState('')
    const quillRef = useRef<ReactQuill>(null)
    const modules = {
        toolbar: { container }
    }
    const handleChange = (e: string) => {
        setBody(e);
    }
    const handleChangeImage = useCallback(() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.click()
        input.onchange = async () => {
            const files = input.files
            if (!files) return;
            const file = files[0]
            const check = checkImage(file)
            if (check) return;

            const photo = await imageUpload(file)
            setThumbnail(photo.url);
            setThumb(photo.url);

            const quill = quillRef.current;
            const range = quill?.getEditor().getSelection()?.index
            if (range !== undefined) {
                quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`)
            }
        }
    }, [])
    useEffect(() => {
        const quill = quillRef.current
        if (!quill) return;
        const toolbar = quill.getEditor().getModule('toolbar');
        toolbar.addHandler('image', handleChangeImage)
    }, [thumb])

    return (
        <div>
            <ReactQuill value={body} className='text-white' theme="snow" ref={quillRef} onChange={handleChange} modules={modules} />
        </div>
    )
}

const container = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean', 'link', 'image', 'video']
]
export default Quill;