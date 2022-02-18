import { FormEvent, useState } from "react";
import { useUserContext } from "../context/UserContext";
import Router from "next/router";
import defaultImg from "../public/img_forest.jpg";
import Image from "next/image";



const Write: React.FC = () => {

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('')
    const [file, setFile] = useState<null | File>(null);
    const [error, setError] = useState<string>('');
    const { user } = useUserContext();
    const [imgUrl, setImgUrl] = useState<string | StaticImageData>(defaultImg);
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        const post = {
            username: user.username,
            title,
            content,
            photo: ''
        }

        if (file !== null) {
            if (file.size > 1048576) {
                setError('you photo is too big');
                return;
            }

            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);

            try {
                const res = await fetch('http://localhost:4000/photo/upload', {
                    method: 'POST',
                    body: data
                })

                if (!res.ok) {
                    const error = await res.json()
                    throw error;
                }

                post.photo = fileName;
            } catch (e ) {
                if (typeof e === "string") {
                   setError(e);
                } else if (e instanceof Error) {
                    setError(e.message);
                }
                return;
            }
        }

        try {
            const res = await fetch('http://localhost:4000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(post)
            })
            console.log(post);
            if (!res.ok) {
                const error = await res.json()
                throw error;
            }
            const id = res.json()
                Router.push(`/posts/${id}`)
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

    return (
        <div className="flex justify-center p-5">
            <form action="" className="flex flex-col p-5 gap-3 w-full lg:w-[900px] 
             rounded-lg shadow-2xl" onSubmit={handleSubmit}>



                <label htmlFor="pickImg"> Pick an image for your blog
                    <input type="file" id="pickImg" onChange={e => handleSetFile(e)} accept="image/png, image/jpeg" />
                </label>

                <Image src={imgUrl} alt="image" className="object-cover " width={900} height={500} />

                <input type="text" placeholder="Title " className="" required
                    value={title} onChange={e => setTitle(e.target.value)} />

                <textarea name="" className="h-[500px] " placeholder="Type in here" required
                    value={content} onChange={e => setContent(e.target.value)}></textarea>

                <button className="text-white bg-blue-700 leading-10 w-40 border border-blue-700 rounded-full">Submit</button>

                {error !== '' ? <span className="text-red-800">{error}</span> : ''}
                {message !== '' ? <span>{message}</span> : ''}
            </form>
        </div>
    )
}

export default Write;