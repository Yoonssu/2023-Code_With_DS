import { useContext } from "react";
import DiaryItem from "./DiaryItem";
import { DiaryStateContext } from "./Diary";

const DiaryList = () => {
  const diaryList = useContext(DiaryStateContext);

  return (
    <div className="DiaryList">
      <div className="review_title">리뷰</div>
      <h4 style={{ textAlign: "right", marginRight: "50px" }}>
        {diaryList.length}개의 리뷰가 있습니다.{" "}
      </h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
