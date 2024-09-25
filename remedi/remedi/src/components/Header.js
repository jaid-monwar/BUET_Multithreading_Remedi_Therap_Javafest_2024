import * as React from "react";

// export default function Header(props) {
//   return (
//     <header className="App-header">
//       <img src={props.logoSrc} className="App-logo" alt="logo" />
//       <h1 className="App-title">{props.pageTitle}</h1>
//     </header>
//   );
// };

import { Boxes } from "./ui/background-boxes";
import { cn } from "../utils/cn";

export default function Header(props) {
  return (
    <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("md:text-8xl text-xl text-white relative z-20")}>
        Remedi
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        The best AI-powered Diagnostic and Medication site
      </p>
    </div>
  );
}
