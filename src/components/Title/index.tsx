import React, { useEffect } from 'react'

function Title({ title, titleActive, subTitle }: { title: string, titleActive: string, subTitle: string }) {

    return (
        <article className='text-center relative'>
            <h1 className='relative z-1 text-white uppercase md:text-5xl text-4xl font-extrabold'>{title} <span className='text-my-yellow'>{titleActive}</span></h1>
            <span className='-z-10 absolute text-[#222222] md:text-8xl text-6xl uppercase font-extrabold top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]'>{subTitle}</span>
        </article>
    )
}

export default Title