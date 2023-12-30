import LeftPost from "../../../components/posts/leftPost/LeftPost";
import PostContent from "../../../components/posts/postContent/PostContent";
import CenterPost from "../../../components/posts/centerPost/CenterPost";
import PostsPagination from "../../../components/pagination/postsPagination/PostsPagination";

import "../page.css";
const PostPage = () => {
  return (
    <div className="main__container post">
      <div className="row">
        <div className="col c-8 row">
          <div className="col c-2"></div>

          <div className="col c-10 post__page">
            <h1>
              Ronaldo tỏ thái độ lạ sau khi trượt top 10 cầu thủ hay nhất thế
              giới
            </h1>
            <div className="post__page--info">
              <p className="posy__page--info-date">
                Thứ bảy, 30/12/2023 - 09:30
              </p>
            </div>

            <div className="post__page--desc">
              <i>
                (Dân trí) - Cristiano Ronaldo đã bày tỏ thái độ sau khi không có
                tên trong danh sách 10 cầu thủ hay nhất thế giới năm 2023 do
                Liên đoàn Thống kê và Lịch sử Bóng đá Thế giới (IFFHS) bình
                chọn.
              </i>
            </div>

            <div className="post__page--content">
              <PostContent />
            </div>
          </div>

          <div className="post__page--relate col c-12">
            <p className="post__page--relate-title">Bài viết liên quan</p>
            <CenterPost />
            <PostsPagination />
          </div>
        </div>
        <div className="col c-4">
          <LeftPost />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
