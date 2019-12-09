import React from 'react'
import {Link,BrowserRouter,Route} from 'react-router-dom'
import MovielistPage from './Movielist/movielist';
import RankinglistPage from './Rankinglist/rankinglist';
import ActlistPage from './Actlist/actlist';
import ClassifyPage from './Classify/classify';
import SortPage from './Sort/sort';
import AreaPage from './Area/area';
import LabelPage from './Label/label';
import MoviePage from './Movie/movie';
import MenulistPage from './Menulist/menulist';
import { Layout, Menu, Breadcrumb, Icon,Button} from 'antd';
var MenuCSS= require('./menu.css')

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export default class MenuPage extends React.Component{
    state = {
        collapsed: false,
      };
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
    
    render(){
        return(
            <div className={MenuCSS.menu}>
             
              <div className={MenuCSS.Layout}>
        <Layout style={{ minHeight: '100vh'  }} >
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" width="500px">
            <Menu.Item key="1">
              <Link to="/menu/menulist">
              <Icon type="pie-chart" />
              <span>天天影视</span></Link>
            </Menu.Item>
            <Menu.Item key="2">
            <Link to="/menu/movielist">
              <Icon type="desktop" />
              <span>电影榜单</span></Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>电影排行榜</span>
                </span>
              }
            >
              <Menu.Item key="3"><Link to="/menu/rankinglist">热播榜</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/menu/actlist">动作榜</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="11">
            <Link to="/menu/classify"><Icon type="file" />
              <span>分类标签</span></Link>
            </Menu.Item>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>电影分类</span>
                </span>
              } >
              <Menu.Item key="6"><Link to="/menu/sort">类型</Link></Menu.Item>
              <Menu.Item key="8"><Link to="/menu/area">地区</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="9"><Link to="/menu/label">
              <Icon type="file" />
              <span>电影标签</span></Link>
            </Menu.Item>
            <Menu.Item key="10"><Link to="/menu/movie">
              <Icon type="file" />
              <span>电影</span></Link>
            </Menu.Item>
            <Menu.Item key="13">
              <Link to="/homepage"><Icon type="file" />
              <span>退出登录</span></Link>
            </Menu.Item>
          </Menu>
         
        </Sider>
       
      </Layout> </div>
               <div>
                <Route path="/menu/movielist"  component={MovielistPage}></Route>
                <Route path="/menu/rankinglist"  component={RankinglistPage}></Route>
                <Route path="/menu/actlist"  component={ActlistPage}></Route>
                <Route path="/menu/classify"  component={ClassifyPage}></Route>
                <Route path="/menu/sort"  component={SortPage}></Route>
                <Route path="/menu/area"  component={AreaPage}></Route>
                <Route path="/menu/label"  component={LabelPage}></Route>
                <Route path="/menu/movie"  component={MoviePage}></Route>
                <Route path="/menu/menulist"  component={MenulistPage}></Route>
               </div>
      </div>
        )
    }
}