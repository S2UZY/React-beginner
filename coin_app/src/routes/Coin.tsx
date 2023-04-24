import { useParams } from "react-router-dom";
import React from "react";

interface RouteParams {
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  return <div>{coinId}</div>;
}

export default Coin;
