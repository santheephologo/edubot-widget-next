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
    <ChatWidget bot_id={"c1c51700-d05b-11ed-a1eb-0242ac120002"} user_id={"b968a9b8-a715-40b1-aa00-5e5e5cc1e190"} nickname={"Mr.PS3"} toggle={isFabOpen} />
    </>
  );
}

export const base_URL = "http://127.0.0.1:8000/api"
export const socket_URL = "ws://localhost:4000"