import { useState, useRef, useEffect, SetStateAction } from "react";
import { TLetterState } from "@entities/typing/model/types";

export const useTyping: (text: string) => [number, Array<TLetterState>, (e: KeyboardEvent) => void] = (text) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentIndexRef = useRef<number>(currentIndex);
  const isTimerStarted = useRef<boolean>(false);
  const timeStart = useRef<number>(0);
  const timeFinish = useRef<number>(0);
  const [letterState, setLetterState] = useState<Array<TLetterState>>(Array(text.length).fill("not-typed"));
  const letterStateRef = useRef<Array<TLetterState>>(letterState);
  useEffect(() => {
    setLetterState(Array(text.length).fill("not-typed"));
  }, [text]);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);
  useEffect(() => {
    letterStateRef.current = letterState;
  }, [letterState]);

  const changeLetterState = (state: TLetterState, index: number) => {
    letterStateRef.current[index] = state;
  };

  function handleKeyDown(e: KeyboardEvent) {
    if (!isTimerStarted.current) {
      timeStart.current = performance.now();
      isTimerStarted.current = true;
    }
    console.log(e);
    if (e.key == "Backspace" && currentIndexRef.current != 0) {
      changeLetterState("not-typed", currentIndexRef.current - 1);
      setCurrentIndex((prev) => prev - 1);
    }
    if (e.key.length == 1) {
      if (text[currentIndexRef.current] === e.key) {
        changeLetterState("correct", currentIndexRef.current);
      } else {
        changeLetterState("wrong", currentIndexRef.current);
      }
      setCurrentIndex((prev) => prev + 1);

      if (currentIndexRef.current == text.length - 1) {
        timeFinish.current = performance.now();

        alert("Your result is:" + (timeFinish.current - timeStart.current) / 1000);
      }
    }
  }
  return [currentIndex, letterState, handleKeyDown];
};
