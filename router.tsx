import Login from "@/pages/login";
import Admin from "./src/pages/admin";
import Dashboard from "./src/pages/dashboard";
import MyCenter from "./src/pages/my-center";
import Layout from "@/pages/layout";
import NotFound from "@/pages/404";
import { routeGuard } from '@/utils/guard'


interface RouteConfig {
  path?: string; //给react-router使用，注册路由
  element?: any; //组件
  children?: RouteConfig[]; //子路由等等
  id?: string; //侧边栏需要使用
  name?: string; // 侧边栏展的label
  showOnSider?: boolean //是否在侧边展示
}

//基础路由
const baseRoutes: RouteConfig[] = [
  {
    path: '/login',
    id: '/login',
    // 用户已经登陆了，如果他再到login页面，就给他跳走
    element: routeGuard(<Login />, 'login'),
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
    ]
  },
  {
    path: "*",
    element: <NotFound />,
    id: '404'
  },
]

// 根据权限，动态添加路由
const addRoutes = (baseRoutes: any, auth: string) => {
  // 先提出共用的部分，然后根据实际角色，向路由数组里动态添加
  const tempArr: any = baseRoutes[1].children?.slice(0, 1)
  if (auth === 'admin') {
    tempArr.splice(1, 0, {
      path: "admin",
      element: routeGuard(<Admin />),
      id: '/admin',
      name: '管理员',
      showOnSider: auth === 'admin' ? true : false,
    })
  }
  if (auth === 'user') {
    tempArr.splice(1, 0, {
      path: "my-center",
      element: routeGuard(<MyCenter />),
      id: '/my-center',
      name: '个人中心',
      showOnSider: true,
    })
  }
  baseRoutes[1].children = tempArr
  return baseRoutes
};



// 最后处理好的将要渲染的route
export function renderRoutes() {
  const auth: any = sessionStorage.getItem('auth')
  const tempArr = baseRoutes.slice()
  let allRoutePage: any
  if (auth) {
    allRoutePage = addRoutes(tempArr, auth)
  } else {
    allRoutePage = addRoutes(tempArr, '')
  }
  return allRoutePage
}


