import React, {Component} from 'react';
import {Table} from 'antd';

class SelectableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activedIndex: -1,
      activedId: -1,
    }
  }

  clickRow = (record, index) => {
    if (!this.props.allEditable && !record.editable  ) return;//如果不是所有都可编辑并且当前行不可编辑 返回
    //let selectedID = record.id
    this.setState({
      activedIndex: index, //获取点击行的id
      activedId: record.id
    })
    console.log('select a row ,with record');
    console.dir(record);
    this.props.onSelectedTableRow(record);//向父组件传递参数名称
  }

  setClassName = (record, index) => {//record代表表格行的内容，index代表行索引
    //判断索引相等时添加行的高亮样式
    if (record.editable === false) {
      return `ant-table-row ant-table-row-level-0 table-not-editable`
    }
    return index === this.state.activedIndex ? `ant-table-row ant-table-row-level-0 ant-table-row-selected` : "ant-table-row ant-table-row-level-0 ";
  }

  render() {
    return (
      <Table pagination={{
        defaultPageSize: 50,
        hideOnSinglePage: true,
      }}
             onRow={
               (record, index) => {//表格行点击事件
                 return {
                   onClick: this.clickRow.bind(this, record, index),
                 };
               }
             }
             loading={this.props.loading}
             rowClassName={this.setClassName}
             scroll={{y: 500}}
             columns={this.props.columnNames}
             dataSource={this.props.dataSource}
             bordered>
      </Table>
    );
  }
}


export default SelectableTable;
