/* eslint-disable @typescript-eslint/ban-ts-comment */
import { lazy } from "react";

const Modules = import.meta.glob(`@/views/*/index.tsx`)

export default function LazyWrapper(path: string) {
    // @ts-expect-error
    const Component = lazy(Modules[`/src/views/${path}/index.tsx`])
    return <Component />
}