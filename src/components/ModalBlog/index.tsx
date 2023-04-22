import { AiOutlineCloseCircle } from 'react-icons/ai'
import Title from '../Title';
import { IBlog } from '../../pages/ListBlog';
import { useNavigate } from 'react-router-dom';
import { HiPencilAlt } from 'react-icons/hi';
import { child, ref, remove } from 'firebase/database';
import { database } from '../../firebase';
import { notification } from 'antd';
import { useAppDispatch } from '../../store/hooks';
import { removeBlog } from '../../store/blogs.slice';
import { useCallback } from 'react';

interface IProps {
    onToggle: () => void;
    blog: IBlog;
}

function ModalBlog({ onToggle, blog }: IProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/edit-blog', { state: blog })
    }
    const dbRef = ref(database);

    const handleRemoveBlog = useCallback(() => {
        try {
            const uniqueId = blog.id
            remove(child(dbRef, 'blogs/' + uniqueId));
            dispatch(removeBlog(uniqueId))
            notification.success({
                message: 'Success',
                description: 'You have successfully removed blog!',
                duration: 1.5,
                key: '1',
            });
            onToggle()
        } catch (error) {
            notification.error({
                message: 'Failed',
                description: 'You have failed removed blog!',
                duration: 1.5,
                key: '1',
            });
        }
    }, [blog.id, dbRef, dispatch])
    return (
        <>
            <div className='fixed top-0 right-0 left-0 bottom-0 z-50 bg-black bg-opacity-50 cursor-pointer'></div>
            <div className='bg-[#252525] overflow-scroll z-50 rounded-none sm:rounded-3xl  sm:max-w-[680px] w-full sm:max-h-[600px] h-full fixed py-8 px-5 left-[50%] -translate-x-[50%] sm:top-[50%] sm:-translate-y-[50%] top-0 -translate-y-0'>
                <Title title={'post'} titleActive={'details'} subTitle={''} />
                <div className='mt-[30px]'>
                    <h1 className='text-my-yellow font-bold text-2xl duration-200 cursor-pointer'>{blog.title} 🌟</h1>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }}>

                    </div>
                    <div className='flex flex-col items-center sm:flex-row gap-[30px] mt-[30px]'>
                        <button onClick={handleRedirect} className='flex flex-row items-center gap-2 max-w-[230px] text-center uppercase text-white px-[30px] py-[10px] border rounded-md border-my-yellow hover:bg-my-yellow duration-200'>
                            Edit <HiPencilAlt color='white' />
                        </button>
                        <button onClick={handleRemoveBlog} className='max-w-[230px] text-center uppercase text-white px-[30px] py-[10px] border rounded-md border-my-yellow hover:bg-my-yellow duration-200'>
                            Remove
                        </button>
                    </div>
                </div>
                <AiOutlineCloseCircle size={36} color='white' className='cursor-pointer top-[10px] right-[20px] sm:top-5 fixed sm:right-[20px] hover:scale-100 scale-95 duration-100' onClick={onToggle} />
            </div>
        </>
    )
}

export default ModalBlog