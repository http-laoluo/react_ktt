import { useEffect, useState } from 'react'
import { Avatar, Button, Card, Col, Dropdown, Layout, Row, Space } from 'antd';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../store/index';
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { getMenu } from '../../store/auth/action';
import { useDispatch } from 'react-redux';
import type { Dispatch } from 'redux';
import { SettingOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
const AdminView = () => {
    let [data, setData] = useState('');
    const itemList = useSelector((state: RootState) => state.auth.menu)

    const routes = useSelector((state: RootState) => state.auth.routes)

    const userInfo = useSelector((state: RootState) => state.auth.userInfo)

    const navigate = useNavigate();
    const location = useLocation()
    const dispatch: Dispatch<any> = useDispatch()
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e, itemList, routes);
        navigate(e.key)
    };
    let items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div onClick={() => {
                    sessionStorage.removeItem('token')
                    sessionStorage.removeItem('routes')
                    sessionStorage.removeItem('menu')
                    sessionStorage.removeItem('userInfo')
                    window.location.hash = "/"
                }}>
                    退出登录
                </div>
            ),
        }
    ];
    useEffect(() => {
        //    console.log(items,'///////////////////////////////',routes);
        if (itemList.length < 2 && sessionStorage.getItem("token")) {
            dispatch(getMenu())
            console.log(location.pathname, '///////////////location.pathname');

            if (location.pathname === '/admin') {
                navigate('/admin/dash')
            } else {
                navigate(location.pathname)
            }
        } else {
            navigate(location.pathname)
        }
    }, [])
    return (
        <div className='index'>
            <Layout style={{ maxWidth: '100vw', minHeight: "100vh" }}>
                <Header style={{ background: "#fff", padding: '0 12px', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
                    <Row justify={'space-between'}>
                        <Col className='f_jcfs_aic'>
                            <h2 style={{ background: "#fff" }}>快团团后台管理系统</h2>
                        </Col>
                        <Col className='f_jcfe_aic'>
                            <Row >
                                <Col className='f_jcc_aic' style={{ marginRight: "8px" }}>
                                    <Avatar shape="square" size={48} src={<img src={userInfo.avatar} alt="avatar" />} />
                                </Col>
                                <Col className='f_jcc_aic' style={{ marginRight: "8px" }}>
                                    <div>
                                        用户名：{userInfo.name}
                                    </div>
                                </Col>
                                <Col className='f_jcc_aic' style={{ marginRight: "8px" }}>
                                    <Dropdown menu={{ items }} placement="bottomLeft">
                                        <Button><SettingOutlined /></Button>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Header>
                <Layout hasSider>
                    <Sider>
                        <Menu
                            style={{ minHeight: '100%' }}
                            onClick={onClick}
                            mode="inline"
                            items={itemList}
                        />
                    </Sider>
                    <Content style={{ padding: '7px', minHeight: "100%", boxSizing: "border-box" }}>
                        <Outlet />
                    </Content>
                </Layout>
                {/* <Footer >Footer</Footer> */}
            </Layout>
        </div>
    )
}
export default AdminView