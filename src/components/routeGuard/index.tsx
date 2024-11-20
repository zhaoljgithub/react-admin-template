
import { Navigate, useLocation } from "react-router-dom";

import { ss } from "@/utils/storage";

export default function RouteGuard(props: { children: any; }) {
    const whiteList = ['/login', '/404'];
    const realToken = ss.get('realToken');
    const { pathname } = useLocation();
    if (realToken) {
        return props.children;
    } else {
        if (whiteList.includes(pathname)) {
            return props.children
        } else {
            return <Navigate to="/login" />
        }
    }
}
