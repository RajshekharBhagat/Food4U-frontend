import { Link } from 'react-router-dom'
import MobileNav from './MobileNav'
import MainNav from './MainNav'

export default function Header() {
  return (
    <div className='border-b-2 border-b-red-500 py-4 bg-red-50'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-3xl font-bold tracking-tight text-red-500'>
            Food4u.com
        </Link>
        <div className='md:hidden'>
          <MobileNav/>
        </div>
        <div className='hidden md:block'>
          <MainNav/>
        </div>
      </div>
    </div>
  )
}
