import { Avatar } from 'antd';
import './index.less'

type Props = {
    username: string
}

const NaviBar = (props: Props) => {
    const { username } = props
    const date = new Date()
    return (
        <>
            <div className="navi-bar-contianer">
                <div className="user-info">
                    <div className="username"> Welcome!  {username} </div>
                    <div>今天是{date.getMonth() + 1}月{date.getDate()}日，星期{date.getDay() == 0 ? '日' : date.getDay()}</div>
                </div>
                <div className="avatar"><Avatar alt='个人头像'></Avatar></div>
            </div>

        </>
    )
}

export default NaviBar