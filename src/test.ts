import { useState, useRef } from "react";

export const func: () => void = () => console.log("23");

export const func2: (stroke: string) => void = (stroke) => console.log(stroke);

export const func3: <T>(stroke: T) => void = (stroke) => console.log(stroke);

export const useMyHook: <T, N>(initialState: T, initialRef: N) => number = (initialState, initialRef) => 10;

export const useMyHook2: (initialState: string) => [number, string, boolean] = (initialState) => [10, "hello", true];
