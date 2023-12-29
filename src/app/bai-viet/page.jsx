import "./page.css";

import TopPost from "../../components/posts/topPost/TopPost";
import CenterPost from "../../components/posts/centerPost/CenterPost";
import PostsPagination from "../../components/pagination/postsPagination/PostsPagination";
import LeftPost from "../../components/posts/leftPost/LeftPost";

const PostsPage = () => {
  return (
    <div className="main__container">
      <div className="row post">
        <div className="col c-8">
          <TopPost />
          <CenterPost />
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
