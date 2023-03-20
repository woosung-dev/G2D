import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [text, setText] = useState<string>();

  const onSubmit = (v: string | undefined) => {
    const data = axios.get("/api/chartText");
  };

  return (
    <>
      <div className="">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Label
        </label>
        <input
          name="text"
          placeholder="원하시는 특성을 입력해주세요."
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />

        <button type="button" onClick={() => onSubmit(text)}>
          Submit
        </button>
      </div>
    </>
  );
}
