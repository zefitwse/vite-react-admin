import { Outlet } from "react-router-dom";
import NaviBar from "@/components/NavBarCom";
import SideBar from "@/components/SiderBarCom";
import { useSelector } from "react-redux";
import './index.less'

export default function Layout() {

  const { name } = useSelector((state: any) => state.info)

  return (
    <div>
      <NaviBar username={name}></NaviBar>
      <div className="layout-container">
        <SideBar />
        {/* router.tsx 下的二级路由  */}
        <Outlet></Outlet>
      </div>
    </div>
  )
}