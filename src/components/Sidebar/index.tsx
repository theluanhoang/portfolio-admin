import { FaUserAlt } from 'react-icons/fa'

import { Link, useNavigate } from 'react-router-dom'
import { HiPencilAlt } from 'react-icons/hi'
import { FiLogOut } from 'react-icons/fi'
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { notification } from 'antd';
interface IUserAuth {
    uid: string;
    email: string;
    apiKey: string;
}
function Sidebar() {
    const [user, setUser] = useState<IUserAuth>()
    const navigate = useNavigate();
    const logout = async () => {
        try {
            await signOut(auth);
            notification.success({
                message: 'Success',
                description: 'Logout successfully!',
                duration: 1.5,
                key: '1',
            });
            navigate('/')
        } catch (error) {
            notification.error({
                message: 'Failed',
                description: 'Logout failed!',
                duration: 1.5,
                key: '1',
            });
        }
    };
    useEffect(() => {
        const currentUser = localStorage && JSON.parse(localStorage.getItem('user') || '');
        setUser(currentUser);
    }, [navigate])
    return (
        <>
            <div className='fixed flex items-center z-50 top-[30px] right-[30px]'>
                <li className={`relative sidebar-item group hover:bg-my-yellow`}>
                    <Link to='/create-blog' className={`sidebar-item `}>
                        {
                            user?.email !== '' ? <HiPencilAlt size={20} color='#fff' /> :
                                <FaUserAlt size={20} color='#fff' />
                        }
                    </Link>
                    {
                        user?.email !== '' && (<div className='absolute group-hover:opacity-100 opacity-0 px-2 right-0 -bottom-[65px] rounded-md w-[100px] h-[50px] bg-[#2B2A2A]'>
                            <div className='flex flex-row items-center gap-2 justify-center h-full' onClick={logout}>
                                <p className='text-white font-semibold'>Logout</p> <FiLogOut size={20} color='#fff' />
                            </div>
                        </div>)
                    }
                </li>
            </div>
        </>
    )
}

export default Sidebar