import React from 'react';
import {Card} from 'antd';
import "./Simulation.css";
import SelectableTable from "../../components/SelectableTable";
import SimForm from "../../components/SimForm";
import { getSimWordStandardCode, getSimData, postSimData} from '../../httpClient'
import SimStandardCodeTab from "../../components/SimStandardCodeTab";
import config from "../../config";


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

const column429Names = [
  {
    key: 'id',
    title: 'id',
    dataIndex: 'id',
    align: "center",
    width: 80,
  },
  {
    key: 'parameter_name',
    title: 'parameter_name',
    dataIndex: 'parameter_name',
    align: "center"
  },
  {
    key: 'description',
    title: 'description',
    dataIndex: 'description',
    align: "center"
  },
  {
    key: 'sent_value',
    title: 'sent_value',
    dataIndex: 'sent_value',
    align: "center"
  },
  {
    key: 'received_value',
    title: 'received_value',
    dataIndex: 'received_value',
    align: "center"
  }
];

let timerList = [];//计数器数组

export default class Simulation429 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStandardCodes: [],//当前显示设备字规范号列表
      standardCodesList: [
        {
          equipmentName: "",
          word_standard_code: []
        }
      ],//所有设备字规范号列表
      selectedEquipment: 'RA1',//当前所选的设备
      selectedStandardCode: '',//当前所选的行对应的字规范号
      selectedRowParamName: '请选择数据行',//当前选择行的ParamName
      selectedRowID: '',////当前选择行的ID
      dataSource: [],//表数据
      disableSubmitBtn: true,//默认禁用提交按钮,
      loading: true,

    };
  }

  updateStandardCodesListAsync(codeList) {
    return new Promise((res, rej) => {
      this.setState({
        standardCodesList: codeList
      })
      res();
    })
  }

  updateCurrentStandardCodes(currentEquipment) {
    if (!this.state.standardCodesList) return;
    let lists = this.state.standardCodesList.filter((obj) => {
      return obj.equipmentName === this.state.selectedEquipment;
    })
    if (!lists.length) {
      this.setState({
        currentStandardCodes: []
      })
    } else {
      this.setState({
        currentStandardCodes: lists[0].word_standard_code
      })
    }
  }


  onSelectNewEquipment = (currentEquipment) => {
    this.setState({'selectedEquipment': currentEquipment}, () => {
      this.updateCurrentStandardCodes(currentEquipment);
      this.setState({
        loading: true,
        selectedRowParamName: '请选择数据行'
      })
    })
  };

  onSelectNewCode = async newcode => {//选择字规范号
    this.setState({
      selectedStandardCode: newcode,
      loading: true,
      selectedRowParamName: '请选择数据行'
    })
   // await getSimChildStandardInfo(newcode)

  };

  //选择行，修改表单名称为当前选择行的名称
  onSelectedTableRow = (record) => {
    this.setState({
        selectedRowParamName: record.parameter_name,
        selectedRowID: record.id,
        disableSubmitBtn: false
      }
    )
  };

  async updateData() {//更新数据
    let data = await getSimData(this.state.selectedStandardCode,'429')
      .catch(e => {
      })
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

  async componentWillMount() {
    let equipment = this.state.selectedEquipment;
    let codesList = await getSimWordStandardCode('429');
    await this.updateStandardCodesListAsync(codesList);//更新总CodeList
    await this.updateCurrentStandardCodes(equipment);//获取当前设备对应的CodeList
    //获取表格基本数据
    this.setState({
      selectedStandardCode: this.state.currentStandardCodes[0],
    })
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

  render() {
    return (
      <Card
        style={{
          marginTop: '24px',
          width: '100%',
          overflow: 'visible',
          minHeight: 'calc(100vh - 130px)'
        }}
        tabList={equip429List}
        onTabChange={key => {
          this.onSelectNewEquipment(key);
        }}
        tabProps={{size: "large"}}
      >
        <SimStandardCodeTab
          standardCodesList={this.state.currentStandardCodes}
          onSelectNewCode={this.onSelectNewCode.bind(this)}
        >
          <SelectableTable
            columnNames={column429Names}
            dataSource={this.state.dataSource}
            onSelectedTableRow={this.onSelectedTableRow}
            loading={this.state.loading}

          />
          <SimForm paraName={this.state.selectedRowParamName}
                   word_standard_code={this.state.selectedStandardCode}
                   id={this.state.selectedRowID}
                   busType='429'
                   disableSubmitBtn={this.state.disableSubmitBtn}
          />
        </SimStandardCodeTab>
      </Card>
    );
  }
}
