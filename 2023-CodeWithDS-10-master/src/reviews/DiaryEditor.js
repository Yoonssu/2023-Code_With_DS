//git add .
import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./Diary";

const DiaryEditor = ({ onHide }) => {
  const { onCreate } = useContext(DiaryDispatchContext);

  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 5,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 1) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert("리뷰 작성이 완료되었습니다. ");
    setState({
      author: "",
      content: "",
      emotion: 5,
    });
    onHide();
  };

  return (
    <div className="DiaryEditor">
      <h1 style={{ color: "#873856" }}>리뷰 작성</h1>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          placeholder="제목을 입력해주세요."
          onChange={handleChangeState}
        />
      </div>
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>⭐️</option>
          <option value={2}>⭐️⭐️</option>
          <option value={3}>⭐️⭐️⭐️</option>
          <option value={4}>⭐️⭐️⭐️⭐️</option>
          <option value={5}>⭐️⭐️⭐️⭐️⭐️</option>
        </select>
      </div>
      <div>
        <textarea
          name="content"
          value={state.content}
          placeholder="내용을 입력해주세요."
          onChange={handleChangeState}
        />
      </div>

      <div>
        <button onClick={handleSubmit}>작성</button>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);
