import React, { useEffect, useState } from "react";

const Check = ({ type }) => {
  const [state, setState] = useState("");
  useEffect(() => {
    if (type == "a") {
      setState("A");
    } else {
      setState("B");
    }
  }, [type]);
  return <div>{state}</div>;
};

export default Check;
