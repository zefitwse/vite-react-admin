import { Avatar, Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd';
import './index.less'


type Props = {
  username: string
}

const CancelLogin = () => {

  const outLogin = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('auth')
    window.open('http://localhost:5173/login')
  }

  return (
    <>
      <Button type='link' onClick={() => outLogin()}>退出登录</Button>
    </>
  )
}

const NaviBar = (props: Props) => {
  const { username } = props
  const date = new Date()

  const items: MenuProps['items'] = [
    {
      label: <CancelLogin></CancelLogin>,
      key: '0',
    },
  ];
  return (
    <>
      <div className="navi-bar-contianer">
        <div className="user-info">
          <div className="username"> Welcome!  {username} </div>
          <div>今天是{date.getMonth() + 1}月{date.getDate()}日，星期{date.getDay() == 0 ? '日' : date.getDay()}</div>
        </div>
        <div className="avatar">
          <Dropdown menu={{ items }} trigger={['click']}>
            <Avatar alt='个人头像'>{username}
            </Avatar>
          </Dropdown>
        </div>
      </div>

    </>
  )
}

export default NaviBar