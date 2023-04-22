import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import blogDefault from '../../assets/image/blog_default.png'
interface IProps {
    data: any;
    itemPerPage: number;
    handleToggle: () => void;
    setCurrentData: (data: any) => void;
    type: string;
}
function PaginatedItems(props: IProps) {
    const { data, itemPerPage, handleToggle, setCurrentData, type } = props
    const [currentItems, setCurrentItems] = useState<any>([])
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = itemPerPage || 12

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, data])

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    return (
        <>
            <div>
                {
                    type === 'blog' ? (
                        <ul className='grid mylg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]'>
                            {
                                currentItems.map((blog: { description: string; thumbnail: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
                                    <div key={index} className='mylg:max-w-[390px] max-w-full rounded-lg overflow-hidden cursor-pointer group' onClick={() => {
                                        handleToggle();
                                        setCurrentData(blog);
                                    }} data-aos='fade-right' data-aos-duration='1000'>
                                        <figure className='overflow-hidden border-b-4 border-my-yellow max-h-[175px]'>
                                            <img className='group-hover:scale-125 duration-300 transition-all bg-center object-cover' src={blog.thumbnail !== '' ? blog.thumbnail : blogDefault} alt="BWD 2022" />
                                        </figure>
                                        <div className='py-[30px] h-[184px] px-[30px] bg-[#252525] flex flex-col gap-[20px]'>
                                            <h1 className='group-hover:text-my-yellow line-clamp-1 text-white font-bold text-2xl duration-200 cursor-pointer'>{blog.title}</h1>
                                            <p className='text-white line-clamp-3'>{blog.description}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </ul>
                    ) : (

                        <div className='mt-[50px] grid mymd:grid-cols-3 sm-[580]:grid-cols-2 grid-cols-1 justify-center gap-y-[40px] gap-x-[20px]'>
                            {
                                currentItems.map((project: { image: string; name: string }, index: Key) => (
                                    <div key={index} className='portifolio-content-item' data-aos='fade-right' data-aos-duration='1000'>
                                        <img src={project.image} alt={project.name} />
                                        <span className='portfolio-coating' onClick={() => {
                                            handleToggle();
                                            setCurrentData(project)
                                        }}><p className='portfolio-coating--text'>{project.name}</p></span>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="&raquo;"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="&laquo;"
                    renderOnZeroPageCount={null}
                    containerClassName='pagination'
                    pageClassName='page-num'
                    nextLinkClassName='page-num'
                    previousLinkClassName='page-num'
                    activeLinkClassName='active'
                />
            </div>

        </>
    )
}

export default PaginatedItems