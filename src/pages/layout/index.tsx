import { Outlet } from "react-router-dom";
import NaviBar from "@/components/navBar";
import { useState } from "react";
import SideBar from "@/components/siderBar";
import './index.less'

export default function Layout() {
    const [usename, setUserName] = useState('LiHua')

    return (
        <div>
            <NaviBar username={usename}></NaviBar>
            <div className="layout-container">
                <SideBar />
                {/* router.tsx 下的二级路由  */}
                <Outlet></Outlet>
            </div>
        </div>
    )
}