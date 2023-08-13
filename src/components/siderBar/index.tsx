import { Menu } from 'antd';
import myRoutes from '../../../router';
import { useNavigate } from 'react-router-dom';
import './index.less';
import { useState } from 'react';

// 获取menu 的 item
const getMenuItem = (routes: any) => {
    return routes.map((item: any) => {
        if (item.children && item.children.length > 0 && item.showOnSider) {
            return (
                <Menu.SubMenu key={item.id} title={item.name}>
                    {getMenuItem(item.children)}
                </Menu.SubMenu>
            );
        } else if (item.showOnSider) {
            return (
                < Menu.Item key={item.id} title={item.name} >
                    {item.name}
                </Menu.Item >
            );
        }
    });
}

// 处理默认展开项的数据

function getOpenSubMenu(url: string) {
    // 移除开始的'/'，然后分割字符串
    const segments = url.replace(/^\//, '').split('/');
    // 返回第一个片段
    return ('/' + segments[0]);
}

function SideBar() {
    // 对菜单初始化的展开与选中
    const [currentMenu, setCurrentMenu] = useState(getOpenSubMenu(window.location.pathname))
    const [currentMenuItem, setCurrentMenuItem] = useState(window.location.pathname || '/dashboard/work-1')

    const navigate = useNavigate()

    const onClick = (value: any) => {
        setCurrentMenu(getOpenSubMenu(value.key))
        setCurrentMenuItem(value.key)
        navigate(value.key)

    };

    return (
        <div className='sider-bar-container'>
            <div className='sider-bar-title'>Fall-Admin</div>
            <Menu
                className='menu-style'
                onClick={onClick}
                style={{ width: 190 }}
                defaultSelectedKeys={[currentMenuItem]}
                defaultOpenKeys={[currentMenu]}
                mode="inline"
            >
                {getMenuItem(myRoutes[1].children)}
            </Menu>
        </div>
    );
}

export default SideBar;
