import Link from "next/link";
import { useUserContext } from "../context/UserContext";
import { FormEvent, useState } from "react";
import Router from 'next/router';

interface User {
    username: string,
    email: string,
    profilePic: string
}

const LogIn: React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSending, setSending] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { setUser } = useUserContext();


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);
        try {
            const res = await fetch('http://localhost:4000/api/auth/login', {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!res.ok) {
                const error = await res.json()
                throw error
            }

            const data: User = await res.json();
            setUser(data);
            Router.push('/');

        } catch (e) {
            setError(e as string);
            setSending(false);
        }


    }

    return (
        <div className="flex justify-center p-5">
            <form action="" className="flex flex-col p-5 gap-5 w-[600px] border rounded-lg shadow-2xl" onSubmit={handleSubmit}>
                <h2 className="text-3xl text-center">Login</h2>
                <label htmlFor="username" className="font-bold">Username: </label>
                <input type="text" name="username" id="username" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}
                    minLength={6} maxLength={20} required/>
            
                <label htmlFor="password" className="font-bold">Password: </label>
                <input type="password" name="password" id="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}
                    minLength={6} maxLength={20} required/>
              
                <button type="submit" className={`text-white bg-blue-700 leading-8 w-40 border rounded-full ${isSending ? 'bg-blue-400' : ''} `}
                    disabled={isSending}>Login</button>
                <Link href="register"><a className="text-blue-800 "> Click here if you have no account</a></Link>
                {error !== "" ? <span className="text-red-600"></span> : ''}
            </form>
        </div>
    )
}

export default LogIn