import Image from "next/image";
import img from "../public/profileIcon_snoo3302400e-910b-4b67-8d4e-97ceb9e5b117-headshot.png"
import Link from "next/link";

const SideBar: React.FC = () => {
    return (
        <div className="w-72 lg:w-1/5  rounded-md text-center
         flex flex-col gap-5 px-5 py-2 h-fit shadow-lg">

            <h2 className="text-center font-semibold text-lg ">About me</h2>
            <hr className="border-t border-black" />
            <Image src={img} height='210' alt="avt" />
            <p>
                text text text text text text text text text text text text text text
                text text text text text text text text text text text text text text
            </p>
            <hr className="border-t border-black" />
            <p className="font-semibold text-lg">Categories</p>
            <ul>
                <li>
                    <Link href="/">
                        <a className='hover:text-red-800'>Code</a>
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <a className='hover:text-red-800'>Music</a>
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <a className='hover:text-red-800'>Book</a>
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <a className='hover:text-red-800'>Game</a>
                    </Link>
                </li>
            </ul>
            <hr className="border-t border-black" />
            <p className="font-semibold text-lg">Contact me:</p>
            <div className="flex flex-col items-center">
                <p className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                    </svg>
                    <span>09999999</span>
                </p>
                <p className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>abc@gmail.com</span>
                </p>
                <p className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Vietnam</span>
                </p>
            </div>
            <div>
            </div>
        </div>
    );
}

export default SideBar;
