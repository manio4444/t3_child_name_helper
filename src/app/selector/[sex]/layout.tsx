import {type PropsWithChildren} from "react";

export default function SelectorLayout({children}: PropsWithChildren) {
    return (
        <div className="
        text-foreground
        dark:text-white
        bg-slate-100
        dark:bg-slate-900
        min-h-screen
        py-8
        ">
            <div className="container mx-auto">
                {children}
            </div>
        </div>
    )
}