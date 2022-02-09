import Post from "./Post";

const Posts: React.FC = () => {
    return (
        <div className=" flex flex-wrap gap-x-5 gap-y-10 w-full lg:w-3/4 px-5">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    );
}

export default Posts;
