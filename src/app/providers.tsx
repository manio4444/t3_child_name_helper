import {type PropsWithChildren} from "react";
import {TRPCReactProvider} from "~/trpc/react";
import {NextUIProvider} from "@nextui-org/react";

/**
 *
 * @param children
 * @constructor
 * @desc Keep all providers here
 */
export default function Providers({children}: PropsWithChildren) {
    return (
        <NextUIProvider>
            <TRPCReactProvider>
                {children}
            </TRPCReactProvider>
        </NextUIProvider>
    )
}