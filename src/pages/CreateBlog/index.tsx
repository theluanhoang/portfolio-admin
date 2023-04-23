import { useCallback, useState } from 'react';
import Quill from '../../components/Editor/ReactQuill';
import Title from '../../components/Title';
import { AiFillEye } from 'react-icons/ai';
import { ref, child, set } from "firebase/database";
import { database } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosListBox } from 'react-icons/io';
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik';

function CreateBlog() {
    const initialValues = { title: '', description: '' };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title of blog is require.'),
        description: Yup.string().required('Description of blog is require.'),
    })
    const dbRef = ref(database);
    const navigate = useNavigate();
    const [body, setBody] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [preview, setPreview] = useState(false);
    const handleSubmit = useCallback(async (values: { title: string, description: string }, { resetForm }: { resetForm: () => void }) => {
        try {
            const uniqueId = uuidv4();
            console.log(values);

            set(child(dbRef, 'blogs/' + uniqueId), { content: body, thumbnail, id: uniqueId, description: values.description, title: values.title });
            notification.success({
                message: 'Success',
                description: 'You have successfully created blog!',
                duration: 1.5,
                key: '1',
            });
            resetForm()
            navigate('/list-blog')
        } catch (error) {
            notification.error({
                message: 'Failed',
                description: 'You have failed created blog!',
                duration: 1.5,
                key: '1',
            });
        }
    }, [body, dbRef, navigate, thumbnail])
    const handlePreview = () => {
        setPreview(!preview)
    }

    return (
        <div className='container'>
            <div className='py-[50px]'>
                <Title title={'Create'} titleActive={'Blog'} subTitle={'Post'} />
                <div className='flex flex-col items-center sm:flex-row gap-[30px] mt-[30px]'>
                    <Link to={'/list-blog'} className='flex flex-row items-center gap-2 max-w-[230px] text-center uppercase text-white px-[30px] py-[10px] border rounded-md border-my-yellow hover:bg-my-yellow duration-200'>
                        List Blog <IoIosListBox color='white' />
                    </Link>
                </div>
                <div className='flex flex-col mymd:flex-row mt-[100px] gap-[30px]'>
                    <div className={`${preview ? 'mymd:w-[50%]' : 'w-full'} flex flex-col gap-[20px] mymd:order-1 order-2`}>
                        <Formik initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                            {({ isSubmitting }) => (
                                <Form className='flex flex-col gap-[30px]'>
                                    <div className='flex flex-col w-full'>
                                        <Field type="text" className='input-form' name='title' placeholder='Title blog' />
                                        <ErrorMessage className='text-[#ff6347]' name="title" component="div" />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <Field type="text" className='input-form' name='description' placeholder='Description blog' />
                                        <ErrorMessage className='text-[#ff6347]' name="description" component="div" />
                                    </div>
                                    <Quill body={body} setBody={setBody} setThumbnail={setThumbnail} />
                                    <div className='flex flex-col items-center sm:flex-row gap-[30px]'>
                                        <div onClick={handlePreview} className='flex flex-row items-center gap-2 max-w-[230px] text-center uppercase text-white px-[30px] py-[10px] border rounded-md border-my-yellow hover:bg-my-yellow duration-200'>
                                            Preview <AiFillEye color='white' />
                                        </div>
                                        <button type="submit" disabled={isSubmitting} className='max-w-[230px] text-center uppercase text-white px-[30px] py-[10px] border rounded-md border-my-yellow hover:bg-my-yellow duration-200'>
                                            Create
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        {/* <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='input-form' placeholder='Title blog' />
                        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className='input-form' placeholder='Description blog' /> */}

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

export default CreateBlog