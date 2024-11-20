import type { RouteObject } from "react-router-dom";

import Layout from "@/layout";
import LazyWrapper from "@/components/lazyWrapper";
import NotFound from "@/views/notFound";
import Login from "@/views/login";

export const paths = [
    // example
    // { 
    //     path:'settings', 
    //     children: [
    //         { path: 'git' },
    //         { path: 'project' }
    //     ]
    // }
]

interface Path {
    path: string;
    children?: Path[];
}

interface Route {
    path: string;
    element: JSX.Element;
    children?: Route[];
}

function generatePaths(paths: Path[]): Route[] {
    const result: Route[] = [];
    for (const pathObj of paths) {
        const { path, children } = pathObj;
        const fullPath = {
            path,
            element: LazyWrapper(path),
        } as Route & { children?: Route[] };
        result.push(fullPath);
        if (children) {
            const childPaths = generatePaths(children);
            fullPath.children = [];
            for (const childPath of childPaths) {
                fullPath.children.push({
                    path: `${childPath.path}`,
                    element: LazyWrapper(childPath.path)
                });
            }
        }
    }
    return result;
}

export const ROUTE_CONFIG: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: generatePaths(paths).concat({ path: "*", element: <NotFound /> })
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/404",
        element: <NotFound />
    }
];

console.log(ROUTE_CONFIG)
