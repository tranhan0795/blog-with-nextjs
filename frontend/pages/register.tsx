import Router from "next/router";
import { FormEvent, useState } from "react";

const Register: React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [CFPassword, setCFPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [isSending, setSending] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== CFPassword) throw "Check your password";

        setSending(true);
        try {
            const res = await fetch('http://localhost:4000/api/auth/register', {
                method: "POST",
                body: JSON.stringify({ username, password, email }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!res.ok) {
                const error = await res.json()
                throw error
            }

            Router.push('/login');

        } catch (e) {
            setError(e as string);
            setSending(false);
        }

    }

    return (
        <div>
            <div className="flex justify-center p-5">
                <form className="flex flex-col p-5 gap-5 w-[600px] rounded-lg shadow-2xl" onSubmit={handleSubmit}>
                    <h2 className="text-3xl text-center">Register</h2>
                    <label htmlFor="username" className="font-bold">Username: </label>
                    <input type="text" required id="username" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} minLength={6} maxLength={20} />

                    <label htmlFor="email" className="font-bold">Email: </label>
                    <input type="email" required id="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} minLength={6} maxLength={20} />

                    <label htmlFor="password" className="font-bold">Password: </label>
                    <input type="password" required id="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} minLength={6} maxLength={20} />

                    <label htmlFor="CFpassword" className="font-bold">Confirm new password: </label>
                    <input type="password" required id="CFpassword" placeholder="confirm new password" value={CFPassword} onChange={e => setCFPassword(e.target.value)} minLength={6} maxLength={20} />

                    <button type="submit" className="text-white bg-blue-700 leading-8 w-40 border border-blue-700 rounded-full"
                        disabled={isSending} >Register</button>
                    {error !== "" ? <span className="text-red-600"></span> : ''}
                </form>
            </div>
        </div>
    )
}

export default Register;