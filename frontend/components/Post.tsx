import img from '../public/img_forest.jpg';
import Image from 'next/image';


const Post: React.FC = () => {
    return (
        <div className="w-80 rounded-md bg-gray-50 hover:shadow-lg 
        flex flex-col gap-2 p-1r">
            <Image src={img}  className='object-cover' alt="img" />
            <span className='text-gray-500 text-center'>3 minutes ago</span>
            <h3 className='font-semibold text-center'>Hello</h3>
            <p>
                text text text text text text text text text text text text text text
                text text text text text text text text text text text text text text
            </p>
        </div>
    );
}

export default Post;