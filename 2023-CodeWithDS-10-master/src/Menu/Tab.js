import { useState, useEffect } from "react";
import Toast from "./Toast.js";
import Sandwich from "./Sandwich";
import FoodRamen from "./Ramen";
import Rice from "./Rice.js";
import Select from "./Select.js";
import Pasta from "./Pasta.js";
import styled from "styled-components";
import circle_g from "../img/circle_green.jpg";
import { getMenus } from "../Service/fetcher.js";
import "./Tab.css";
import Headers from "../Headers/Headers.js";

// Styled-Component 라이브러리를 활용해 TabMenu 와 Desc 컴포넌트의 CSS를 구현.

const TabMenu = styled.div`
  background-color: #dcdcdc;
  color: black;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;

  .submenu {
    display: flex;
    width: calc(100% /3);
    height: 50px;
    padding: 10px;
    padding-top: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .focused {
    background-color: #873856;
    color: #ffffff;
  }

  .category {
    font-size: 40px,
    font-weight: bold;
  }
`;

export default function Tab({ menus, setMenus }) {
  useEffect(() => {
    getMenus().then((data) => {
      setMenus(data.data.menus);
    });
  }, [setMenus]);

  const selectArray = [];
  const pastaArray = [];
  const riceArray = [];
  const jpfoodArray = [];
  const swArray = [];
  const toastArray = [];

  menus.map(function (el, index) {
    if (el.category == "선택") selectArray.push(el);
    else if (el.category == "파스타치오") pastaArray.push(el);
    else if (el.category == "니나노덮밥") riceArray.push(el);
    else if (el.category == "일식/양식") jpfoodArray.push(el);
    else if (el.category == "샌드위치카페") swArray.push(el);
    else toastArray.push(el);
  });

  // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
  const [currentTab, clickTab] = useState(0);

  const TabArr = [
    { name: "선택", content: <Select selectArray={selectArray} /> },
    { name: "파스타치오", content: <Pasta pastaArray={pastaArray} /> },
    { name: "니나노덮밥", content: <Rice riceArray={riceArray} /> },
    { name: "일식/양식", content: <FoodRamen jpfoodArray={jpfoodArray} /> },
    { name: "샌드위치카페", content: <Sandwich swArray={swArray} /> },
    { name: "토스트", content: <Toast toastArray={toastArray} /> },
  ];

  const selectMenuHandler = (index) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
  };
  return (
    <>
      <TabMenu>
        {TabArr.map((el, index) => (
          <div
            className={index === currentTab ? "submenu focused" : "submenu"}
            onClick={() => selectMenuHandler(index)}
          >
            {el.name}
          </div>
        ))}
      </TabMenu>
      <div className="congestion-container">
        <img src={circle_g} className="congestion" />
        <span className="category">{TabArr[currentTab].name}</span>
      </div>
      {TabArr[currentTab].content}
    </>
  );
}
