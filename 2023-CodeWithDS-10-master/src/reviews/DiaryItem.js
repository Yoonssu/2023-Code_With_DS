import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./Diary";
import { useUserState } from "../UserContext";

const DiaryItem = ({ author, content, created_date, emotion, id }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit); //값을 반전

  const { user } = useUserState();

  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`리뷰를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 1) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`리뷰를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit(); //수정폼닫기
    }
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < emotion; i++) {
      stars.push(<span key={i}>⭐️</span>);
    }

    return stars;
  };

  return (
    <div className="DiaryItem">
      <div className="info_diary">
        {user.userId}
        <br />
        {renderStars()}
        <div style={{ textAlign: "right", marginRight: "40px" }}>
          <span className="date">
            {new Date(created_date).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="title">{author}</div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <div style={{ textAlign: "right" }}>
            <button onClick={handleRemove} type={"nevigate"}>
              삭제
            </button>
            <button onClick={toggleIsEdit}>수정</button>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
