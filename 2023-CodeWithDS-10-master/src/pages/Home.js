import React from "react";
import { useUserState } from "../UserContext";
import Headers from "../Headers/Headers";
const Home = () => {
  const { user } = useUserState();

  console.log(user.userId);
  console.log(user.userPwd);

  return (
    <div>
      <Headers />
      <h1>{user.userId}님 </h1>
    </div>
  );
};

export default Home;
