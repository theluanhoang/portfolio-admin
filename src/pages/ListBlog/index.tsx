/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { ref, child, get } from "firebase/database";
import { database } from '../../firebase';
import { notification } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectBlogs, setBlogs } from '../../store/blogs.slice';
import AOS from '../../utils/aos';
import ModalBlog from '../../components/ModalBlog';
import PaginatedItems from '../../components/PaginatedItems';
import noDataFound from '../../assets/image/no_data_found.png'
import { HiPencilAlt } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export interface IBlog {
    content: string;
    title: string;
    thumbnail: string;
    description: string;
    id: string;
}
function ListBlog() {
    const dispatch = useAppDispatch();
    const blogs: IBlog[] = useAppSelector(selectBlogs).blogs.listBlog;
    const [isShow, setIsShow] = useState(false);
    const [currentBlog, setCurrentBlog] = useState<IBlog>({
        content: '',
        title: '',
        thumbnail: '',
        description: '',
        id: ''
    });
    useEffect(() => {
        AOS.init();
    }, [])
    const handleToggle = () => {
        setIsShow(!isShow);
    }
    const dbRef = ref(database)
    useEffect(() => {
        get(child(dbRef, `blogs/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const array: IBlog[] = [];
                snapshot.forEach((child) => {
                    array.push(child.val());
                })
                dispatch(setBlogs(array));
            } else {
                notification.error({
                    message: 'Failed',
                    description: 'No data available',
                    duration: 1.5,
                    key: '1',
                });
            }
        }).catch((error) => {
            console.log(error);
            notification.error({
                message: 'Error',
                description: 'Error',
                duration: 1.5,
                key: '1',
            });
        });

    }, [dbRef, dispatch])


    return (
        <div className='container'>
            <div className='py-[50px]'>
                <Title title={'My'} titleActive={'blog'} subTitle={'posts'} data-aos='fade-up' data-aos-duration='1500' />
                {blogs?.length > 0 && (<div className='flex flex-col items-center sm:flex-row gap-[30px] mt-[30px]'>
                    <Link to={'/create-blog'} className='flex flex-row items-center gap-2 max-w-[230px] text-center uppercase text-white px-[30px] py-[10px] border rounded-md border-my-yellow hover:bg-my-yellow duration-200'>
                        Create <HiPencilAlt color='white' />
                    </Link>
                </div>)}
                <div className='mt-[100px] flex items-center justify-center'>
                    {
                        blogs?.length > 0 ? (
                            <PaginatedItems type='blog' data={blogs} itemPerPage={3} handleToggle={handleToggle} setCurrentData={setCurrentBlog} />
                        ) : (
                            <figure className='mymd:w-[80%] sm-[580]:w-full w-[570px] sm-[580]:max-h-[480px] bg-white relative -mt-[50px]'>
                                <img src={noDataFound} alt="No Data Found" />
                                <div className='absolute mymd:bottom-[50px] sm-[580]:bottom-0 -bottom-[50px] left-[50%] -translate-x-[50%] flex flex-col items-center sm:flex-row gap-[30px] mt-[30px]'>
                                    <Link to={'/create-blog'} className='flex flex-row items-center gap-2 max-w-[230px] text-center uppercase text-white px-[30px] py-[10px] border rounded-md border-my-yellow hover:bg-my-yellow duration-200'>
                                        Create <HiPencilAlt color='white' />
                                    </Link>
                                </div>
                            </figure>
                        )
                    }
                </div>
            </div>
            {
                isShow && <ModalBlog onToggle={handleToggle} blog={currentBlog} />
            }
        </div>
    )
}

export default ListBlog