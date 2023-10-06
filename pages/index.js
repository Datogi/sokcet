"use client";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
export default function Home() {
  let socket;
  const bid = useRef();
  const [bids, setBids] = useState(1);

  useEffect(() => {
    socketInitializer();
  }, [bid.current?.value]);
  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();
    socket.on("bid", (bid) => {
      console.log(bid);
      bid = +bid;
      console.log(typeof bid);
      setBids(bid * 1);
    });
  }
  const handleBid = () => {
    console.log(bid.current.value);
    if (socket) {
      socket.emit("bid", bid.current.value);
    }
  };
  return (
    <div>
      <div>{bids}</div>
      <input type="number" ref={bid} />
      <button onClick={handleBid}>Bid</button>
    </div>
  );
}
