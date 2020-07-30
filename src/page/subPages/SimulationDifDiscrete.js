import React from 'react';
import {Card} from 'antd';
import "./Simulation.css";
import SelectableTable from "../../components/SelectableTable";
import SimForm from "../../components/SimForm";
import { getSimData, postSimData} from '../../httpClient'
import config from "../../config";

let timerList = [];//计数器数组
const columnDiscreteNames=[
  {
    key: 'id',
    title: 'id',
    dataIndex: 'id',
    align: "center",
    width: 80,
  },
  {
    key: 'source',
    title: 'source',
    dataIndex: 'source',
    align: "center"
  },
  {
    key: 'destination',
    title: 'destination',
    dataIndex: 'destination',
    align: "center"
  },
  {
    key: 'description',
    title: 'description',
    dataIndex: 'description',
    align: "center"
  },
  {
    key: 'standard_code',
    title: 'standard_code',
    dataIndex: 'standard_code',
    align: "center"
  },
  {
    key: 'sent_value',
    title: 'sent_value',
    dataIndex: 'sent_value',
    align: "center"
  }
]

export default class SimulationDifDiscrete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowParamName: '请选择数据行',//当前选择行的ParamName
      selectedRowID: '',////当前选择行的ID
      dataSource: [],//表数据
      disableSubmitBtn: true,//默认禁用提交按钮,
      loading: true,
    };
  }

  onFormSubmit = (sent_value) => {
    let payload =
      {
        id: this.state.selectedRowID,
        sent_value: sent_value
      };
    return postSimData('dif_discrete',payload)
    //postdata
  };

  onSelectedTableRow = (record) => {
    console.log(record);
    this.setState({
        selectedRowParamName: record.standard_code,
        selectedRowID: record.id,
        disableSubmitBtn: false
      }
    )
  };

  async componentWillMount() {
    //循环接收数据
    let timer = setInterval(this.updateData.bind(this)
      , config.updateInterval);
    timerList.push(timer);
    //ASYNC
  }

  componentWillUnmount() {
    timerList.forEach(timer => {
      clearInterval(timer)
    })
  }

  async updateData() {//更新数据
    let data = await getSimData(this.state.selectedStandardCode,'dif_discrete')
      .catch(e => {console.error(e)})
    if (!data) {
      this.setState({
        loading: true
      })
      return;
    }
    this.setState({
      dataSource: data,
      loading: false
    })
  }

  render() {
    return (
      <Card
        style={{
          marginTop: '24px',
          width: '100%',
          overflow: 'visible',
          minHeight: 'calc(100vh - 130px)'
        }}
        tabProps={{size: "large"}}
      >
        <SelectableTable
          columnNames ={columnDiscreteNames}
          dataSource={this.state.dataSource}
          onSelectedTableRow={this.onSelectedTableRow}
          loading={this.state.loading}
          allEditable={true}
        />
        <SimForm paraName={this.state.selectedRowParamName}
                 word_standard_code={this.state.selectedStandardCode}
                 id={this.state.selectedRowID}
                 busType='dif_discrete'
                 disableSubmitBtn={this.state.disableSubmitBtn}
        />
      </Card>
    );
  }
}
