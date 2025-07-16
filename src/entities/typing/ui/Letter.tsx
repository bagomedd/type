import { TLetterState } from "../model/types";

export function Letter({ state, value, isActive }: { state: TLetterState; value: string; isActive: boolean }) {
  let letterColor = "";
  let className = "letter";

  if (state === "not-typed") {
    letterColor = "gray";
  } else if (state === "correct") {
    letterColor = "black";
  } else {
    letterColor = "red";
  }
  if (isActive) {
    className += " letter--active";
  }
  if (value == " ") {
    value = "\u00A0";
  }
  return (
    <span className={className} style={{ color: letterColor }}>
      {value}
    </span>
  );
}
