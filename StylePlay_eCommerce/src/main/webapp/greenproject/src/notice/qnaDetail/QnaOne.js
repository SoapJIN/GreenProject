import React from "react";
import { Link } from "react-router-dom";
import "../../notice/making.css";

const QnaOne = ({ qnaId, qnaTitle }) => {
  return (
    <ul key={qnaId}>
      <Link
        className="text-decoration-none link-secondary"
        id="qnaTitleLink"
        to={"/notice/qnadetail/" + qnaId}
      >
        {qnaTitle}
      </Link>
    </ul>
  );
};

export default QnaOne;
