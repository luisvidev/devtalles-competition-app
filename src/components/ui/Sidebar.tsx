import * as React from "react"
import Link from 'next/link';

export const Sidebar = () => {

    return(
        <div className='h-screen px-4 pt-8 pb-4 bg-secondary-foreground flex justify-between flex-col w-80'>
            <div className="mb-4">
        <Link href="/">
          <a className="block py-2 px-4 rounded hover:bg-gray-700">Home</a>
        </Link>
      </div>
      <div>
        <Link href="/create-competition">
          <a className="block py-2 px-4 rounded hover:bg-gray-700">Create Competición</a>
        </Link>
      </div>
        </div>
    )
}
