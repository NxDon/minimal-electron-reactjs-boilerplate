import React from 'react';
import {Card} from 'antd';
import {
  getMonData,
} from '../../httpClient/index'

import config from '../../config';
import SelectableTable from "../../components/SelectableTable";

const timerList = [];

const columnDiscreteNames = [
  {
    title: 'id',
    dataIndex: 'id',
    align: "center"
  },
  {
    title: 'signalName',
    dataIndex: 'signalName',
    align: "center"
  },

  {
    title: 'received_value',
    dataIndex: 'received_value',
    align: "center"
  }
];


export default class MonitorDiscrete extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      busType: 'discrete',
      loading: true
    };
  }

  async componentWillMount() {

    // 循环接收数据
    timerList[0] = setInterval(this.updateData.bind(this)
      , config.updateInterval)
  }


  async updateData() {//更新数据
    let data = await getMonData(this.state.busType);
    this.setState({
      dataSource: data,
      loading: false
    })
  }

  componentWillUnmount() {
    timerList.forEach(timer => {
      clearInterval(timer)
    })
  }

  render() {
    return (
      <div>
        <Card style={{width: '100%', height: '100%'}}
        >
          <SelectableTable
            columnNames={columnDiscreteNames}
            dataSource={this.state.dataSource}
            loading={this.state.loading}
          />
        </Card>
      </div>
    );
  }


}
