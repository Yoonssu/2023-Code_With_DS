import React from "react";
import { useUserState } from "../UserContext";
import Headers from "../Headers/Headers";

const ModifyName = () => {
  const { user, userList } = useUserState();

  console.log(user.userId);
  console.log(user.userPwd);

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Headers />
    </div>
  );
};

export default ModifyName;
