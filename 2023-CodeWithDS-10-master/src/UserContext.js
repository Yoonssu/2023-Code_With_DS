import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  userList: [],
  user: {
    userId: null,
    userPwd: null,
    name: null,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_USER":
      return {
        ...state,
        userList: state.userList.concat(action.user),
      };
    case "LOGIN":
      return {
        ...state,
        user: {
          userId: action.userId,
          userPwd: action.userPwd,
          name: action.userName,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    case "MODIFY":
      state.userList.splice(action.index, 1, {
        id: action.userId,
        name: action.userName,
        pwd: action.userPwd,
      });
      return {
        ...state,
        user: {
          userId: action.userId,
          userPwd: action.userPwd,
          name: action.userName,
        },
        userList: state.userList,
      };
    default:
      return state;
  }
};

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const state = useContext(UserStateContext);
  if (!state) throw new Error("Cannot find UserProvider");
  return state;
};

export const useUserDispatch = () => {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) throw new Error("Cannot find UserProvider");
  return dispatch;
};
