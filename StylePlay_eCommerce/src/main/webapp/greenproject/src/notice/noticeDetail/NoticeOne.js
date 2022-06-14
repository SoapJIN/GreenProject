import axios from "axios";
import { Link } from "react-router-dom";

const NoticeOne = ({ noticeId, noticeTitle }) => {
  let url = "/notice/detail/" + noticeId;
  const boardRe = {
    method: "GET",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    url,
  };

  const click = () => {
    console.log("여기");
    axios(boardRe);
  };
  return (
    <ul key={noticeId}>
      <Link
        className="text-decoration-none link-secondary"
        to={"/notice/detail/" + noticeId}
        onClick={click}
        state={{ noticeId: noticeId }}
      >
        {noticeTitle}
      </Link>
    </ul>
  );
};

export default NoticeOne;
