import Login from "@/pages/login";
import Admin from "./src/pages/admin";
import Dashboard from "./src/pages/dashboard";
import MyCenter from "./src/pages/my-center";
// import MyCenterDetail from "./src/pages/my-center-detail";
import Layout from "@/pages/layout";
import NotFound from "@/pages/404";
import { routeGuard } from '@/utils/auth'

interface RouteConfig {
  path: string; //给react-router使用，注册路由
  element?: any; //组件
  children?: RouteConfig[]; //子路由等等
  id: string; //侧边栏需要使用
  name?: string; // 侧边栏展的label
  showOnSider?: boolean //是否在侧边展示
}

const myRoutes: RouteConfig[] = [
  {
    path: '/login',
    id: '/login',
    element: <Login />,
    name: '登陆',
    showOnSider: true
  },
  {
    path: '/',
    element: routeGuard(< Layout />),
    id: '/',
    showOnSider: false,
    children: [
      {
        path: "dashboard",
        //这里的id需要是children里的第一个元素
        id: '/dashboard',
        name: '工作台',
        showOnSider: true,
        children: [
          {
            path: "work-1",
            element: routeGuard(<Dashboard />),
            id: '/dashboard/work-1',
            name: '工作台-1',
            showOnSider: true,
          },
        ]
      },
      {
        path: "admin",
        element: routeGuard(<Admin />),
        id: '/admin',
        name: '管理员',
        showOnSider: true,
      },
      {
        path: "my-center",
        element: routeGuard(<MyCenter />),
        id: '/my-center',
        name: '个人中心',
        showOnSider: true,
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />,
    id: '404'
  },
];

export default myRoutes;
