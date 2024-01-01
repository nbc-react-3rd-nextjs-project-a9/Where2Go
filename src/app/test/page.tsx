import React from "react";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api");
  const data = await res.json();
  return data;
};

const Test = async () => {
  const data = await getData();
  return <div>{data.message}</div>;
};

export default Test;
