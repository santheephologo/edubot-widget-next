"use client";
import Image from "next/image";
import ChatWidget from "@/ChatWidget/ChatWidget";
import './globals.css';
import React, { useState } from "react";
export default function Home() {
  const [isFabOpen, setIsFabOpen] = useState(false);

  const handleToggle = () => {
    console.log("state ", isFabOpen)
    setIsFabOpen(!isFabOpen);
  };
  
  return (<>
    <button onClick={handleToggle}>Hiiiii</button>
    <ChatWidget bot_id={"c1c51700-d05b-11ed-a1eb-0242ac120002"} user_id={"0004f939-9eb1-4b77-aa4a-2686d046d680"} nickname={"Mr.Bot"} toggle={isFabOpen} />
    </>
  );
}

export const base_URL = "http://127.0.0.1:8000/api/ai"
export const socket_URL = "ws://localhost:4000"