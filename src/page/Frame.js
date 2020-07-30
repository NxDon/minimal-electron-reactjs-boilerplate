import React from 'react';
import {Layout, Menu} from 'antd';
import {HddOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider,Footer } = Layout;

const PageFrame = props => {
  return (
    <Layout>
      <Header className="header"
              style={{
                backgroundColor: "#428bca",
                boxShadow: "0 20px 80px #f0f1f2",
              }}>
        <div className="logo"
             style={{
               fontSize: "34px",
               color: '#fff',
               display: "inline-block"
             }}>
          <HddOutlined/>
          &nbsp;&nbsp;
          通信导航系统测试仿真环境
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1" disabled>
              <span className="iconfont">&#xe6dd;</span>&nbsp;&nbsp; 自检
            </Menu.Item>
            <Menu.Item key="2" disabled
            >
              <span className="iconfont">&#xe658;</span>&nbsp;&nbsp;
              配线配电
            </Menu.Item>
            <Menu.Item key="3" disabled
            > <span className="iconfont">&#xe89f;</span>&nbsp;&nbsp;
              综合激励
            </Menu.Item>
            <SubMenu key="sim" title={<span><span className="iconfont">&#xe634;</span>&nbsp;&nbsp;&nbsp;综合仿真</span>}>
              <Menu.Item key="sim1">
                <Link to="/simulation/429">
                  429
                </Link>
              </Menu.Item>
              <Menu.Item key="sim2">
                <Link to="/simulation/422">
                  422
                </Link></Menu.Item>
              <Menu.Item key="sim3">
                <Link to="/simulation/discrete">
                  离散量
                </Link>
              </Menu.Item>
              <Menu.Item key="sim4">
                <Link to="/simulation/dif_discrete">
                  差分离散量
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="mon"  title={<span><span className="iconfont">&#xe623;</span>&nbsp;&nbsp;&nbsp;数据监控</span>}>
              <Menu.Item key="mon1">
                <Link to="/monitor/429">
                  429
                </Link>
              </Menu.Item>
              <Menu.Item key="mon2">
                <Link to="/monitor/422">
                  422
                </Link></Menu.Item>
              <Menu.Item key="mon3">
                <Link to="/monitor/discrete">
                  离散量
                </Link>
              </Menu.Item>
              <Menu.Item key="mon4">
                <Link to="/monitor/dif_discrete">
                  差分离散量
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="4"  disabled
            > <span className="iconfont">&#xe639;</span>&nbsp;&nbsp;
              波形测试
            </Menu.Item>
            <Menu.Item key="5" disabled
            > <span className="iconfont">&#xe78d;</span>&nbsp;&nbsp;
              试验测试
            </Menu.Item>
            <Menu.Item key="6" disabled
            > <span className="iconfont">&#xe668;</span>&nbsp;&nbsp;
              计量
            </Menu.Item>
            <Menu.Item key="7" disabled
            > <span className="iconfont">&#xe655;</span>&nbsp;&nbsp;
              ICD管理
            </Menu.Item>
            <Menu.Item key="8" disabled
            > <span className="iconfont">&#xe655;</span>&nbsp;&nbsp;
              通道配置
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: '0 24px 0 0' ,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
          <Footer  style={{ textAlign: 'center',fontSize:18 }}>通信导航系统测试仿真环境 &copy;2020 西安航空电子科技有限公司</Footer>
        </Layout>
      </Layout>
    </Layout>
  );

};

PageFrame.propTypes = {};

export default PageFrame;
