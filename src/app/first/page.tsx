// app/(typing)/page.tsx (использую next.js)
"use client";
import { useEffect, useRef, useState, Ref, JSX } from "react";
import "../globals.css";
import { useTyping } from "@/features/typing/model/useTyping";
import { Letter } from "@/entities/typing/ui/Letter";
import { getText } from "@/features/typing/api/getText";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [currentIndex, letterState, handleKeyDown] = useTyping(text);
  useEffect(() => {
    getText()
      .then((_text) => {
        setText(_text);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);
  useEffect(() => {
    if (isLoaded) {
      window.addEventListener("keydown", (e: KeyboardEvent) => {
        handleKeyDown(e);
      });
    }
  }, [isLoaded]);
  if (!isLoaded) {
    return <h1> Loading </h1>;
  }
  if (isError) {
    return <h1> Error </h1>;
  }
  return (
    <div className="window">
      <div className="text">
        {[...text!].map((element, index) => {
          return <Letter state={letterState[index]} value={element} isActive={index == currentIndex} key={index} />;
        })}
      </div>
    </div>
  );
}
