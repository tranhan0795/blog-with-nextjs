
const Write: React.FC = () => {
    return (
        <div className="flex justify-center p-5">
            <form action="" className="flex flex-col p-5 gap-3 w-full lg:w-[900px] border 
            border-gray-400 rounded-lg shadow-2xl">
                <label htmlFor="pickImg"> Pick an image for your blog: <input type="file" name="" id="pickImg" /></label>
                <input type="text" name="" placeholder="Title " className="" />
                <textarea name="" className="h-[500px] " placeholder="Type in here"></textarea>
                <button className="text-white bg-blue-700 leading-10 w-40 border border-blue-700 rounded-full">Submit</button>
            </form>
        </div>
    )
}

export default Write;