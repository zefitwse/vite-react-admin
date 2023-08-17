import { Card, Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './index.less'

export default function Login() {

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const leftCard = document.getElementsByClassName('.login-card-left')
    const rightCard = document.getElementsByClassName('.login-card-right')

    

    return (
        <div className="login-container">
            <div className='login-page'>
                <div className='backup'>
                    <Card className='login-card login-card-left'
                        bordered={false}
                    >
                        <div>
                            Hello, Welcome！
                        </div>
                    </Card>
                    <Card
                        title="登录 Fall-Admin"
                        className='login-card login-card-right'
                        bordered={false}
                    >
                        <Form
                            name="admin"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: '请输入用户名' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>记住密码</Checkbox>
                                </Form.Item>
                                <a href="" className="login-form-link">
                                    忘记密码
                                </a>
                            </Form.Item>

                            <Form.Item className='login-register'>
                                <>
                                    <div>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            登录
                                        </Button>
                                    </div>
                                    <div>
                                        <Button className="login-form-button">
                                            立即注册
                                        </Button>
                                    </div>
                                </>
                            </Form.Item>
                        </Form>

                    </Card>
                </div>
            </div>
        </div>
    )
}