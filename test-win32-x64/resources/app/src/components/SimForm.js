import React from 'react';
import {Form, Input, Button, Card} from 'antd';
import {Row, Col, Divider} from 'antd';
import {postCommand, postSimData} from '../httpClient';

export default class SimForm extends React.Component {
  state = {
    validateStatus: 'default'
  }

  onClickCommandbtns(event) {
    let target = event.target
    target.disabled = true
    setTimeout(() => {
      target.disabled = false;
    }, 2000)
    switch (event.target.innerText) {
      case "开始仿真":
        postCommand('start');
        break;
      case "停止仿真":
        postCommand('stop');
        break;
      case "自测":
        postCommand('self_test');
        break;
      default:
        console.error("simfrom command btn error")
        break;
    }
  };

  componentWillReceiveProps(nextProps, nextContext) {

  }

  onFinish(value) {

  };


  onSubmit(e) {
    const busType = this.props.busType;
    const payload =
      {
        word_standard_code: this.props.word_standard_code,
        id: this.props.id,
        sent_value: e.send_value
      };
    this.setState({
      validateStatus: 'validating'
    })
    postSimData(busType, payload).then((res) => {

      if (res.status === 200) {
        setTimeout(() => {
          this.setState({
            validateStatus: 'success'
          })
        }, 1000)
      } else {
        this.setState({
          validateStatus: 'error'
        })
      }
    }).catch((e) => {
      this.setState({
        validateStatus: 'error'
      })
    })

  }

  render() {
    return (
      <Card
        type="inner"
        title="数据更新"
        className="simForm"
      >
        <Form
          layout="inline"
          name="send_value"
          onFinish={e => this.onSubmit(e)}
        >
          <Form.Item
            style={{
              flexBasis: "400px"
            }}
            hasFeedback
            label={this.props.paraName}
            name="send_value"
            validateStatus={this.state.validateStatus}
            rules={[
              {
                required: true,
                message: '请输入',
              },
              {
                pattern: /\d+/,
                message: '请输入数字'
              }]}
          >
            <Input
              placeholder="请输入修改值"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={this.props.disableSubmitBtn}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Divider orientation="left" style={{color: '#333', fontWeight: 'normal'}}>
        </Divider>
        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
          <Col xs={{span: 5, offset: 1}} lg={{span: 6, offset: 2}}>
            <Button type="primary" onClick={this.onClickCommandbtns.bind(this)} className="start" command="start">
              开始仿真
            </Button>
          </Col>
          <Col xs={{span: 11, offset: 1}} lg={{span: 6, offset: 2}}>
            <Button danger className="stop" onClick={this.onClickCommandbtns.bind(this)}>
              停止仿真
            </Button>
          </Col>
          <Col xs={{span: 5, offset: 1}} lg={{span: 6, offset: 2}}>
            <Button className="selfTest" onClick={this.onClickCommandbtns.bind(this)}>
              自测
            </Button>
          </Col>
        </Row>
      </Card>
    )
  }
};
