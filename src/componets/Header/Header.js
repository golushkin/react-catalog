import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Articles} from "../Home/Main";

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            result:[],
            search:'',
            modal:false,
            load:false
        }
    }
    getMobile(){
        if (this.state.search){
            let search = this.state.search.replace(/ /g,'_');
            search = search.toLowerCase();
            this.setState({result:[],load:true})
            axios.get('http://localhost:3000/search/'+search)
                .then(response=>{
                    this.setState({result:response.data,load:false})
                })
                .catch(err=>console.error('Ошибка на сервере: '+err));
        }
    }
    render(){
        if (this.state.load){
            return (
                <header>
                    <div className="header-nav">
                        <div className="header-nav-search">
                            <input onClick={(e)=>{
                                this.setState({modal:!this.state.modal})
                            }}
                                   value={this.state.search}
                                   type="text"/>
                        </div>
                        <div className={(this.state.modal?'header-modal active':'header-modal')}
                             onClick={(e)=>{
                                 if (e.target.children[0] && e.target.children[0].className === 'modal'){
                                     this.setState({modal:!this.state.modal})
                                 }
                             }}>
                            <div className="modal">
                                <div className="modal-search">
                                    <input onBlur={()=>this.getMobile()}
                                           onChange={(e)=>this.setState({search:e.target.value})}
                                           type="text"/>
                                </div>
                                <div className="modal-result">
                                    <div className='preloader-container'>
                                        <div className='preloader full-width'>
                                            <div className='preloader-dotline'>
                                                <div className='dot'></div>
                                                <div className='dot'></div>
                                                <div className='dot'></div>
                                                <div className='dot'></div>
                                                <div className='dot'></div>
                                                <div className='dot'></div>
                                                <div className='dot'></div>
                                                <div className='dot'></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            )
        }
        else {
            return (
                <header>
                    <div className="header-nav">
                        <div className="header-nav-search">
                            <input onClick={(e)=>{
                                this._search.autofocus = true;
                                this.setState({modal:!this.state.modal})
                            }}
                                   value={this.state.search}
                                   type="text"/>
                        </div>
                        <div className={(this.state.modal?'header-modal active':'header-modal')}
                             onClick={(e)=>{
                                 if (e.target.children[0] && e.target.children[0].className === 'modal'){
                                     this.setState({modal:!this.state.modal})
                                 }
                             }}>
                            <div className="modal">
                                <div className="modal-search">
                                    <input onKeyPress={(e)=>e.key==='Enter'?this.getMobile():''}
                                           ref={(node)=>this._search=node}
                                           onChange={(e)=>this.setState({search:e.target.value})}
                                           type="text"/>
                                </div>
                                <div className="modal-result">
                                    {<Articles mobile={this.state.result} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            )
        }
    }
}
