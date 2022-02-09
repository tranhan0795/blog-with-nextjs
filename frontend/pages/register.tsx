const Register: React.FC = () => {

    return (
        <div>
            <div className="flex justify-center p-5">
                <form action="" className="flex flex-col p-5 gap-5 w-[600px] border 
            border-gray-400 rounded-lg shadow-2xl">
                    <h2 className="text-3xl text-center">Register</h2>
                    <label htmlFor="username" className="font-bold">Username: </label>
                    <input type="text" name="username" id="username" placeholder="username" />
                    <label htmlFor="password" className="font-bold">Password: </label>
                    <input type="password" name="password" id="password" placeholder="password" />
                    <label htmlFor="CFpassword" className="font-bold">Confirm new password: </label>
                    <input type="password" name="CFpassword" id="CFpassword" placeholder="confirm new password" />
                    <button type="submit" className="text-white bg-blue-700 leading-8 w-40 border border-blue-700 rounded-full">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register;