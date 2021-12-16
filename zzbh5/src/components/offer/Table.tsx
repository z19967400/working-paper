import React from 'react';
import { Table } from 'antd';
import  './Table.less'
const columns = [
  {
    title: '服务费模式',
    dataIndex: 'service_fee_model',
    // render: (text: string) => <a>{text}</a>,
  },
  {
    title: '报价',
    dataIndex: 'offer',
  },
];

interface DataType {
  key: React.Key;
  id:number
  service_fee_model: string;
  offer: any;
  show:boolean
}

interface DemoProps {
  list:DataType[],
  getSelect:Function 
}




const Demo = (props:DemoProps) => {
  const { list,getSelect } = props 
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      getSelect(selectedRows[0].id)
    }
    // getCheckboxProps: (record: DataType) => ({
    //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //   name: record.name,
    // }),
  }
  return (
    <div className="table">
      <Table
        pagination={false}
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={list}
      />
    </div>
  );
};
export default Demo