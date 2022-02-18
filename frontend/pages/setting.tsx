import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import defaultAvatar from "../public/profileIcon_snoo3302400e-910b-4b67-8d4e-97ceb9e5b117-headshot.png";
import { useUserContext } from "../context/UserContext";
import Router from "next/router";
import { json } from "stream/consumers";

const Setting: React.FC = () => {

    const [password, setPassword] = useState<string>('');
    const [CFPassword, setCFPassword] = useState<string>('');
    const [file, setFile] = useState<null | File>(null);
    const [imgUrl, setImgUrl] = useState<string | StaticImageData>(defaultAvatar);
    const { user } = useUserContext();
    const [error, setError] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (user.username === '') {
            Router.push("/");
        }
        if (user.profilePic !== '') {
            setImgUrl(user.profilePic);
        }
    }, [user])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        const newUser = {
            password,
            profilePic: ''
        }

        if (file !== null) {
            if (file.size > 2097152) {
                setError('you photo is too big');
                return;
            }

            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);

            try {
                await fetch('http://localhost:4000/api/upload', {
                    method: 'POST',
                    body: data
                })
                newUser.profilePic = fileName;
            } catch (e) {
                setError(e as string);
                return;
            }
        }

        try {
            const res = await fetch('http://localhost:4000/api/users/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            console.log(newUser)
            if (!res.ok) {
                const error = await res.json()
                throw error;
            }

            setMessage("Updated!!!");

        } catch (e) {
            if (typeof e === "string") {
                setError(e);
            } else if (e instanceof Error) {
                setError(e.message);
            }
        }

    }

    const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            setFile(e.target.files[0])
            setImgUrl(URL.createObjectURL(e.target.files[0]));
        }
    }

    const handleDelete = (e: React.MouseEvent) => {
        if (confirm('Are you sure you want to delete your account???')) {
            try {
                fetch(`http://localhost:4000/user/delete/`, {
                    method: "DELETE",
                    body: JSON.stringify({ username: user.username })
                })

            } catch (e) {
                setError(e as string);
            }
        }
    }

    return (
        <div className="flex justify-center p-3 ">
            <form action="" className="flex flex-col p-5 gap-5 w-full lg:w-[720px] border 
            border-gray-400 rounded-lg shadow-2xl" onSubmit={e => handleSubmit(e)}>
                <h2>Hi, {user.username}</h2>
                <div className="flex justify-between">
                    <h3>Update your account</h3>
                    <button className="text-white bg-red-700 p-3" onClick={e => handleDelete(e)}>Delete your account</button>
                </div>

                <label htmlFor="pickImg" className="font-bold"> Pick an image for your avatar:
                    <input type="file" name="" id="pickImg" onChange={e => handleSetFile(e)} accept="image/png, image/jpeg" />
                </label>
                <div className="">
                    <Image src={imgUrl} alt="avatar" className="object-cover" width={80} height={80} />
                </div>


                <label htmlFor="password" className="font-bold">New password: </label>
                <input type="password" name="password" id="password" placeholder="password"
                    value={password} onChange={e => setPassword(e.target.value)} />

                <label htmlFor="CFpassword" className="font-bold">Confirm new password: </label>

                <input type="password" name="CFpassword" id="CFpassword" placeholder="confirm new password"
                    value={CFPassword} onChange={e => setCFPassword(e.target.value)} />

                <button type="submit" className="text-white bg-blue-700 leading-8 w-40 border border-blue-700 rounded-full">Update</button>

                {error !== '' ? <span>{error}</span> : ''}
                {message !== '' ? <span>{message}</span> : ''}

            </form>
        </div>
    )
}

export default Setting;