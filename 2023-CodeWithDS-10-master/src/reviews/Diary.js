import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
  useState,
} from "react";
import "./Diary.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Headers from "../Headers/Headers";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      const created_date = new Date().getTime();

      const newItem = { ...action.data, created_date };
      newState = [newItem, ...state];
      break;
    }

    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const Diary = () => {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  /*
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    dispatch({ type: "INIT", data: initData });
  };
  

  useEffect(() => {
    getData();
  }, []);
  */

  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      dataId.current = parseInt(diaryList[0].id) + 1;

      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });

    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  const [showEditor, setShowEditor] = useState(false);
  const [editorButtonText, setEditorButtonText] = useState("리뷰 작성");

  const toggleEditor = () => {
    if (showEditor) {
      setShowEditor(false);
      setEditorButtonText("리뷰 작성");
    } else {
      setShowEditor(true);
      setEditorButtonText("취소하기");
    }
  };

  const hideEditor = () => {
    setShowEditor(false);
    setEditorButtonText("리뷰 작성");
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <br />
        <div className="Diary">
          <div style={{ textAlign: "right", marginRight: "50px" }}>
            <button onClick={toggleEditor} className="editorbutton">
              {editorButtonText}
            </button>
          </div>

          {showEditor && <DiaryEditor onHide={hideEditor} />}

          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default Diary;
