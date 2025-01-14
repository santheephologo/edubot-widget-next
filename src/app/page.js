import Image from "next/image";
import ChatWidget from "@/ChatWidget/ChatWidget";
import './globals.css';

export default function Home() {
  return (
        <ChatWidget bot_id={"1"} user_id={"1"}/>
  );
}
