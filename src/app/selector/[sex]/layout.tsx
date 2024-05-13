import { type PropsWithChildren } from "react";

export default function SelectorLayout({ children }: PropsWithChildren) {
  return (
    <div
      className="
        min-h-screen
        bg-slate-100
        py-8
        text-foreground
        dark:bg-slate-900
        dark:text-white
        "
    >
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
