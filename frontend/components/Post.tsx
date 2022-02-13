import img from '../public/img_forest.jpg';
import Image from 'next/image';
import { PostData as Props } from './Posts';

const Post: React.FC<Props> = (props) => {
    return (
        <div className="w-80 rounded-md bg-gray-50 shadow-lg 
        flex flex-col gap-2 p-3 h-96">
            {props.photo ?
                <Image src={props.photo} className='object-cover' alt={props.title} /> :
                <Image src={img} className='object-cover' alt="img" />}
            <span className='text-gray-500 text-center'>3 minutes ago</span>
            <h3 className='font-semibold text-center'>{props.title}</h3>
            <p> {props.desc}</p>
        </div>
    );
}

export default Post;