import img from '../public/img_forest.jpg';
import Image from 'next/image';
import { PostData as Props } from './Posts';
import Link from 'next/link';

const publicFolder = "http://localhost:4000/images/";

const Post: React.FC<Props> = (props) => {
    return (
        <Link href={`/posts/${props._id}`} passHref>
            <div className="w-80 rounded-md bg-gray-50 shadow-lg 
        flex flex-col gap-2 p-3 h-96">
                {props.photo !== '' ?
                    <Image src={publicFolder.concat(props.photo)} className='object-cover' alt={props.title} height={200} width={200} /> :
                    <Image src={img} className='object-cover' alt="img" />}
                <span className='text-gray-500 text-center'>3 minutes ago</span>
                <h3 className='font-semibold text-center'>{props.title}</h3>
                <p> {props.content}</p>
            </div>
        </Link>
    );
}

export default Post;