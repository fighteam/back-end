import React from 'react'
import {Link,BrowserRouter,Route} from 'react-router-dom'
import { Table, Input, Button, Popconfirm, Form } from 'antd';
var MoviedetailsCSS= require('./moviedetails.css')
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
              message: `${title} 不能为空`,
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
export default class MovielistPage extends React.Component{
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
            width: '40%',
            editable: true,
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
              name: '金三角大营救',
              age: '2018',
              poster:'<img src="https://p.ssl.qhimg.com/t0183b24336187e73af.jpg"></img>',
              address: '影片主要讲述了身世显赫的女主林歌阑，为了自己的记者梦，深入虎穴拍照调查，结果目睹毒贩团伙的杀人罪行，被毒枭绑架利用，甚至被注射新型毒品，其父为了爱女派出身份神秘，各怀绝技的五人小组前来营救的故事。而电影的最终聚焦点，则是在于守护正义，或者说是这场关于消灭毒品的战争上。',
            },
            {
              key: '1',
              name: '荒野猎人（国语）',
              age: '2016',
              poster:'<img src="https://p.ssl.qhimg.com/d/dy_5046bc92e385dc3ad6e2606b2b72535e.jpg"></img>',
              address: '休·格拉斯是一名皮草猎人，在一次打猎途中被一头熊殴打成重伤后被同行的乘船船长安德鲁·亨利救下，船长雇佣了两个人约翰·菲茨杰拉德和吉姆·布里杰来照顾他。约翰·菲茨杰拉德根本无心照顾格拉斯，一心只想着将格拉斯的财产占为己有，于是残忍的杀害了格拉斯的儿子，并说服吉姆·布里杰将格拉斯抛弃在荒野等死。两人原以为格拉斯就会这样离世，但格拉斯凭借坚强的毅力在野性的蛮荒之地穿行了好几个月，终于回到了安全地带并开始了复仇计划。',
            },
          ],
          count: 2,
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
          poster: '<img src=""></img>' ,
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
            <div className={MoviedetailsCSS.menu}>
                   <div className={MoviedetailsCSS.list}>
                <Link to="/menu/movie"><Button className={MoviedetailsCSS.B}>返回</Button></Link>
            </div>
            <div className={MoviedetailsCSS.addlist}>
                <div className={MoviedetailsCSS.button}>
            <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          增加电影
        </Button></div>
        <div className={MoviedetailsCSS.add}>
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