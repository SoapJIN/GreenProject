import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { ReviewDispatchContext } from "./Review";

const ReviewItem = ({ id, author, content, rating, created_date }) => {
  const { onRemove, onEdit } = useContext(ReviewDispatchContext);

  useEffect(() => {
    console.log(`${id}번 리뷰 렌더`);
  });

  const [isEditNow, setIsEditNow] = useState(false);
  const toggleIsEditNow = () => setIsEditNow(!isEditNow);

  const [localContent, setLoclContent] = useState(content);
  const localContentRef = useRef(null);

  const handleClickDelete = () => {
    if (window.confirm(`${id}번 째 리뷰를 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleClickEdit = () => {
    if (localContent.length < 1) {
      localContentRef.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 리뷰를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEditNow();
    }
  };

  const handleQuitEdit = () => {
    setLoclContent(content);
    toggleIsEditNow();
  };

  return (
    <div className="DiaryItem_container">
      <div className="info">
        <span className="author_info">
          | 작성자 : {author} | 별점 : {rating} |
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>

      <div className="content">
        {isEditNow ? (
          <textarea
            ref={localContentRef}
            value={localContent}
            onChange={(e) => setLoclContent(e.target.value)}
          />
        ) : (
          content
        )}
      </div>
      {isEditNow ? (
        <div>
          <button onClick={handleQuitEdit}>수정 취소하기</button>
          <button onClick={handleClickEdit}>저장하기</button>
        </div>
      ) : (
        <div>
          <button onClick={handleClickDelete}>삭제하기</button>
          <button onClick={toggleIsEditNow}>수정하기</button>
        </div>
      )}
    </div>
  );
};

export default memo(ReviewItem);
