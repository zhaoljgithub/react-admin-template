import { Outlet } from "react-router-dom";
import Header from "@/components/header";
import Styles from "./layout.module.scss";

export default function Layout() {
    return (
        <div className={Styles.layout}>
            {!(window as any).qiankunStarted && <Header/>}
            <div className={Styles.layout__content}>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

 