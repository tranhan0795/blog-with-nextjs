import Post from "./Post";
import useSWR from 'swr';
import { FetcherResponse } from "swr/dist/types";

export interface PostData {
    _id: string,
    title: string,
    username: string,
    photo?: string,
    desc?: string,
    category?: [string]
}

const fetcher = (url: string): FetcherResponse<[PostData]> => {
    return fetch(url).then(r => r.json());
}

const Posts: React.FC = () => {

    const { data, error } = useSWR<[PostData]>('http://localhost:4000/api/posts', fetcher);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>

    return (
        <div className=" flex flex-wrap gap-x-5 gap-y-10 w-full lg:w-3/4 px-5">
            {data.map(post => {
                return (
                    <Post {...post} key={post._id} />
                )
            })}
        </div>
    );
}

export default Posts;
