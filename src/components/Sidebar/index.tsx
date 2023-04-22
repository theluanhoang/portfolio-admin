import React from 'react'
import { FaHome, FaUserAlt, FaShoppingBag } from 'react-icons/fa'
import { HiMailOpen } from 'react-icons/hi'
import { GiAchievement } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { HiPencilAlt } from 'react-icons/hi'
import ESidebar from '../../interfaces/ESidebar'

function Sidebar() {
    const [currentPage, setCurrentPage] = React.useState('/');

    return (
        <>
            <li className={`fixed z-50 top-[30px] right-[30px] sidebar-item ${currentPage === ESidebar.CREATEBLOG ? 'sidebar-item--active' : ''} `} onClick={() => setCurrentPage(ESidebar.CREATEBLOG)}>
                <Link to='/create-blog' className={`sidebar-item ${currentPage === ESidebar.CREATEBLOG ? 'sidebar-item--active' : ''}`}>
                    <HiPencilAlt size={20} color='#fff' />
                </Link>
            </li>
            <div className='fixed z-50 mymd:top-[50%] mymd:-translate-y-[50%] mymd:right-[30px] mymd:translate-x-[0] bottom-[20px] right-[50%] translate-x-[50%]'>
                <div className='flex flex-row mymd:flex-col gap-[20px] '>
                    <Link to={ESidebar.HOME} className={`sidebar-item ${currentPage === ESidebar.HOME ? 'sidebar-item--active' : ''} `} onClick={() => setCurrentPage(ESidebar.HOME)}>
                        <FaHome size={20} color='#fff' />
                    </Link>
                    <Link to={ESidebar.ABOUTME} className={`sidebar-item ${currentPage === ESidebar.ABOUTME ? 'sidebar-item--active' : ''} `} onClick={() => setCurrentPage(ESidebar.ABOUTME)}>
                        <FaUserAlt size={20} color='#fff' />
                    </Link>
                    <Link to={ESidebar.PROJECT} className={`sidebar-item ${currentPage === ESidebar.PROJECT ? 'sidebar-item--active' : ''}`} onClick={() => setCurrentPage(ESidebar.PROJECT)}>
                        <FaShoppingBag size={20} color='#fff' />
                    </Link>
                    <Link to={ESidebar.CONTACT} className={`sidebar-item ${currentPage === ESidebar.CONTACT ? 'sidebar-item--active' : ''}`} onClick={() => setCurrentPage(ESidebar.CONTACT)}>
                        <HiMailOpen size={20} color='#fff' />
                    </Link>
                    <Link to={ESidebar.BLOG} className={`sidebar-item ${currentPage === ESidebar.BLOG ? 'sidebar-item--active' : ''}`} onClick={() => setCurrentPage(ESidebar.BLOG)}>
                        <GiAchievement size={20} color='#fff' />
                    </Link>

                </div>
            </div>
        </>
    )
}

export default Sidebar