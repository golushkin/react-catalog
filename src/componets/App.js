import React from "react";
import Header from "./Header/Header";
import './main.css';
import Home from "./Home/Home";
import {Route, Switch} from 'react-router-dom';
import Mobile from "./Mobile/Mobile";

export default class App extends React.Component{
    render(){
        return (
            <div className='wrapper'>
                <Header/>
                <Switch>
                    <Route exact path={'/'} component={Home} />
                    <Route path={'/mobile/:id'} component={Mobile} />
                </Switch>
            </div>
        )
    }
}
