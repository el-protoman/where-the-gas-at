import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Map from './mapbox';

const { Header, Content, Footer } = Layout;
const submenu = (
    <Menu>
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.Item key="3">Option 3</Menu.Item>
    </Menu>
);

const Layout_Component: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                // items={new Array(3).fill(null).map((_, index) => {
                //     const key = index + 1;
                //     return {
                //         key,
                //         label: `nav ${key}`,
                //     };
                // })}
                >
                    <Menu.Item key="1">Find Gas</Menu.Item>
                    <Menu.Item key="2">Availability History
                        <Dropdown overlay={submenu}>
                            <DownOutlined />
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item key="3">Buy me a Coffee</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <h1>Welcome to the Gas Availability App</h1>
                <p>Find gas stations near you</p>
                <Map />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    );
};

export default Layout_Component;