const Setting: React.FC = () => {
    return (
        <div className="flex justify-center p-3 ">
            <form action="" className="flex flex-col p-5 gap-5 w-full lg:w-[720px] border 
            border-gray-400 rounded-lg shadow-2xl">
                <label htmlFor="pickImg" className="font-bold"> Pick an image for your avatar: <input type="file" name="" id="pickImg" /></label>
                <label htmlFor="username" className="font-bold">New username: </label>
                <input type="text" name="username" id="username" placeholder="user name" />
                <label htmlFor="password" className="font-bold">New password: </label>
                <input type="password" name="password" id="password" placeholder="password" />
                <label htmlFor="CFpassword" className="font-bold">Confirm new password: </label>
                <input type="password" name="CFpassword" id="CFpassword" placeholder="confirm new password" />
                <button type="submit" className="text-white bg-blue-700 leading-8 w-40 border border-blue-700 rounded-full">Update</button>
            </form>
        </div>
    )
}

export default Setting;