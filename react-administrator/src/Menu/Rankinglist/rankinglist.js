import React from 'react'
import {Link,BrowserRouter,Route} from 'react-router-dom'
import { Table, Input, Button, Popconfirm, Form } from 'antd';
var RankinglistCSS= require('./rankinglist.css')
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}
export default class RankinglistPage extends React.Component{
    constructor(props) {
        super(props);
        this.columns = [
          {
            title: '电影名称',
            dataIndex: 'name',
            width: '10%',
            editable: true,
          },
          {
            title: '上映时间',
            dataIndex: 'age',
            width: '10%',
            editable: true,
          },
          {
            title: '电影海报',
            dataIndex: 'poster',
            editable: true,
            width: '40%',
          },
          {
            title: '简介',
            dataIndex: 'address',
            editable: true,
            width: '35%',
          },
          {
            title: '功能',
            dataIndex: 'operation',
            width: '5%',
            render: (text, record) =>
              this.state.dataSource.length >= 1 ? (
                <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.key)}>
                  <a href="javascript:;">删除</a>
                </Popconfirm>
              ) : null,
          },
        ];
    
        this.state = {
          dataSource: [
            {
              key: '0',
              name: '一个母亲的复仇',
              age: '2019',
              poster:'<img src=""></img>',
              address: '印度母亲为复仇反杀禽兽',
            },
            {
              key: '1',
              name: '头号玩家',
              age: '2017',
              poster:'<img src=""></img>',
              address: 'VR游戏超炫拯救世界！',
            },
          ],
          count: 3,
        };
      }
    
      handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
      };
    
      handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
          key: count,
          name: `电影 ${count}`,
          age: 2018,
          poster:'<img src=""></img>',
          address: `电影简介 ${count}`,
        };
        this.setState({
          dataSource: [...dataSource, newData],
          count: count + 1,
        });
      };
    
      handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ dataSource: newData });
      };
    
    render(){
        const { dataSource } = this.state;
        const components = {
          body: {
            row: EditableFormRow,
            cell: EditableCell,
          },
        };
        const columns = this.columns.map(col => {
          if (!col.editable) {
            return col;
          }
          return {
            ...col,
            onCell: record => ({
              record,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave: this.handleSave,
            }),
          };
        });
        return(
            <div className={RankinglistCSS.menu}>
            <div className={RankinglistCSS.addlist}>
                <div className={RankinglistCSS.button}>
            <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          增加电影
        </Button></div>
        <div className={RankinglistCSS.add}>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}/>
            </div></div>
        </div>
            
        )
    }
}