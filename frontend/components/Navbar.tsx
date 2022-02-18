import Link from 'next/link';
import { useUserContext } from '../context/UserContext';
import { emptyUser } from '../context/UserContext';

const Navbar: React.FC = () => {
    const { user, setUser } = useUserContext();

    const handleLogout = async () => {

        try {
            const res = await fetch('http://localhost:4000/api/post/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user.username)
            })
            if (!res.ok) {
                const error = await res.json()
                throw error;
            }

        } catch (e) {
            console.log(e);
        }

        setUser(emptyUser);
    }

    return (
        <nav className='fixed top-0 bg-black text-white flex justify-between items-center w-full h-12 z-10'>
            <ul className='flex pl-5 gap-5 font-semibold'>
                <li>
                    <Link href="/">
                        <a className='hover:text-gray-300'>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="https://github.com/tranhan0795">
                        <a className='hover:text-gray-300'>Contact Me</a>
                    </Link>
                </li>
                <li>
                    <Link href="/newpost">
                        <a className='hover:text-gray-300'>New post</a>
                    </Link>
                </li>
            </ul>
            <ul className='flex gap-5 pr-5'>
                {user.username !== "" ? <>
                    <li>
                        <Link href="/setting">
                            <a className='hover:text-gray-300'>Setting</a>
                        </Link>
                    </li>
                    <li>
                        <button className='text-white h-full px-4 rounded-sm bg-blue-800' onClick={handleLogout}>Logout</button>
                    </li>
                </> : <>
                    <li>
                        <Link href="/login">
                            <a className='hover:text-gray-300'>Login</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/register">
                            <a className='hover:text-gray-300'>Register</a>
                        </Link>
                    </li>
                </>
                }
            </ul>
        </nav>
    )
}

export default Navbar;