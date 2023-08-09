import Admin from "../pages/admin";
import Dashboard from "../pages/dashboard";

export type IRoute = {
    name: string;
    key: string;
    children?: IRoute[];
    // 为 true 的话不会在左侧菜单中显示，但可通过路由地址访问。
    ignore?: boolean;
    // 角色，区分管理员与普通用户
    role?:string;
    component: () => {}
};

export const myRoutes: IRoute[] = [
    {
        name: 'dashboard',
        key: "/dashboard",
        component: Dashboard,
        role:'commonUser'
    },
    {
        name: 'Admin',
        key: "/Admin",
        component: Admin,
        role:'admin'
    }
]

