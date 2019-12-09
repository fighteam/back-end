import React from 'react'
import DefaultHeader from './../Header/header'
import { Input,Button } from 'antd';
import {Link,BrowserRouter,Route} from 'react-router-dom'
var HomePageCSS= require('./homepage.css')
export default class HomePage extends React.Component{

  constructor(props){
    super(props)
    this.state={
      username:'',
      password:''
    }
  }
  changeValue = e=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  info = e=>{
    if (this.state.username==='123'&& this.state.password==='123') {
      alert('登陆成功');
      window.localStorage.setItem("username","123")
      window.localStorage.setItem("token","11111")
      this.props.history.push('/menu/menulist')

    }else{
      alert('登录失败')
    }
  }
  
    render(){
        return(
          <div className={HomePageCSS.login}>
            <DefaultHeader/>
          <div className={HomePageCSS.login1}>
          <div className={HomePageCSS.username}>
          <Input name="username" type="text" placeholder="管理员账号" className={HomePageCSS.account} onChange={this.changeValue}/>
          </div>
          <div className={HomePageCSS.password}>
          <Input.Password name="password" type="password" placeholder="密码" className={HomePageCSS.word} onChange={this.changeValue}/>
          </div>
          <div className={HomePageCSS.button}> 
          <Button className={HomePageCSS.b} onClick={this.info}>登录</Button>
          </div>
          </div>       
          
            </div>
        )
    }
}