import * as React from 'react';
import {Sidebar} from './Sidebar'; 

export const Layout = () => {
    return(
        <div className='h-screen flex flex-row justify-start'>
            <Sidebar/>
            <div className='bg-primary flex-1 p-4 text-white border-2 border-dashed'>
                Sorteos- DevTalles
            </div>
        </div>
    )
}
