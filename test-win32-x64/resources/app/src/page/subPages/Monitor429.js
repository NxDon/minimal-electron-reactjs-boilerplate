import React from 'react';
import {Card} from 'antd';
import MonSubTable from "../../components/MonSubTable";
import {
  getMonData,
  getMonSubTableData,
} from '../../httpClient/index'

import config from '../../config';
import SelectableTable from "../../components/SelectableTable";

const timerList = [];

const column429Names = [
  {
    title: 'id',
    dataIndex: 'id',
    align:"center"
  },
  {
    title: 'word_standard_code',
    dataIndex: 'word_standard_code',
    align:"center"
  },
  {
    title: 'word_standard_name',
    dataIndex: 'word_standard_name',
    align:"center"
  },
  {
    title: 'received_value',
    dataIndex: 'received_value',
    align:"center"
  },
  {
    title: 'cycle_diagnose',
    dataIndex: 'cycle_diagnose',
    align:"center"
  },
  {
    title: 'rs_status',
    dataIndex: 'rs_status',
    align:"center"
  },
  {
    title: 'data_diagnose',
    dataIndex: 'data_diagnose',
    align:"center"
  }
];

const equip429List = [
  {
    key: 'RA1',
    tab: 'RA1',
  },
  {
    key: 'RA2',
    tab: 'RA2',
  },
  {
    key: 'ADRU1',
    tab: 'ADRU1',
  },
  {
    key: 'ADRU2',
    tab: 'ADRU2',
  },
  {
    key: 'GNSU1',
    tab: 'GNSU1',
  },
  {
    key: 'GNSU2',
    tab: 'GNSU2',
  },
  {
    key: 'RUI1',
    tab: 'RUI1',
  },
  {
    key: 'RUI2',
    tab: 'RUI2',
  },
  {
    key: 'RDIU2',
    tab: 'RDIU2',
  },
  {
    key: 'RDIU3',
    tab: 'RDIU3',
  },
  {
    key: 'LIU_C1',
    tab: 'LIU_C1',
  },
  {
    key: 'LIU_C2',
    tab: 'LIU_C2',
  }
];

export default class Monitor429 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '429',
      selectedChildCodeName: '请选择子信号',//动态的
      selectedEquipment: 'RA1',//当前所选的设备
      dataSource: [],
      subTableDataSource: [],
      busType: '429',
      childTableLoading: false,
      loading: true
    };
  }

  async componentWillMount() {

    // 循环接收数据
    timerList[0] = setInterval(this.updateData.bind(this)
      , config.updateInterval)
  }

  //用户选择了某一行，进行子表数据获取
  onSelectedTableRow(record) {
    this.setState({
        childTableLoading: true
      }
    )
    clearInterval(timerList[1]);
    timerList[1] = setInterval(
      this.updateSubTableData.bind(this, record.word_standard_code)
      , config.updateInterval)

  };

  async updateSubTableData(word_standard_code) {
    if (!word_standard_code) {
        console.error('在更新子表数据时无 word_standard_code')
    }
    let data = await getMonSubTableData(word_standard_code,this.state.busType);
    this.setState({
      subTableDataSource: data,
      childTableLoading: false
    })
  }

  async updateData() {//更新数据
    let equipment = this.state.selectedEquipment
    let data = await getMonData(this.state.busType,equipment);
    this.setState({
      dataSource: data,
      loading: false
    })
  }

  onSelectNewEquipment = (equipment) => {
    this.setState(
      {
        selectedEquipment: equipment,
        loading: true,
      })
  };

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
          <Card
            tabList={equip429List}
            onTabChange={key => {
              this.onSelectNewEquipment(key);
            }}
            tabProps={{size: "large"}}
          >
            <SelectableTable
              columnNames={column429Names}
              dataSource={this.state.dataSource}
              onSelectedTableRow={this.onSelectedTableRow.bind(this)}
              loading={this.state.loading}
              allEditable={true}
            />
          </Card>
          <MonSubTable
            dataSource={this.state.subTableDataSource}
            loading={this.state.childTableLoading}
          />
        </Card>
      </div>

    );
  }


}
