"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import "../globals.css";

const PLACEHOLDER: string = "Lorem";
const ARRAY = [1, 2, 3, 4];

type TLetterState = "current" | "not-current" | "correct" | "wrong";

function Letter({ state, value }: { state: TLetterState; value: string }) {
  if (state === "current") {
    return <span style={{ color: "darkgray" }}> {value} </span>;
  } else if (state === "not-current") {
    return <span style={{ color: "gray" }}> {value} </span>;
  } else if (state === "correct") {
    return <span style={{ color: "black" }}> {value} </span>;
  } else {
    return <span style={{ color: "red" }}> {value} </span>;
  }
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentIndexRef = useRef<number>(currentIndex);

  function handleKeyDown(e: KeyboardEvent) {
    console.log(e);
    if (e.key == "Backspace" && currentIndexRef.current != 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    if (e.key.length == 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      handleKeyDown(e);
    });
  }, []);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  return (
    <div className="text">
      {[...PLACEHOLDER].map((element, index) => {
        return <Letter state="not-current" value={element} key={index} />;
      })}
      {currentIndex}
    </div>
  );
}
