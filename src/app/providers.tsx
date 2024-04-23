import {type PropsWithChildren} from "react";
import {TRPCReactProvider} from "~/trpc/react";

/**
 *
 * @param children
 * @constructor
 * @desc Keep all providers here
 */
export default function Providers({children}: PropsWithChildren) {
    return (
        <TRPCReactProvider>{children}</TRPCReactProvider>

    )
}