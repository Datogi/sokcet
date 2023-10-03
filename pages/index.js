import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const Home = () => {
  const [inputBid, setInputBid] = useState(0);
  const [bid, setBid] = useState(0);

  useEffect(() => {
    socketInitializer();
    socket = io();
    return () => {
      socket.disconnect();
    };
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();

    socket.on("receive-bid", (data) => {
      console.log(data);
      setBid(data);
    });
  }

  function handleSubmit() {
    setBid(inputBid);
    console.log(bid);

    console.log("emitted");

    socket.emit("send-bid", inputBid);
  }

  return (
    <div>
      <div>
        <br />

        <form>
          <input
            name="bid"
            placeholder="enter your bid"
            value={inputBid}
            onChange={(e) => setInputBid(e.target.value)}
            autoComplete={"off"}
          />
        </form>
        <button onClick={handleSubmit}>click</button>
      </div>
      {bid}
    </div>
  );
};

export default Home;
