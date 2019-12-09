import React from 'react';
import {Link,NavLink} from 'react-router-dom'
var HeaderCSS= require('./header.css')

export default class DefaultHeader extends React.Component{
    render(){
        return(
            <div className={HeaderCSS.header}>
            <Link to="/homepage"><a>天天影视管理系统 </a></Link>
            </div>
        )
    }
}