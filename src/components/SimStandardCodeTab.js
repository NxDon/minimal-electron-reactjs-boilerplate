import React from 'react';
import {Tabs, Space} from 'antd';
import {Row, Col} from 'antd';

const {TabPane} = Tabs;

export default class SimStandardCodeTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {

    }

    render() {
        let standardCodes = this.props.standardCodesList
        if (!standardCodes) {
            return (<div className="standardCode_selector">
                <Space style={{
                    marginBottom: 16,
                    fontSize:"26px !important"
                }}>
                    字规范号：
                </Space>
                {this.props.children}
            </div>)
        }
        return (
            <Row className="standardCode_selector">
                <Col span={4}>
                    <Space style={{marginBottom: 16}}>
                        字规范号：
                    </Space>
                    <Tabs
                        defaultActiveKey="1"
                        tabPosition="left"
                        className="standardCodeTabs"
                        onChange={(activeKey) => {
                            this.props.onSelectNewCode(activeKey)
                        }}
                    >
                        {
                            standardCodes.map(code => (
                                <TabPane tab={`${code}`} key={code}>
                                </TabPane>
                            ))
                        }
                    </Tabs>
                </Col>
                <Col span={20}>
                    {this.props.children}
                </Col>
            </Row>
        )
    }
};
