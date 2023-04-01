import { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Avatar } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Link, useRoutes, useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import routes from '../router';


const getItems: any = (routeList: any[]) => {
    return routeList.map((item: any) => {
        if (item?.children && item?.children?.length) {
            return {
                key: item.key,
                icon: item?.icon,
                label: item?.name,
                children: getItems(item?.children)
            }
        }
        return {
            key: item.key,
            icon: item?.icon,
            label: <Link to={item?.path}>{item?.name}</Link>,
        }
    })
}

const getRoutesList = (routers) => {
    let list: any = []

    routers?.forEach(element => {
        if (element?.children) {
            list = list.concat([element], getRoutesList(element?.children))
        } else {
            list.push(element)
        }
    });

    return list

}

export default () => {
    const [collapsed, setCollapsed] = useState(false);
    const getRoutes = useRoutes(routes);
    let location = useLocation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [current, setCurrent] = useState('');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    useEffect(() => {
        let routers = getRoutesList(routes)
        setCurrent(routers?.find((item: any) => item?.path === location.pathname)?.key);
    }, [])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', color: "#fff", display: 'flex', alignItems: "center", justifyContent: "center" }} >{collapsed ? "logo" : "logologologo"}</div>
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    defaultOpenKeys={[current]}
                    theme="dark"
                    mode="inline"
                    items={getItems(routes)}
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer, display: "flex", justifyContent: "space-between" }} >
                    <div className='left'></div>
                    <div className='right'><Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /></div>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    {getRoutes}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};