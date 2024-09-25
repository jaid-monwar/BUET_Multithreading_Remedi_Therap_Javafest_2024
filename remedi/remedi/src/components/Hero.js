import * as React from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "../utils/cn";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import Buttons from "./Buttons";

export default function Hero(props) {
  const words = [
    {
      text: "Build",
    },
    {
      text: "a",
    },
    {
      text: "Better",
    },
    {
      text: "future",
    },
    {
      text: "with",
    },
    {
      text: "Remedi.",
      className: "text-blue-900 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
        The road to a better health starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Buttons login={props.login} logout={props.logout} />
      </div>
    </div>
  );
}
