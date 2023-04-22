import { useCallback, useState } from 'react';
import Quill from '../../components/Editor/ReactQuill';
import Title from '../../components/Title';
import { AiFillEye } from 'react-icons/ai';
import { ref, child, set } from "firebase/database";
import { database } from '../../firebase';
import { notification } from 'antd';
import { IBlog } from '../ListBlog';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { selectBlogs, updateBlog } from '../../store/blogs.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IoIosListBox } from 'react-icons/io';

const EditBlog = () => {
    const location = useLocation();
    const blog: IBlog = location.state;
    const dispatch = useAppDispatch();
    const dbRef = ref(database);
    const navigate = useNavigate()
    const [body, setBody] = useState(blog.content);
    const [title, setTitle] = useState(blog.title);
    const [description, setDescription] = useState(blog.description);
    const [thumbnail, setThumbnail] = useState(blog.thumbnail);
    const [preview, setPreview] = useState(false);
    const handleSubmit = useCallback(() => {
        try {
            const uniqueId = blog.id
            const updatedBlog = { title, content: body, thumbnail, description, id: uniqueId }
            set(child(dbRef, 'blogs/' + uniqueId), updatedBlog);
            dispatch(updateBlog(updatedBlog))
            notification.success({
                message: 'Success',
                description: 'You have successfully updated blog!',
                duration: 1.5,
                key: '1',
            });
            navigate('/list-blog')
        } catch (error) {
            notification.error({
                message: 'Failed',
                description: 'You have failed updated blog!',
                duration: 1.5,
                key: '1',
            });
        }

    }, [blog.id, body, dbRef, description, dispatch, navigate, thumbnail, title])
    const handlePreview = () => {
        setPreview(!preview)
    }

    return (
        <div className='container'>
            <div className='py-[50px]'>
                <Title title={'Edit'} titleActive={'Blog'} subTitle={'Post'} />
                <div className='flex flex-col items-center sm:flex-row gap-[30px] mt-[30px]'>
                    <Link to={'/list-blog'} className='flex flex-row items-center gap-2 max-w-[230px] text-center uppercase text-white px-[30px] py-[10px] border rounded-md border-my-yellow hover:bg-my-yellow duration-200'>
                        List Blog <IoIosListBox color='white' />
                    </Link>
                </div>
                <div className='flex flex-col mymd:flex-row mt-[100px] gap-[30px]'>
                    <div className={`${preview ? 'mymd:w-[50%]' : 'w-full'} flex flex-col gap-[20px] mymd:order-1 order-2`}>

                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='input-form' placeholder='Title blog' />
                        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className='input-form' placeholder='Description blog' />
                        <Quill body={body} setBody={setBody} setThumbnail={setThumbnail} />
                        <div className='flex flex-col items-center sm:flex-row gap-[30px]'>
                            <button onClick={handlePreview} className='flex flex-row items-center gap-2 max-w-[230px] text-center uppercase text-white px-[30px] py-[10px] border rounded-md border-my-yellow hover:bg-my-yellow duration-200'>
                                Preview <AiFillEye color='white' />
                            </button>
                            <button onClick={handleSubmit} className='max-w-[230px] text-center uppercase text-white px-[30px] py-[10px] border rounded-md border-my-yellow hover:bg-my-yellow duration-200'>
                                Update
                            </button>
                        </div>
                    </div>
                    {
                        preview && (
                            <div className='bg-[#252525] mymd:w-[50%] w-full py-[16px] px-[16px] mymd:order-2 order-1'>
                                <div dangerouslySetInnerHTML={{ __html: body }}>

                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default EditBlog