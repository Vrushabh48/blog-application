import React from 'react';
import { Link } from 'react-router-dom';

const Blogcard = (props) => {
    let blogdata = props.blogdata;
    const apiURL = 'http://localhost:3000/'
    return (
        <div className='bg-white shadow-md overflow-hidden rounded-xl'>
            <Link to={`/blog/${blogdata.id}`}>
            <div className="flex flex-col w-full">
                
                <div className='p-2'>
                    <h5 className='mt-1 text-left'>{blogdata.title}</h5>
                    <p className='flex justify-start items-center opacity-70'>

                        <span className='text-sm text-left ml-2'>{blogdata.category}</span>
                    </p>
                </div>
            </div>
            </Link>
        </div>
    );
}

export default Blogcard;