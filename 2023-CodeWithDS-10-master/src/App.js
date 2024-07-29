import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUserState, useUserDispatch } from "./UserContext";

// yoon
import Home from "./pages/pages/home";
import Product from "./pages/pages/product";
import Basket from "./pages/pages/basket";

import React from "react";
import "./App.css";
import { useState } from "react";
import Buy from "./Buy/Buy.js";

import Headers from "./Headers/Headers.js";
import Detail from "./MenuDetail/Detail.js";

import Cart from "./Cart/Cart.js";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Tab from "./Menu/Tab.js";
import Mypage from "./pages/Mypage";
import Modify from "./pages/Modify";
import ModifyName from "./pages/ModifyName";
// import Header from "./pages/Header";
import useInput from "./pages/useInput";
import Diary from "./reviews/Diary";
import Ticket from "./Ticket/Ticket";

const App = () => {
  const { user } = useUserState();

  //메뉴 리스트
  const [menus, setMenus] = useState([]);
  //console.log(menus[0]);
  //담은 장바구니 목록
  const [cart, setCart] = useState([]);
  //장바구니 내 선택한 메뉴 목록
  const [checkLists, setCheckLists] = useState([]);

  //yoon
  const [products, setProducts] = useState([]);

  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <BrowserRouter>
      {window.location.pathname !== "/" &&
        window.location.pathname !== "/signup" &&
        window.location.pathname !== "/mypage" && <Headers />}
      <Routes>
        <Route
          path="/menu"
          element={
            <Tab
              menus={menus}
              setMenus={setMenus}
              convertPrice={convertPrice}
            />
          }
        />
        <Route
          path="/:title"
          element={<Detail cart={cart} setCart={setCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              checkLists={checkLists}
              setCheckLists={setCheckLists}
            />
          }
        />

        <Route path="/buy" element={<Buy cart={cart}></Buy>} />

        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/modifyname" element={<ModifyName />} />
        <Route path="/review" element={<Diary />} />
        <Route path="/ticket" element={<Ticket />} />

        <Route
          path="/product/:id"
          element={
            <Product
              convertPrice={convertPrice}
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Basket
              cart={cart}
              setCart={setCart}
              convertPrice={convertPrice}
              checkLists={checkLists}
              setCheckLists={setCheckLists}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
