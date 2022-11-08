import React from 'react'

function Navbar() {
    const routes = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'Test',
            path: '/test',
        },
    ]

  return (
    <div>
        <nav className='flex items-center justify-between flex-wrap bg-gray-800 p-6'>
            <div className='flex items-center flex-shrink-0 text-white mr-6'>
                <span className='font-semibold text-xl tracking-tight'>NNP for DAPPS</span>
                <ul className='flex'>
                    {routes.map((route) => (
                        <li className='ml-6'>
                            <a href={route.path} className='text-gray-300 hover:text-white'>
                                {route.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
