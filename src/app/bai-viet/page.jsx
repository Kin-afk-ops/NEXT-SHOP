import "./page.css";

import TopPost from "../../components/posts/topPost/TopPost";
import CenterPost from "../../components/posts/centerPost/CenterPost";
import PostsPagination from "../../components/pagination/postsPagination/PostsPagination";
import LeftPost from "../../components/posts/leftPost/LeftPost";
import axiosInstance from "@/config";

const PostsPage = async ({ searchParams }) => {
  const currentPage = searchParams.trang;
  const resPost = await axiosInstance.get(`/post?qPage=${currentPage}`);

  const posts = await resPost.data.posts;
  const totalPages = await resPost.data.totalPage;

  const topPost = posts.slice(0, 3);
  const centerPost = posts.slice(3);

  return (
    <div className="main__container">
      <div className="row post">
        <div className="col c-8">
          <TopPost topPost={topPost} />
          <CenterPost centerPost={centerPost} />
          <PostsPagination />
        </div>

        <div className="col c-4">
          <LeftPost />
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
