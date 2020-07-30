import React, {Component} from 'react';
import {Table} from 'antd';


const columnNames = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: "center"
  },
  {
    title: 'description',
    dataIndex: 'description',
    align: "center"
  },
  {
    title: 'received_value',
    dataIndex: 'received_value',
    align: "center"
  },
  {
    title: 'data_diagnose',
    dataIndex: 'data_diagnose',
    align: "center"
  }
];

class MonSubTable extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Table columns={columnNames}
             scroll={{y: 300}}
             dataSource={this.props.dataSource}
             loading={this.props.loading}

             bordered>
      </Table>
    );
  }
}


export default MonSubTable;
