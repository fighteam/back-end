import React from 'react'
import {Link,BrowserRouter,Route} from 'react-router-dom'
var MenulistCSS= require('./menulist.css')
export default class MenulistPage extends React.Component{
    
    render(){
        return(
            <div className={MenulistCSS.menu}>
                <div className={MenulistCSS.addlist}>
                      <h2>天天影视管理系统欢迎您</h2>
                </div>
            </div>
            
        )
    }
}