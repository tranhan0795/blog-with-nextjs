import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className='fixed top-0 bg-black text-white flex justify-between items-center w-full h-12'>
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
                    <Link href="/blog">
                        <a className='hover:text-gray-300'>Blog Post</a>
                    </Link>
                </li>
            </ul>
            <div className='flex gap-5 pr-5'>
                <div>image</div>
                <div>search</div>
            </div>
        </nav>
    )
}

export default Navbar;