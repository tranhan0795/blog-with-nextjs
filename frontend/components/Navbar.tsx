import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className='fixed top-0 bg-black text-white flex justify-between items-center w-full h-12 z-10'>
            <ul className='flex pl-5 gap-5 font-semibold'>
                <li>
                    <Link href="/">
                        <a className='hover:text-gray-300'>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        <a className='hover:text-gray-300'>About Us</a>
                    </Link>
                </li>
                <li>
                    <Link href="/write">
                        <a className='hover:text-gray-300'>Write</a>
                    </Link>
                </li>
            </ul>
            <ul className='flex gap-5 pr-5'>
                <li>
                    <Link href="/setting">
                        <a className='hover:text-gray-300'>Setting</a>
                    </Link>
                </li>
                <li>
                    <Link href="/login">
                        <a className='hover:text-gray-300'>Login</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;